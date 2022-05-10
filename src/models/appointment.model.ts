import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Doctor} from './doctor.model';
import {Patient} from './patient.model';

@model({settings: {strict: false}})
export class Appointment extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  appointment_id?: number;
  @belongsTo(() => Doctor, {name: 'doctors'})
  doctor_id: number;

  @belongsTo(() => Patient, {name: 'patients'})
  patient_id: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [prop: string]: any;

  constructor(data?: Partial<Appointment>) {
    super(data);
  }
}

export interface AppointmentRelations {
  // describe navigational properties here
}

export type AppointmentWithRelations = Appointment & AppointmentRelations;
