import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Cart } from 'src/interfaces/cart';
import { Product } from 'src/interfaces/product';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/interfaces/alert';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart!:Cart;

  constructor(private cartService:CartService, config: NgbModalConfig,
    private modalService: NgbModal, private alertService:AlertService) {
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
    let alert:Alert = {message:`Order which include : ${this.cartService.getAllProductsSplit('; ')} will be arrived.
    Country: ${country},
    City: ${city},
    Address: ${address}`, type:"success"}
    this.modalService.dismissAll();
    this.cartService.removeAllProducts();
    this.alertService.showAlert(alert);
  }

  openWindow(content:object){
    this.modalService.open(content, {centered:true, size:'sm'});
  }
  

}
