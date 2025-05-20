import { deleteMemberAsync } from '@/lib';

export const mutateDeleteMember = async (token: string, memberId: string) => {
  const deleteMember = async () => {
    try {
      const response = await deleteMemberAsync(token, memberId);
      return response;
    } catch (error) {
      console.error('Error creating member:', error);
      throw error;
    }
  };

  return deleteMember();
};
