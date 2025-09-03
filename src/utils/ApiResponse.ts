import { ZodError } from 'zod';

export class ApiResponse {
  static error(err: unknown) {
    if (err instanceof ZodError) {
      const flat = err.flatten();
      return {
        error: {
          code: 'VALIDATION_ERROR',
          message: err.message,
          details: flat.fieldErrors || flat.formErrors,
        },
      };
    }
    if (err && typeof err === 'object' && 'code' in err && 'message' in err) {
      // @ts-ignore - keep compatibility with existing shaped errors
      return { error: err };
    }
    const message = err && typeof err === 'object' && 'message' in err ? (err as any).message : String(err ?? 'Internal server error');
    return {
      error: {
        code: 'INTERNAL_ERROR',
        message,
      },
    };
  }
}
