import { z } from 'zod'

export const createGuildValidator = z.object({
  name: z.string().min(2).max(255),
  siret: z.string().min(2).max(255),
  isDeactivated: z.boolean(),
  logo: z
    .instanceof(File)
    .refine((file) => file.size < 7000000, {
      message: 'Your resume must be less than 7MB.',
    })
    .optional(),
})

export const updateGuildValidator = z.object({
  name: z.string().min(2).max(255),
  siret: z.string().min(2).max(255),
  isDeactivated: z.boolean(),
  defaultLogo: z.string().optional(),
  logo: z
    .instanceof(File)
    .refine((file) => file.size < 7000000, {
      message: 'Your resume must be less than 7MB.',
    })
    .optional(),
})

export type CreateGuildFormSchema = z.infer<typeof createGuildValidator>
export type UpdateGuildFormSchema = z.infer<typeof updateGuildValidator>
