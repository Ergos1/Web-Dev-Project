import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../app/services/sidebar.service";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isOpen!:boolean;
  
  constructor(private sidebarService:SidebarService){
  }

  ngOnInit(){
    this.getIsOpen();
  }

  getIsOpen():void{
    this.sidebarService.isOpen.subscribe(()=>{
      this.isOpen = this.sidebarService.getIsOpen();
    })
  }
}
