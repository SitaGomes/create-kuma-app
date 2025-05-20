import { createMemberAsync } from '@/lib';
import { AddMember } from '@/types';

export const mutateAddMember = async (token: string, member: AddMember) => {
  const createMember = async () => {
    try {
      const response = await createMemberAsync(token, member);
      return response;
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  };

  return createMember();
};
