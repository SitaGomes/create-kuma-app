'use server';
import { CACHE } from '@/constants/CACHE';
import { BASE_URL, REVALIDATE_TIME } from '../api';
import { AddMember, Member } from '@/types';
import { revalidateTag } from 'next/cache';

export const fetchAllMemberAsync = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/member`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME, // 1 hour
        tags: [CACHE.MEMBERS],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const members = await response.json();

    return members as Promise<Member[]>;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const fetchMemberAsync = async (token: string, memberId: string) => {
  try {
    const response = await fetch(`${BASE_URL}/member/${memberId}`, {
      method: 'GET',
      cache: 'force-cache',
      next: {
        revalidate: REVALIDATE_TIME, // 1 hour
        tags: [`${CACHE.MEMBER}-${memberId}`],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const members = await response.json();

    return members as Promise<Member[]>;
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
};

export const createMemberAsync = async (token: string, member: AddMember) => {
  try {
    await fetch(`${BASE_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(member),
    });

    revalidateTag(CACHE.MEMBERS);
  } catch (error) {
    console.error('Error creating member:', error);
    throw error;
  }
};

export const updateMemberAsync = async (token: string, member: Member) => {
  try {
    await fetch(`${BASE_URL}/member`, {
      method: 'PUT',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(member),
    });

    revalidateTag(CACHE.MEMBERS);
    revalidateTag(`${CACHE.MEMBER}-${member.id}`);
  } catch (error) {
    console.error('Error updating member:', error);
    throw error;
  }
};

export const deleteMemberAsync = async (token: string, memberId: string) => {
  try {
    await fetch(`${BASE_URL}/member/${memberId}`, {
      method: 'DELETE',
      cache: 'no-cache',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    revalidateTag(CACHE.MEMBERS);
  } catch (error) {
    console.error('Error deleting member:', error);
    throw error;
  }
};
