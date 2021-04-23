import { Component, OnInit } from '@angular/core';
import { SidebarService } from "../../services/sidebar.service";
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/interfaces/user';
import { AuthToken } from 'src/interfaces/authtoken';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { Alert } from 'src/interfaces/alert';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  //Form's fields
  username!:string;
  password!:string;
  email!:string;
  first_name!:string;
  last_name!:string;

  //Service's fields
  isOpen!:boolean;
  isLogin!:boolean;

  //Local stortage's fields
  user!:User;
  token!:AuthToken;


  constructor(private sidebarService:SidebarService, config: NgbModalConfig,
     private modalService: NgbModal, private userService:UserService,
     private productService: ProductService, private router:Router,
     private alertService: AlertService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }

 
  ngOnInit(): void {
    this.clearFields();

    this.isOpen = this.sidebarService.getIsOpen();
    this.getLogin();
    this.getIsLogin();
  }


  clearFields():void{
    this.username = '';
    this.password = '';
    this.email = '';
    this.first_name = '';
    this.last_name = '';
  }


  onChange():void{
    this.isOpen = !this.isOpen;
    this.sidebarService.setIsOpen(this.isOpen);
  }
  
  
  openWindow(content:object):void{
    this.modalService.open(content, { centered: true, size: 'sm' });
  }


  getIsLogin():void{
    this.userService.getIsLogin().subscribe((data)=>{
      this.isLogin = data;
      if(this.isLogin == false) this.deleteAll();
    });
  }


  getLogin():void{
    this.isOpen = this.sidebarService.getIsOpen();
    if(localStorage.getItem('token')){
      this.token = JSON.parse(localStorage.getItem('token')||'');
      if(localStorage.getItem('user')){
        this.user = JSON.parse(localStorage.getItem('user')||'');
        this.userService.setIsLogin(true);
      }
      else this.deleteToken();
    }
  }

  
  getToken():void{
    this.userService.getToken(this.username, this.password).subscribe((data)=>{
      this.token = data;
      this.saveToken();
      this.getUser();
    },
    (error) =>{
      let alert:Alert = {'message':'Login or password is incorrect'}
      this.alertService.showAlert(alert);
    })
    
  }


  logout():void{
    this.userService.setIsLogin(false);
    location.reload();
  }
  

  getUser():void{
    this.userService.getUser(this.username).subscribe((data)=>{
      this.user = data;
      this.saveUser();

      this.modalService.dismissAll('done');
      
      this.userService.setIsLogin(true);
      this.clearFields();
      location.reload();
  })
  }

  
  saveToken():void{
    localStorage.setItem('token', JSON.stringify(this.token));
  }


  saveUser():void{
    localStorage.setItem('user', JSON.stringify(this.user));
  }


  deleteAll():void{
    this.deleteToken();
    this.deleteUser();
    this.deleteCart();
  }

  deleteCart():void{
    localStorage.removeItem('cart');
  }


  deleteToken():void{
    localStorage.removeItem('token');
  }

  
  deleteUser():void{
    localStorage.removeItem('user');
  }


  register():void{
    this.username = this.username.trim();
    this.password = this.password.trim();
    this.email = this.email.trim();
    this.first_name = this.first_name.trim();
    this.last_name = this.last_name.trim();

    let user:User = {'username': this.username, 'password': this.password, "email": this.email,
     "first_name": this.first_name, "last_name": this.last_name, 'is_staff': false};
    
     this.userService.addUser(user).subscribe((data)=>{
      alert('User were created!!!')
      this.modalService.dismissAll('done');
    }, (error)=>{
      console.log(error);
      alert('Not good something');
    }
    )
  }


  goToProduct(product_name:string):void{
    let product:Product;
    this.productService.getProductByName(product_name).subscribe((data)=>{
      product=data;
      this.router.navigateByUrl(`categories/${product.category_id}/products/${product.id}`);
    }, (error)=>{
      alert('Not found');
    });

  }

  


  



}
