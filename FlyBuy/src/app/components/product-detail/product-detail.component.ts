import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
import { Comment } from 'src/interfaces/comment';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { Location } from '@angular/common';
import { Alert } from 'src/interfaces/alert';
import { AlertService } from 'src/app/services/alert.service';
import { User } from 'src/interfaces/user';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  //Form field
  username!: string;

  //Service field
  isLogin!: boolean;
  product!: Product;
  liked!: boolean;
  user_is_staff!: boolean;

  constructor(private route: ActivatedRoute, private router: Router, 
    private productService: ProductService, private userService:UserService,
    private commentService:CommentService, private config: NgbRatingConfig,
    private cartService:CartService, private location: Location,
    private alertService:AlertService) {
      config.max = 10;
      config.readonly = true;
      cartService.ngOnInit();
    }

  ngOnInit(): void {
    this.getProduct();
    this.getIsLogin();
    this.liked = false;
    this.checkUrlChange();
  }

  checkUrlChange():void{
    this.location.onUrlChange((data)=>{
      location.reload();
    })
  }

  getIsLogin():void{
    this.userService.getIsLogin().subscribe((data)=>{
      this.isLogin=data;
      if(this.isLogin){
        let user:User = JSON.parse(localStorage.getItem('user')||"{'username':'', 'is_staff':'false', 'password':'string','first_name':'', 'last_name':'', 'email':''}");
        this.user_is_staff = user.is_staff;
        this.username = user.username;
      }
    })
  }

  getProductId(): number{
    return Number(this.route.snapshot.paramMap.get('productId'));
  }

  getProduct(): void{
    let id = this.getProductId();
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.product.views++;
      this.updateProduct();
    });
  }


  updateProduct():void{
    this.productService.updateProduct(this.product).subscribe(
    (data)=>{
      console.log(data);
    },
    (error)=>{
      console.log(error);
    });
  }

  deleteProduct():void{
    this.productService.deleteProduct(this.product).subscribe((data)=>{
      console.log('Product deleted');
      this.location.back();
    })
  }


  changeImage(url: string): void {
    const div = document.querySelectorAll('img')[0];
    div.src = url;
  }


  addComment(text:string):void{
    if(text.trim() == ''){
      let alert:Alert = {message:'Comment can not be empty', type: 'danger'};
      this.alertService.showAlert(alert);
      return;
    }
    this.commentService.addComment({'username':this.username, 'text':text, 'product_id':this.product.id} as Comment).subscribe((data)=>{
      location.reload();
    }, (error)=>{
      let alert:Alert = {message:'Something is wrong', type: 'danger'};
      this.alertService.showAlert(alert);
    });
  }

  
  addToCart():void{
    if(this.isLogin == false){
      let alert:Alert = {message:'Please, first login', type: 'danger'};
      this.alertService.showAlert(alert);
      return;
    }
    this.cartService.addProduct(this.product);
    let alert:Alert = {message:`${this.product.name} is added to cart`, type: 'success'};
    this.alertService.showAlert(alert);
  }
  
  
  likeIt():void{
    if(this.liked==false){
      this.productService.updateProduct(this.product).subscribe((data)=>{
        this.product.likes++;
        this.liked = true;
        this.updateProduct();

        let alert:Alert = {message:`You liked`, type: 'success'};
        this.alertService.showAlert(alert);
      }, 
      (error)=>{
        let alert:Alert = {message:`Please, first login`, type: 'danger'};
        this.alertService.showAlert(alert);
      });
    }
  }


  share(link:string):void{
    window.open(link + "Смотри, что нашёл, тебе пригодиться: " + location.href);
  }
}
