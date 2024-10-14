import { ServiceStatus } from "@prisma/client";
import { z } from "zod";

const requiredString = z.string().min(1, { message: "required" });

export const ServiceSchema = z.object({
  name: requiredString,
  description: requiredString,
  price: z.number().min(1, { message: "required" }),
  thumbnail: requiredString,
  features: z.array(z.string()).optional(),
  status: z
    .nativeEnum(ServiceStatus)
    .refine((data) => Object.values(ServiceStatus).includes(data), {
      message: "required",
    }),
  categoryId: requiredString,
});

export type ServiceSchemaType = z.infer<typeof ServiceSchema>;
