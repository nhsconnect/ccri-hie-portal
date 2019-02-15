import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';
import {LinksService} from '../../../service/links.service';

@Component({
  selector: 'app-value-set-detail',
  templateUrl: './value-set-detail.component.html',
  styleUrls: ['./value-set-detail.component.css']
})
export class ValueSetDetailComponent implements OnInit {

  valuesetid = undefined;
  valueSet: fhir.ValueSet;

  constructor(private route: ActivatedRoute,
              private fhirService: FhirService,
              private linksService: LinksService) { }

  ngOnInit() {

    this.valuesetid = this.route.snapshot.paramMap.get('valuesetid');
    if (this.valuesetid !== undefined) {
    this.fhirService.getResource('/ValueSet/' + this.valuesetid + '/$expand').subscribe( result => {
       this.valueSet = result;
    });
    }
  }

}
