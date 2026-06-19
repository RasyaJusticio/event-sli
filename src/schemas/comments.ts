import z from "zod";
import {
	COMMENT_MAX_MESSAGE_LENGTH,
	COMMENT_MAX_NAME_LENGTH,
} from "@/utils/constants";

export const submitCommentSchema = z.object({
	name: z.string().max(COMMENT_MAX_NAME_LENGTH).optional().default("Anonymous"),
	message: z
		.string()
		.min(1, "Message cannot be empty")
		.max(COMMENT_MAX_MESSAGE_LENGTH),
});

export type SubmitCommentSchemaInput = z.input<typeof submitCommentSchema>;
export type SubmitCommentSchema = z.output<typeof submitCommentSchema>;
