import {Entity, model, property} from '@loopback/repository';

@model()
export class Address extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  address_id?: number;

  @property({
    type: 'string',
    required: true,
  })
  full_address: string;

  @property({
    type: 'number',
  })
  customer_id?: number;

  constructor(data?: Partial<Address>) {
    super(data);
  }
}

export interface AddressRelations {
  // describe navigational properties here
}

export type AddressWithRelations = Address & AddressRelations;
