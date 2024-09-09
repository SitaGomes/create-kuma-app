import { getJwtCookie } from '../utils';
import 'dotenv/config';

abstract class BaseApi {
  protected static BASE_URL = process.env.API_ROUTE;

  protected static async fetchJson(
    endpoint: string,
    options: RequestInit = {},
  ) {
    const url = `${this.BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getJwtCookie()}`,
        ...options.headers,
      },
    });

    return response.json();
  }

  protected static async get(endpoint: string): Promise<unknown> {
    return this.fetchJson(endpoint);
  }

  protected static async post(
    endpoint: string,
    data: unknown,
  ): Promise<unknown> {
    return this.fetchJson(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected static async put(
    endpoint: string,
    data: unknown,
  ): Promise<unknown> {
    return this.fetchJson(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected static async delete(endpoint: string): Promise<unknown> {
    return this.fetchJson(endpoint, { method: 'DELETE' });
  }
}

export default BaseApi;
