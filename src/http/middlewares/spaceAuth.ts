import { SpaceMemberModel } from '../../models/SpaceMemberModel.ts';
import type { SpaceMember } from '../../types/domain.ts';

export async function spaceAuth(req: any, res: any, next: any) {
  const params = req.params || {};
  const spaceId = params.spaceId || params.id || req.body?.spaceId || req.body?.id || req.query?.spaceId;
  const userId = req.user?.id;
  if (!spaceId) return res.status(400).json({ error: { code: 'BAD_REQUEST', message: 'spaceId required' } });
  const membership = await SpaceMemberModel.findOne({ spaceId, userId }).lean() as (SpaceMember & { _id?: any }) | null;
  if (!membership) return res.status(403).json({ error: { code: 'FORBIDDEN', message: 'Not a member of this space' } });
  req.space = { id: spaceId, role: membership.role };
  next();
}
