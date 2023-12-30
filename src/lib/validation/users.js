import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "please enter a valid name",
        required_error: "name is required",
      })
      .trim()
      .min(5, "name must be at least 5 characters long")
      .max(30, "name can be maximun 30 characters long"),

    email: z.string().trim().email().toLowerCase(),
    password: z
      .string()
      .regex(/^\S{8,}$/, "password can be minimum 8 characters with no space"),
    confirmPassword: z.string(),
  })
  .refine((data) => data?.password === data?.confirmPassword, {
    validation: "password",
    path: ["confirmPassword"],
    message: "password and confirm password must be same",
  });

export const loginSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
  password: z
    .string()
    .regex(/^\S{8,}$/, "password can be minimum 8 characters with no space"),
});

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email().toLowerCase(),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .regex(/^\S{8,}$/, "password can be minimum 8 characters with no space"),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    validation: "password",
    path: ["confirmPassword"],
    message: "password and confirm password must be same",
  });

export const updateSchema = z.object({
  name: z
    .string({
      invalid_type_error: "please enter a valid name",
      required_error: "name is required",
    })
    .trim()
    .min(5, "name must be at least 5 characters long")
    .max(30, "name can be maximun 30 characters long"),

  email: z.string().trim().email().toLowerCase(),
  profilePic: z
    .string()
    .trim()
    .refine((val) => /^data:image\/(png|jpg|jpeg);base64,.*$/.test(val), {
      validation: "profile picture",
      path: ["profilePic"],
      message: "please select png|jpg|jpeg image file",
    })
    .optional(),
});
