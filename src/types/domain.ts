export interface User {
  id: string;
  name?: string;
  email: string;
  passwordHash?: string;
  createdAt?: Date;
}

export type SpaceRole = 'OWNER' | 'EDITOR' | 'VIEWER';

export interface Space {
  id: string;
  _id?: any;
  name: string;
  ownerId: string;
  slug?: string;
  passwordHash?: string;
  createdAt?: Date;
}

export interface SpaceMember {
  id?: string;
  spaceId: string;
  userId: string;
  role: SpaceRole;
}

export interface Item {
  id?: string;
  spaceId: string;
  createdBy: string;
  content?: string;
  fileUrl?: string;
  createdAt?: Date;
}
