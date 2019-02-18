import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';

@Component({
  selector: 'app-naming-system-detail',
  templateUrl: './naming-system-detail.component.html',
  styleUrls: ['./naming-system-detail.component.css']
})
export class NamingSystemDetailComponent implements OnInit {

  namingSystemid = undefined;
  namingSystem: fhir.NamingSystem;

  constructor(private route: ActivatedRoute,
              private fhirService: FhirService) { }

  ngOnInit() {

    this.namingSystemid = this.route.snapshot.paramMap.get('namingsystemid');
    if (this.namingSystemid !== undefined) {
      this.fhirService.getResource('/NamingSystem/' + this.namingSystemid).subscribe( result => {
        this.namingSystem = result;
      });
    }
  }
}
