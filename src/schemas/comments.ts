import z from "zod";
import {
	COMMENT_MAX_MESSAGE_LENGTH,
	COMMENT_MAX_NAME_LENGTH,
} from "@/utils/constants";

export const submitCommentSchema = z.object({
	name: z.string().max(COMMENT_MAX_NAME_LENGTH).optional().default("Anonymous"),
	message: z
		.string()
		.min(1, "Pesan wajib diisi")
		.max(
			COMMENT_MAX_MESSAGE_LENGTH,
			`Pesan tidak boleh lebih dari ${COMMENT_MAX_MESSAGE_LENGTH} karakter`,
		),
});

export type SubmitCommentSchemaInput = z.input<typeof submitCommentSchema>;
export type SubmitCommentSchema = z.output<typeof submitCommentSchema>;
