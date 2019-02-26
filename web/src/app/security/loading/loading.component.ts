import { Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../service/app-config.service';
import {FhirService} from '../../service/fhir.service';
import {Router} from '@angular/router';
import {TdLoadingService} from '@covalent/core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

    overlayStarSyntax = false;

    overlayDemo: any = {
        name: '',
        description: '',
    };
  constructor(private appConfig: AppConfigService,
              private fhirService: FhirService,
              private router: Router,
              private _loadingService: TdLoadingService) { }

  ngOnInit() {
      console.log('Loading Component');

      this._loadingService.register('overlayStarSyntax');

      if (this.appConfig.getConfig() === undefined) {
        this.appConfig.getInitEventEmitter().subscribe(result => {
          console.log(this.appConfig.getConfig());
          console.log('Config retrieved');
          if (this.appConfig.getConfig() !== undefined) {
            console.log('Setting fhirServer base');
            this.fhirService.setRootUrl(this.appConfig.getConfig().fhirServer);
            this.getConformanace();
          }
        });
      } else {
        console.log('app config present');
        console.log(this.appConfig.getConfig());
        this.redirectToHIE();
      }
      // this.appConfig.loadConfig();

  }


  getConformanace() {

    this.fhirService.getConformanceChange().subscribe( result => {
        console.log(this.fhirService.conformance);
      if (this.fhirService.conformance !== undefined) {
          this.redirectToHIE();
      }
    });
    this.fhirService.getConformance();

}

  redirectToHIE() {
    console.log('Navigate to HIEr');
    this.router.navigate(['hie']).then( () => {
      // console.log('Navigate by Url');
    });
  }

    toggleOverlayStarSyntax(): void {
        if (this.overlayStarSyntax) {
            this._loadingService.register('overlayStarSyntax');
        } else {
            this._loadingService.resolve('overlayStarSyntax');
        }
        this.overlayStarSyntax = !this.overlayStarSyntax;
    }
}
