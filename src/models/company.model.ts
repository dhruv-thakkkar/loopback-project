import {Entity, model, property} from '@loopback/repository';

@model()
export class Company extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  company_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'number',
  })
  order_id?: number;

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
