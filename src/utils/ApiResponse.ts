export class ApiResponse {
  static error(err: any) {
    if (err.name === 'ZodError') {
      return {
        error: {
          code: 'VALIDATION_ERROR',
          message: err.message,
          details: err.errors,
        },
      };
    }
    if (err.code && err.message) {
      return { error: err };
    }
    return {
      error: {
        code: 'INTERNAL_ERROR',
        message: err.message || 'Internal server error',
      },
    };
  }
}
