import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/interfaces/cart';
import { Product } from 'src/interfaces/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!:Cart;

  constructor(private cartService:CartService) { }

  ngOnInit(): void {
    this.cartService.ngOnInit();
    this.getCart();
  }

  getCart():void{ 
    this.cart = this.cartService.getCart();
  }

  showId(product:Product):void{
    let id = this.cart.products.indexOf(product);
    this.cartService.removeProduct(id);
  }

}
