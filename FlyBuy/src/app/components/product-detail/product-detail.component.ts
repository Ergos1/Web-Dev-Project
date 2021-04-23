import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
import { Cart } from 'src/interfaces/cart';
import { Comment } from 'src/interfaces/comment';
import { UserService } from 'src/app/services/user.service';
import { CommentService } from 'src/app/services/comment.service';
import {NgbRatingConfig} from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  username!: string;
  isLogin!: boolean;
  product!: Product;
  constructor(private route: ActivatedRoute, private router: Router, 
    private productService: ProductService, private userService:UserService,
    private commentService:CommentService, private config: NgbRatingConfig,
    private cartService:CartService) {
      config.max = 10;
      config.readonly = true;
      cartService.ngOnInit();
    }

  ngOnInit(): void {
    this.getProduct();
    this.getIsLogin();
  }

  getIsLogin():void{
    this.userService.getIsLogin().subscribe((data)=>{
      this.isLogin=data;
      if(this.isLogin){
        this.username = JSON.parse(localStorage.getItem('user')||"{'username':''}").username;
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
      console.log(this.product);
    });
  }

  changeImage(url: string): void {
    const div = document.querySelectorAll('img')[0];
    div.src = url;
  }


  addComment(text:string):void{
    // let comment:Comment = {'username':this.username, 'text':text, 'likes':0, ''};
    this.commentService.addComment({'username':this.username, 'text':text, 'product_id':this.product.id} as Comment).subscribe((data)=>{
      console.log(data);
    }, (error)=>{
      console.log(error);
    });
  }

  addToCart():void{
    this.cartService.addProduct(this.product);
  }
  likeIt():void{
    console.log("i like it");
  }
}
