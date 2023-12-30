import { z } from "zod";

export const postSchema = z.object({
  title: z
    .string({
      invalid_type_error: "please enter a valid title",
      required_error: "title is required",
    })
    .trim()
    .min(5, "title must be at least 5 characters long"),

  description: z
    .string({
      invalid_type_error: "please enter a valid description",
      required_error: "description is required",
    })
    .trim()
    .min(5, "description must be at least 5 characters long"),
});
