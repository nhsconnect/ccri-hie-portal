import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FhirService} from './fhir.service';


@Injectable()
export class AppConfigService {

  private appConfig;

  private initEvent: EventEmitter<any> = new EventEmitter();

  public getInitEventEmitter () {
    return this.initEvent;
  }
    constructor(private http: HttpClient, private fhirService: FhirService) {}

    loadConfig() {
        // console.log('hello App' + document.baseURI);
        // only run if not localhost
        console.log('baseURI = ' + document.baseURI);

        if (!document.baseURI.includes('localhost')) {
            console.log('calling config endpoint: ' + document.baseURI + 'camel/config/http');
            this.http.get<any>(document.baseURI + 'camel/config/http').subscribe(result => {
                  console.log('app config fhirServer retrieved.');
                  console.log(result);

                  const rootUrl: string = result.fhirServer;
                  this.fhirService.setRootUrl(rootUrl);
                  this.fhirService.setGPCNRLSUrl(document.baseURI);
                  this.appConfig = result;
                  this.initEvent.emit(result);
              },
                error => {
                    console.log(error);
                    console.log('No server detected');
                    this.initEvent.emit(undefined);
                    // this.fhirServer.setRootUrl('http://127.0.0.1:8183/ccri-fhir/STU3');
                });
        }
    }

  getConfig() {
    return this.appConfig;
  }

}
