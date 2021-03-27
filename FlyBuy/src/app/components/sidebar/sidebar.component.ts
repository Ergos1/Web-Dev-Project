import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'src/interfaces/menu-item';
import { SidebarService } from "../../services/sidebar.service";


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems!:MenuItem[];
  isOpen!:boolean;
  log!:string;

  constructor(private sidebarService:SidebarService, private router:Router) { }

  ngOnInit(): void {
    this.menuItems = [
      {name:"Home", link:"",active:true,icon:"home"},
      {name:"Products", link:"",active:false,icon:"store"},
      {name:"Cart", link:"",active:false,icon:"shopping_cart"}
    ];
    this.getIsOpen();
  }

  getIsOpen():void{
    this.sidebarService.isOpen.subscribe( () => {
      this.isOpen = this.sidebarService.getIsOpen();
      this.getLog();
    })
  }

  getLog():void{
    if(this.isOpen){
      this.log = "FlyBuy";
    } else {
      this.log = "F";
    }
  }

  goToPage(url:string):void{
    this.router.navigate([url]);
  }

}
