import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class RelatedPersonDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public patientId: string,
              public persons: fhir.RelatedPerson[]
  ) {
    super();
  }

  private dataStore: {
    persons: fhir.RelatedPerson[]
  };

  connect(): Observable<fhir.RelatedPerson[]> {

  //  console.log('carePlans DataSource connect '+this.patientId);

    const _persons: BehaviorSubject<fhir.RelatedPerson[]> =
      <BehaviorSubject<fhir.RelatedPerson[]>>new BehaviorSubject([]);

    this.dataStore = { persons: [] };

    if (this.patientId !== undefined) {
      // Can only be called directly with data provided
    } else
    if (this.persons !== []) {
      for (const person of this.persons) {
        this.dataStore.persons.push(<fhir.RelatedPerson> person);
      }
      _persons.next(Object.assign({}, this.dataStore).persons);
    }
   return _persons.asObservable();
  }

  disconnect() {}
}
