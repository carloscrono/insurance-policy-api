import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { Policy } from './policy.entity';
import { JwtAuthGuard } from '../auth/jwt.authguard';
import { NOTFOUND } from 'dns';

@UseGuards(JwtAuthGuard)
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  findAll(): Promise<Policy[]> {
    return this.policyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Policy> {
    const policy = await this.policyService.findOne(id);
    if (!policy) {
      throw new NotFoundException(`Policy with id ${id} not found`);
    }
    return policy;
  }

  @Post()
  create(@Body() policy: Policy): Promise<Policy> {
    return this.policyService.create(policy);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() policy: Policy,
  ): Promise<Policy> {
    const myPolicy = await this.policyService.findOne(id);
    if (!myPolicy) {
      throw new NotFoundException(`Policy with id ${id} not found`);
    }
    return this.policyService.update(policy, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    const policy = await this.policyService.findOne(id);
    if (!policy) {
      throw new NotFoundException(`Policy with id ${id} not found`);
    }
    this.policyService.remove(id);
    return {
      Status: 'Deleted',
    };
  }
}
