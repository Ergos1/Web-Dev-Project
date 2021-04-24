import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/interfaces/menu-item';
import { SidebarService } from '../../services/sidebar.service';
import { menuItems } from '../../../mock-data/menu-items';
import { Location } from '@angular/common';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems!: MenuItem[];
  isOpen!: boolean;
  log!: string;

  constructor(private sidebarService: SidebarService, private router: Router,
              private activatedRoute: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.menuItems = menuItems;
    this.getIsOpen();
    this.setActive('');
    this.checkUrlChange();
  }

  checkUrlChange(): void{
    this.location.onUrlChange((data) => {
      this.setActive(data.split('/')[1]);
    });
  }

  getIsOpen(): void{
    this.sidebarService.isOpen.subscribe( () => {
      this.isOpen = this.sidebarService.getIsOpen();
      this.getLog();
    });
  }

  setActive(nameItem: string): void{
    for (let i = 0; i < 3; i++) {
      this.menuItems[i].active = false;
    }
    if (nameItem === '') {
      let link = window.location.href;
      let arr = link.split('/');
      for (let item of this.menuItems){
        if (arr.find(x => x.toLowerCase() === item.link.toLowerCase()) != undefined){
          nameItem = item.name;
          break;
        }
      }
    }
    if (nameItem.trim() === '') { nameItem = 'home'; }
    for (let i = 0; i < menuItems.length; i++) {
      if (menuItems[i]['link'].toLowerCase() === nameItem.toLowerCase()) {
        menuItems[i]['active'] = true;
      }
    }
  }

  getLog(): void{
    if (this.isOpen){
      this.log = 'FlyBuy';
    } else {
      this.log = 'F';
    }
  }

  goToPage(url: string): void{
    this.router.navigate([url]);
  }
}
