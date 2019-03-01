import {DataSource} from '@angular/cdk/table';
import {FhirService} from '../service/fhir.service';
import {BehaviorSubject, Observable} from 'rxjs';

export class ListEntryDataSource extends DataSource<any> {
  constructor(public fhirService: FhirService,
              public patientId: string,
              public listEntries: fhir.ListEntry[]
  ) {
    super();
  }

  private dataStore: {
    listEntries: fhir.ListEntry[]
  };

  connect(): Observable<fhir.ListEntry[]> {

  //  console.log('carePlans DataSource connect '+this.patientId);

    const _listEntries: BehaviorSubject<fhir.ListEntry[]> =
      <BehaviorSubject<fhir.ListEntry[]>>new BehaviorSubject([]);

    this.dataStore = { listEntries: [] };

    if (this.patientId !== undefined) {
      // Can only be called directly with data provided
    } else
    if (this.listEntries !== []) {
      for (const listEntry of this.listEntries) {
        this.dataStore.listEntries.push(<fhir.ListEntry> listEntry);
      }
      _listEntries.next(Object.assign({}, this.dataStore).listEntries);
    }
   return _listEntries.asObservable();
  }

  disconnect() {}
}
