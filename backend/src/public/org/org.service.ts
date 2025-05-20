import { Injectable } from '@nestjs/common';
import { ERROR_STATUS, Org } from 'src/data';
import { DatabaseClient, throwErrorFactory } from 'src/lib';

@Injectable()
export class OrgService {
  constructor(private db: DatabaseClient) {
    this.db = db;
  }

  async getAllOrg() {
    try {
      return await this.db.org.findMany();
    } catch (error) {
      console.error(error);
      throwErrorFactory(
        'DB Conection: get orgs',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getOrg(orgId: string) {
    try {
      return await this.db.org.findUnique(orgId);
    } catch (error) {
      console.error(error);
      throwErrorFactory(
        'DB Conection: get org',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createOrg(name: string, plan: string) {
    try {
      const newOrg = new Org(name, plan);
      return await this.db.org.create(newOrg);
    } catch (error) {
      console.error(error);
      throwErrorFactory(
        'DB Conection: create org',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateOrg(org: Org) {
    const orgExists = await this.db.org.findUnique(org.id);

    if (!orgExists) {
      throwErrorFactory('org not found', ERROR_STATUS.NOT_FOUND);
    }

    try {
      return await this.db.org.update(org);
    } catch (error) {
      console.error(error);
      throwErrorFactory(
        'DB Conection: update org',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteOrg(orgId: string) {
    const orgExists = await this.db.org.findUnique(orgId);

    if (!orgExists) {
      throwErrorFactory('org not found', ERROR_STATUS.NOT_FOUND);
    }

    try {
      return await this.db.org.delete(orgId);
    } catch (error) {
      console.error(error);
      throwErrorFactory(
        'DB Conection: delete org',
        ERROR_STATUS.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
