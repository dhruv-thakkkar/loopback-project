import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Appointment, AppointmentRelations} from '../models';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.appointment_id,
  AppointmentRelations
> {
  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource,
  ) {
    super(Appointment, dataSource);
  }
}
