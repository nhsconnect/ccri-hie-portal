import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FhirService} from '../../../service/fhir.service';

@Component({
  selector: 'app-code-system-detail',
  templateUrl: './code-system-detail.component.html',
  styleUrls: ['./code-system-detail.component.css']
})
export class CodeSystemDetailComponent implements OnInit {

  codesystemid = undefined;
  codeSystem: fhir.CodeSystem;

  constructor(private route: ActivatedRoute,
              private fhirService: FhirService) { }

  ngOnInit() {

    this.codesystemid = this.route.snapshot.paramMap.get('codesystemid');
    if (this.codesystemid !== undefined) {
      this.fhirService.getResource('/CodeSystem/' + this.codesystemid).subscribe( result => {
        this.codeSystem = result;
      });
    }
  }

}
