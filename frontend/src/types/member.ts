import { MEMBER_LEVEL } from '@/constants';

export type Member = {
  id: string;
  email: string;
  username: string;
  level: keyof typeof MEMBER_LEVEL;
  createdDate: Date;
  updatedDate: Date;
};

export type AddMember = Omit<Member, 'id' | 'createdDate' | 'updatedDate'> & {
  password: string;
  orgId: string;
};
