import {Component, Inject, Input, OnInit, ViewContainerRef} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


declare var $: any;

@Component({
  selector: 'app-register-smart-secret',
  templateUrl: './register-smart-secret.component.html',
  styleUrls: ['./register-smart-secret.component.css']
})
export class RegisterSmartSecretComponent implements OnInit {



  constructor(
    public dialogRef:  MatDialogRef<RegisterSmartSecretComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    this.response = data.response;
}

  @Input()
  response;

    close() {
        this.dialogRef.close();
    }
  ngOnInit() {
  }

 }


