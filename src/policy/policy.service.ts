import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Policy } from './policy.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PolicyService {
  constructor(
    @InjectRepository(Policy) private policyRepository: Repository<Policy>,
  ) {}

  findAll(): Promise<Policy[]> {
    return this.policyRepository.find();
  }

  findOne(id: number): Promise<Policy> {
    return this.policyRepository.findOne({ where: { id } });
  }

  create(policy: Policy): Promise<Policy> {
    return this.policyRepository.save(policy);
  }

  async update(policy: Policy, id: number): Promise<void> {
    await this.policyRepository.update(id, policy);
  }

  async remove(id: number): Promise<void> {
    await this.policyRepository.delete(id);
  }
}
