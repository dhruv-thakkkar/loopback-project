import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlConnDataSource} from '../datasources';
import {Appointment, AppointmentRelations, Doctor, Patient} from '../models';
import {DoctorRepository} from './doctor.repository';
import {PatientRepository} from './patient.repository';

export class AppointmentRepository extends DefaultCrudRepository<
  Appointment,
  typeof Appointment.prototype.appointment_id,
  AppointmentRelations
> {

  public readonly doctors: BelongsToAccessor<Doctor, typeof Appointment.prototype.appointment_id>;

  public readonly patients: BelongsToAccessor<Patient, typeof Appointment.prototype.appointment_id>;

  constructor(
    @inject('datasources.mysqlConn') dataSource: MysqlConnDataSource, @repository.getter('DoctorRepository') protected doctorRepositoryGetter: Getter<DoctorRepository>, @repository.getter('PatientRepository') protected patientRepositoryGetter: Getter<PatientRepository>,
  ) {
    super(Appointment, dataSource);
    this.patients = this.createBelongsToAccessorFor('patients', patientRepositoryGetter,);
    this.registerInclusionResolver('patients', this.patients.inclusionResolver);
    this.doctors = this.createBelongsToAccessorFor('doctors', doctorRepositoryGetter,);
    this.registerInclusionResolver('doctors', this.doctors.inclusionResolver);
  }
}
