import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Policy {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  policyNumber: string;

  @Column()
  policyHolderName: string;

  @Column()
  policyAmount: number;

  @Column()
  policyStartDate: Date;

  @Column()
  policyEndDate: Date;
}
