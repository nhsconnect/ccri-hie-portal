import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class CarePlanActivityDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public patientId: string,
              public careActivities: fhir.CarePlanActivity[]
  ) {
    super();
  }

  private dataStore: {
    careActivities: fhir.CarePlanActivity[]
  };

  connect(): Observable<fhir.CarePlanActivity[]> {

  //  console.log('carePlans DataSource connect '+this.patientId);

    const _carePlanActivities: BehaviorSubject<fhir.CarePlanActivity[]> =
      <BehaviorSubject<fhir.CarePlanActivity[]>>new BehaviorSubject([]);

    this.dataStore = { careActivities: [] };

    if (this.patientId !== undefined) {
      // Can only be called directly with data provided
    } else
    if (this.careActivities !== []) {
      for (const careActivity of this.careActivities) {
        this.dataStore.careActivities.push(<fhir.CarePlanActivity> careActivity);
      }
      _carePlanActivities.next(Object.assign({}, this.dataStore).careActivities);
    }
   return _carePlanActivities.asObservable();
  }

  disconnect() {}
}
