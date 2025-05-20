'use server';
import { CACHE } from '@/constants/CACHE';
import { BASE_URL, REVALIDATE_TIME } from '../api';
import { Report } from '@/types';

export const fetchReportsAsync = async (token: string) => {
  try {
    const response = await fetch(`${BASE_URL}/report`, {
      method: 'GET',
      cache: 'no-cache',
      next: {
        revalidate: REVALIDATE_TIME * 3, // 3 hour
        tags: [CACHE.REPORTS],
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const report = await response.json();

    return report as Report[];
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
