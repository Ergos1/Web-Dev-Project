import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../app/services/sidebar.service";
import { AlertService } from './services/alert.service';
import { Alert } from 'src/interfaces/alert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  
  isOpen!:boolean;
  alerts!:Alert[];

  constructor(private sidebarService:SidebarService, private alertService:AlertService){
  }

  ngOnInit(){
    this.getIsOpen();
    this.getAlert();
  }

  getIsOpen():void{
    this.sidebarService.isOpen.subscribe(()=>{
      this.isOpen = this.sidebarService.getIsOpen();
    })
  }

  getAlert():void{
    this.alerts = [];
    this.alertService.getAlert().subscribe((data)=>{
      if(data.type!='default'){
        this.alerts.push(data);
      }
    })
  }

  close(alert: Alert) {
    this.alerts.splice(this.alerts.indexOf(alert), 1);
  }

}
