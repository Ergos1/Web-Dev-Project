import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/interfaces/cart';
import { Product } from 'src/interfaces/product';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!: Cart;

  constructor(private cartService:CartService, config: NgbModalConfig,
              private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }

  ngOnInit(): void {
    this.cartService.ngOnInit();
    this.getCart();
  }

  getCart():void{
    this.cart = this.cartService.getCart();
  }

  deleteFromCart(product:Product):void{
    let id = this.cart.products.indexOf(product);
    this.cartService.removeProduct(id);
  }

  toOrder(country:string, city:string, address:string):void{
    alert('Order will arrive to ' + country + "; " + city + "; " + address);
    this.modalService.dismissAll();
    this.cartService.removeAllProducts();
    location.reload();
  }

  openWindow(content:object){
    this.modalService.open(content, {centered:true, size:'sm'});
  }


}
