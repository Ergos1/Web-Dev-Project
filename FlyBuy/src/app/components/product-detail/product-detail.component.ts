import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
import {Image} from "../../../interfaces/image";
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product!: Product;
  ctrl = new FormControl(null, Validators.required);
  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductService) { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProductId(): number{
    return Number(this.route.snapshot.paramMap.get('productId'));
  }

  getProduct(): void{
    let id = this.getProductId();
    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  changeImage(url: string): void {
    const div = document.querySelectorAll('img')[0];
    div.src = url;
  }

  toggle(): void {
    if (this.ctrl.disabled) {
      this.ctrl.enable();
    } else {
      // this.product.rating +=
      this.productService.updateRating(this.product, this.ctrl.value);
      this.ctrl.disable();
    }
  }
}
