import { Component, OnInit } from '@angular/core';

import {FhirService} from '../../../service/fhir.service';
import {EprService} from '../../../service/epr.service';
import {AuthService} from '../../../service/auth.service';
import {RegisterSmartComponent} from '../../../dialog/register-smart/register-smart.component';
import {TdMediaService} from '@covalent/core/media';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';


@Component({
  selector: 'app-smart-apps',
  templateUrl: './smart-apps.component.html',
  styleUrls: ['./smart-apps.component.css']
})
export class SmartAppsComponent implements OnInit {

  constructor(
    public media: TdMediaService,
    private fhirService: FhirService,
              public dialog: MatDialog,
              private eprService: EprService,
              private authService: AuthService) { }

  cards = undefined;

  title = 'SMART on FHIR';

  ngOnInit() {
    this.eprService.setTitle(this.title);
    // this.cards = environment.apps;
    this.getClients();


  }
  getClients() {
    this.cards = [];
    this.authService.getClients().subscribe( response => {
        const clients: any[] = response as any[];
        for (const client of clients) {

            if (client.scope.includes('launch')) {
                let found = false;
                for (const search of this.cards) {
                    if (search.clientId === client.clientId) {
                        found = true;
                    }
                }
                if (!found) {
                    console.log(client);
                    const newclient = {
                        id: client.id,
                        name: client.clientName,
                        image: client.logoUri,
                        url: '',
                        notes: client.clientDescription,
                        source: '',
                        clientId: client.clientId
                    };
                    this.addClient(newclient);
                }
            }

        }
    });

  }

  addClient(client) {
    this.fhirService.get('/Endpoint?identifier=' + client.clientId).subscribe( result => {
      const bundle: fhir.Bundle = result;
      if (bundle.entry !== undefined) {
        for (const entry of bundle.entry) {
          const resource: fhir.Resource = entry.resource;
          if (resource.resourceType === 'Endpoint') {
              client.endpoint = resource;
          }
        }
      }
      },
      () => {

      },
      () => {
      this.cards.push(client);
    });

  }

    smartAppConfig(card) {

        // Get data from endpoint and start up the dialog

        this.fhirService.get('/Endpoint?identifier=' + card.clientId).subscribe( result => {

            const bundle: fhir.Bundle = result;
            let endpoint: fhir.Endpoint;
            if (bundle.entry !== undefined) {
                for (const entry of bundle.entry) {
                  const resource: fhir.Resource = entry.resource;
                  if (resource.resourceType === 'Endpoint') {
                    console.log('Found endpoint');
                    console.log(resource);
                    endpoint = <fhir.Endpoint> resource;

                    }
                }
            }

            if (endpoint === undefined) {
              console.log(card);
              endpoint = {
                resourceType: 'Endpoint',
                identifier: [{
                  system: 'https://fhir.leedsth.nhs.uk/Id/clientId',
                  value: card.clientId
                }],
                status: 'active',
                'connectionType': {
                  'system': 'http://hl7.org/fhir/endpoint-connection-type',
                  'code': 'direct-project'
                },
                name: card.name,
                payloadType: [
                  {
                    'coding': [
                      {
                        'system': 'http://hl7.org/fhir/resource-types',
                        'code': 'Endpoint'
                      }
                    ]
                  }
                ],
                address: ''
              };
            }
          const dialogConfig = new MatDialogConfig();



          dialogConfig.disableClose = true;
          dialogConfig.autoFocus = true;

          dialogConfig.data = {
            endpoint: endpoint
          };
          const resourceDialog: MatDialogRef<RegisterSmartComponent> = this.dialog.open( RegisterSmartComponent, dialogConfig);

          resourceDialog.afterClosed().subscribe(res => {
              this.getClients();
            }
          );

        });

    }


    registerApp() {
        const dialogConfig = new MatDialogConfig();

        dialogConfig.disableClose = true;
        dialogConfig.autoFocus = true;
        dialogConfig.data = {

        };
        const resourceDialog: MatDialogRef<RegisterSmartComponent> = this.dialog.open( RegisterSmartComponent, dialogConfig);

    }

    configuration() {
        this.authService.setCookie();
        let url: string = localStorage.getItem('registerUri');
        url = url.replace('register', '');
        window.open(url, '_blank');
    }

}
