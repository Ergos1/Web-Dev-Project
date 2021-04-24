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
  liked!: boolean;

  constructor(private route: ActivatedRoute, private router: Router,
              private productService: ProductService, private userService: UserService,
              private commentService: CommentService, private config: NgbRatingConfig,
              private cartService: CartService) {
    config.max = 10;
    config.readonly = true;
    cartService.ngOnInit();
  }

  ngOnInit(): void {
    this.getProduct();
    this.getIsLogin();
    this.liked = false;
  }

  getIsLogin(): void {
    this.userService.getIsLogin().subscribe((data) => {
      this.isLogin = data;
      if (this.isLogin) {
        this.username = JSON.parse(localStorage.getItem('user') || "{'username':''}").username;
      }
    });
  }

  getProductId(): number {
    return Number(this.route.snapshot.paramMap.get('productId'));
  }

  getProduct(): void {
    let id = this.getProductId();
    this.productService.getProductById(id).subscribe((data) => {
      this.product = data;
      this.product.views++;
      this.productService.updateProduct(this.product).subscribe((data) => {
        console.log('Views added');
      });
    });
  }

  changeImage(url: string): void {
    const div = document.querySelectorAll('img')[0];
    div.src = url;
  }


  addComment(text: string): void {
    if (text.trim() === '') {
      alert('Text can not be empty');
      return;
    }
    this.commentService.addComment({
      'username': this.username,
      'text': text,
      'product_id': this.product.id
    } as Comment).subscribe((data) => {
      location.reload();
    }, (error) => {
      console.log(error);
    });
  }


  addToCart(): void {
    if (this.isLogin === false) {
      alert('Please, login for the start!');
      return;
    }
    this.cartService.addProduct(this.product);
  }


  likeIt(): void {
    if (this.liked === false) {
      this.productService.updateProduct(this.product).subscribe((data) => {
          alert('You liked');
          this.product.likes++;
          this.liked = true;
        },
        (error) => {
          alert('Please, login for the start');
        });
    } else {
      this.productService.updateProduct(this.product).subscribe((data) => {
        this.product.likes--;
        this.liked = false;
      });
    }
  }

  share(link: string): void {
    window.open(link + 'Смотри, что нашёл, тебе пригодиться: ' + location.href);
  }
}
