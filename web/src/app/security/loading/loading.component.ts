import { Component, OnInit} from '@angular/core';
import {AppConfigService} from '../../service/app-config.service';
import {FhirService} from '../../service/fhir.service';
import {Router} from '@angular/router';
import {TdLoadingService} from '@covalent/core/loading';


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
        console.log('loading: ' + this.fhirService.getBaseUrl());
        if (this.fhirService.getBaseUrl() !== this.appConfig.getConfig().fhiServer) {
          console.log('Mismatch in config and server');
          if (this.fhirService.getBaseUrl().includes('8186') && !location.href.includes('localhost')) {
            console.log('Default server detected and not running on localhost');
            let url = this.appConfig.getConfig().fhirServer;
            if (localStorage.getItem('access_token_nhs-smart-ehr') !== undefined) {
              console.log('Access Token present, swapping to smart on fhir');
              url = url.replace('ccri-fhir', 'ccri-smartonfhir');
            }
            console.log('Swapping server to retrieved url');
            this.fhirService.setRootUrl(url);
          }
        }
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
