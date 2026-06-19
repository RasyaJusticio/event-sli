import { TRPCError } from "@trpc/server";
import { z } from "zod";
import type { PrismaClient } from "#/generated/prisma";
import { submitCommentSchema } from "@/schemas/comments";
import {
	adminProcedure,
	createTRPCRouter,
	publicProcedure,
} from "@/server/api/trpc";
import { ROTATION_SECONDS } from "@/utils/constants";

// ─── Helpers ──────────────────────────────────────────────────────────────────

async function advanceRotation(db: PrismaClient) {
	const now = new Date();

	// Try APPROVED first (oldest first, FIFO)
	let next = await db.comment.findFirst({
		where: { status: "APPROVED" },
		orderBy: { createdAt: "asc" },
	});

	// Fallback: if no APPROVED comments, cycle through SHOWN ones
	// Re-show oldest SHOWN comment
	if (!next) {
		next = await db.comment.findFirst({
			where: { status: "SHOWN" },
			orderBy: { shownAt: "asc" }, // oldest shown = shown longest ago
		});
	}

	if (!next) {
		// Truly empty — no comments at all yet
		await db.rotationState.updateMany({
			data: { currentCommentId: null, displayUntil: null },
		});
		return null;
	}

	const displayUntil = new Date(now.getTime() + ROTATION_SECONDS * 1000);

	await db.$transaction([
		// Mark current comment as SHOWN (no-op if it was already SHOWN)
		db.comment.update({
			where: { id: next.id },
			data: { status: "SHOWN", shownAt: now },
		}),
		db.rotationState.upsert({
			where: { id: "singleton" },
			create: { id: "singleton", currentCommentId: next.id, displayUntil },
			update: { currentCommentId: next.id, displayUntil },
		}),
	]);

	return { comment: next, displayUntil };
}

// ─── Router ───────────────────────────────────────────────────────────────────

export const commentsRouter = createTRPCRouter({
	// ── PUBLIC: submit a comment ──────────────────────────────────────────────
	submit: publicProcedure
		.input(submitCommentSchema)
		.mutation(async ({ ctx, input }) => {
			const comment = await ctx.db.comment.create({
				data: {
					name: input.name,
					message: input.message,
					status: "PENDING",
				},
			});

			return { id: comment.id, status: comment.status };
		}),

	// ── PUBLIC: poll submission status ───────────────────────────────────────
	submissionStatus: publicProcedure
		.input(z.object({ id: z.string().cuid() }))
		.query(async ({ ctx, input }) => {
			const comment = await ctx.db.comment.findUnique({
				where: { id: input.id },
				select: { id: true, status: true, rejectReason: true },
			});

			if (!comment) {
				throw new TRPCError({ code: "NOT_FOUND" });
			}

			return comment;
		}),

	// ── PUBLIC: current comment for LED wall ─────────────────────────────────
	wallCurrent: publicProcedure.query(async ({ ctx }) => {
		const state = await ctx.db.rotationState.findUnique({
			where: { id: "singleton" },
		});

		const now = new Date();
		const shouldAdvance = !state?.displayUntil || now >= state.displayUntil;

		if (shouldAdvance) {
			const advanced = await advanceRotation(ctx.db);

			if (!advanced) {
				return { comment: null, displayUntil: null, nextName: null };
			}

			const upNext = await ctx.db.comment.findFirst({
				where: { status: "APPROVED" },
				orderBy: { createdAt: "asc" },
				select: { name: true },
			});

			return {
				comment: {
					id: advanced.comment.id,
					name: advanced.comment.name,
					message: advanced.comment.message,
					createdAt: advanced.comment.createdAt,
				},
				displayUntil: advanced.displayUntil,
				nextName: upNext?.name ?? null,
			};
		}

		const current = state.currentCommentId
			? await ctx.db.comment.findUnique({
					where: { id: state.currentCommentId },
					select: { id: true, name: true, message: true, createdAt: true },
				})
			: null;

		const upNext = await ctx.db.comment.findFirst({
			where: { status: "APPROVED" },
			orderBy: { createdAt: "asc" },
			select: { name: true },
		});

		return {
			comment: current ?? null,
			displayUntil: state.displayUntil,
			nextName: upNext?.name ?? null,
		};
	}),

	// ── ADMIN: get pending queue ──────────────────────────────────────────────
	adminQueue: adminProcedure.query(async ({ ctx }) => {
		const [pending, approvedCount, rejectedCount, shownCount] =
			await ctx.db.$transaction([
				ctx.db.comment.findMany({
					where: { status: "PENDING" },
					orderBy: { createdAt: "asc" },
					select: { id: true, name: true, message: true, createdAt: true },
				}),
				ctx.db.comment.count({ where: { status: "APPROVED" } }),
				ctx.db.comment.count({ where: { status: "REJECTED" } }),
				ctx.db.comment.count({ where: { status: "SHOWN" } }),
			]);

		return { pending, approvedCount, rejectedCount, shownCount };
	}),

	// ── ADMIN: approve or reject ──────────────────────────────────────────────
	adminUpdateStatus: adminProcedure
		.input(
			z.object({
				id: z.string().cuid(),
				status: z.enum(["APPROVED", "REJECTED"]),
				rejectReason: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return ctx.db.comment.update({
				where: { id: input.id },
				data: {
					status: input.status,
					rejectReason: input.rejectReason ?? null,
					reviewedAt: new Date(),
				},
				select: { id: true, status: true },
			});
		}),
});
