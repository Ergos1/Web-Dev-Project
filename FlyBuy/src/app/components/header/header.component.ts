import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isOpen!:boolean;
  logIn!:boolean;
  constructor(private sidebarService:SidebarService, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }

  ngOnInit(): void {
    this.isOpen = this.sidebarService.getIsOpen();
  }

  onChange():void{
    this.isOpen = !this.isOpen;
    this.sidebarService.setIsOpen(this.isOpen);
  }
  login(content:any):void{
    this.modalService.open(content);
    this.logIn = !this.logIn;
  }
  logout(content:any):void{
    this.logIn = !this.logIn;
  }


  



}
