import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { Org } from 'src/data';
import { OrgService } from './org.service';
import { JwtAuthGuard } from 'src/auth';
import { CreateOrgDto } from './dto/create-org.dto';

@UseGuards(JwtAuthGuard)
@Controller('org')
export class OrgController {
  constructor(private orgService: OrgService) {}

  @Get('/')
  async getOrgs() {
    return this.orgService.getAllOrg();
  }

  @Get('/:orgId')
  async getOrg(@Param('orgId') orgId: string) {
    return this.orgService.getOrg(orgId);
  }

  @Post('/')
  async createOrg(@Body() org: CreateOrgDto) {
    return this.orgService.createOrg(org.name, org.plan);
  }

  @Put('/')
  async updateOrg(@Body() org: Org) {
    return this.orgService.updateOrg(org);
  }
}
