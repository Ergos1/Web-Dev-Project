import { Component, Injectable } from '@angular/core';
import { Alert } from "../../interfaces/alert";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  alert:BehaviorSubject<Alert> = new BehaviorSubject<Alert>({'message':'', 'type':'default'});

  constructor() { }

  getAlert():Observable<Alert>{
    return this.alert;
  }

  showAlert(alert:Alert){
    this.alert.next(alert);
  }
}
