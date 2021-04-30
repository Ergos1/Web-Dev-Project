import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MenuItem } from 'src/interfaces/menu-item';
import { SidebarService } from "../../services/sidebar.service";
import { menuItems } from '../../../mock-data/menu-items';
import { Location } from '@angular/common';
import { User } from 'src/interfaces/user';
import { Alert } from 'src/interfaces/alert';
import { AlertService } from 'src/app/services/alert.service';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems!:MenuItem[];
  isOpen!:boolean;
  log!:string;

  constructor(private sidebarService:SidebarService, private router:Router, 
    private activatedRoute: ActivatedRoute, private location:Location,
    private alertService:AlertService) { }

  ngOnInit(): void {
    this.menuItems = menuItems;
    this.getIsOpen();
    this.setActive('');
    this.checkUrlChange();
  }

  checkUrlChange():void{
    this.location.onUrlChange((data)=>{
      this.setActive(data.split('/')[1]);
    })
  }

  getIsOpen():void{
    this.sidebarService.isOpen.subscribe( () => {
      this.isOpen = this.sidebarService.getIsOpen();
      this.getLog();
    })
  }

  setActive(nameItem:string):void{
    for (let i = 0; i < menuItems.length; i++) {
      this.menuItems[i].active = false;
    }
    if(nameItem == ''){
      let link = window.location.href;
      let arr = link.split('/');
      for(let item of this.menuItems){
        if(arr.find(x => x.toLowerCase() == item.link.toLowerCase()) != undefined){
          nameItem = item.name;
          break;
        }
      }
    }
    if(nameItem.trim() == '') nameItem = 'home';
    for(let i = 0; i < menuItems.length; i++){
      if(menuItems[i]['link'].toLowerCase() == nameItem.toLowerCase()){
        menuItems[i]['active'] = true;
      }
    }
  }

  getLog():void{
    if(this.isOpen){
      this.log = "FlyBuy";
    } else {
      this.log = "F";
    }
  }

  goToPage(item: MenuItem): void{
    if(item.need_permission){
      if(!this.checkToPermission()){
        let alert:Alert = {message:'You have not permission', type:'danger'};
        this.alertService.showAlert(alert);
        return;
      }
    }
    this.router.navigate([item.link]);
  }

  checkToPermission():boolean{
    return JSON.parse(localStorage.getItem('user') || '{"is_staff":false}').is_staff;
  }
}
