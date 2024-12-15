import { z } from "zod";

export const RegisterSchema = z.object({
    fullName: z.string().min(1, "Full name is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    height: z.number().min(50, "Height must be at least 50 cm"),
    weight: z.number().min(10, "Weight must be at least 10 kg"),
    fitnessGoal: z.enum(["weight_loss", "muscle_gain", "maintenance"]).refine(
      (value) => value !== undefined,
      { message: "Invalid fitness goal" }
    ),
  });

export type RegisterSchemaType = z.infer<typeof RegisterSchema>;
