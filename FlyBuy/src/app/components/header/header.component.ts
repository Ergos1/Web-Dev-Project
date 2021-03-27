import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isOpen!:boolean;

  constructor(private sidebarService:SidebarService) {
  }

  ngOnInit(): void {
    this.isOpen = this.sidebarService.getIsOpen();
  }

  onChange():void{
    this.isOpen = !this.isOpen;
    this.sidebarService.setIsOpen(this.isOpen);
  }


  



}
