export function errorHandler(err: any, req: any, res: any, next: any) {
  if (err && err.error) {
    return res.status(400).json(err);
  }
  return res.status(500).json({ error: { code: 'INTERNAL_ERROR', message: err.message || 'Internal server error' } });
}
