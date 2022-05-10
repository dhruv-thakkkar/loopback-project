import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Patient, PatientRelations} from '../models';

export class PatientRepository extends DefaultCrudRepository<
  Patient,
  typeof Patient.prototype.patient_id,
  PatientRelations
> {
  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource,
  ) {
    super(Patient, dataSource);
  }
}
