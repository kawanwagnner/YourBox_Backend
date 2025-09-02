import { z } from 'zod';

export const CreateItemDTO = z.object({
  content: z.string().min(1).max(10000).optional(),
  fileUrl: z.string().optional(),
}).refine((data: any) => data.content || data.fileUrl, {
  message: 'Content or file is required',
});
