import { Injectable, OnInit } from '@angular/core';
import { Cart } from 'src/interfaces/cart';
import { Product } from 'src/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit{

  cart!:Cart;

  ngOnInit():void{
    this.cart = this.getCart();
  }

  getCart():Cart{
    if(this.cart){
      return this.cart;
    }
    if(localStorage.getItem('cart')){
      return JSON.parse(localStorage.getItem('cart')||'');
    } 
    return {products:[]} as Cart;
  }

  addProduct(product:Product):void{
    this.cart.products.push(product);
    this.saveCart();
  }

  removeProduct(id:number):void{
    this.cart.products.splice(id, 1);
    this.saveCart();
  }

  
  removeAllProducts():void{
    this.cart.products = [];
    this.saveCart();
  }
  
  
  saveCart():void{
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }


  getAllProductsSplit(seperator:string = ' '):string{
    let result = "";
    this.cart.products.map(product=>{
      result+=product.name+seperator;
    });
    return result;
  }


}
