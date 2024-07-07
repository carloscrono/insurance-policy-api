import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PolicyService } from './policy.service';
import { Policy } from './policy.entity';
import { JwtAuthGuard } from '../auth/jwt.authguard';

@UseGuards(JwtAuthGuard)
@Controller('policy')
export class PolicyController {
  constructor(private readonly policyService: PolicyService) {}

  @Get()
  findAll(): Promise<Policy[]> {
    return this.policyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Policy> {
    return this.policyService.findOne(id);
  }

  @Post()
  create(@Body() policy: Policy): Promise<Policy> {
    return this.policyService.create(policy);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() policy: Policy): Promise<Policy> {
    return this.policyService.update(policy, id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    this.policyService.remove(id);
    return {
      Status: 'Deleted',
    };
  }
}
