import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Customer} from './customer.model';
import {Company} from './company.model';

@model()
export class Order extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  order_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @belongsTo(() => Customer, {name: 'customers'})
  customer_id: number;

  @hasMany(() => Company, {keyTo: 'order_id'})
  companies: Company[];

  constructor(data?: Partial<Order>) {
    super(data);
  }
}

export interface OrderRelations {
  // describe navigational properties here
}

export type OrderWithRelations = Order & OrderRelations;
