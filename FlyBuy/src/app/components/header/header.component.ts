import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/interfaces/menu-item';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  menuItems!:MenuItem[];
  isCollapsed:boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.menuItems = [
      {name:"Home", link:""},
      {name:"Products", link:""},
      {name:"Login", link:""},
      {name:"Registration", link:""},
      {name:"Cart", link:""}
    ];
  }


}
