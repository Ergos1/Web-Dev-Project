import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { User } from 'src/interfaces/user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  username!:string;
  password!:string;
  isOpen!:boolean;
  logIn!:boolean;
  user!:User;

  constructor(private sidebarService:SidebarService, config: NgbModalConfig, private modalService: NgbModal, private userService:UserService) {
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
  
  
  openSignIn(content:object):void{
    this.modalService.open(content, { centered: true, size: 'sm' });
  }

  
  login():void{
    this.logIn = !this.logIn;
    this.userService.login(this.username, this.password).subscribe((data)=>{
      console.log(data);
      this.getUser();
    })
  }

  getUser():void{
    this.userService.getUser(this.username).subscribe((data)=>{
      console.log(data.is_staff);
    })
  }



  logout():void{
    this.logIn = !this.logIn;
  }


  



}
