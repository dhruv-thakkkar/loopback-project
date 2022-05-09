import {Entity, model, property, hasMany} from '@loopback/repository';
import {Order} from './order.model';
import {Address} from './address.model';

@model()
export class Customer extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  customer_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Order, {keyTo: 'customer_id'})
  orders: Order[];

  @hasMany(() => Address, {keyTo: 'customer_id'})
  addresses: Address[];

  constructor(data?: Partial<Customer>) {
    super(data);
  }
}

export interface CustomerRelations {
  // describe navigational properties here
}

export type CustomerWithRelations = Customer & CustomerRelations;
