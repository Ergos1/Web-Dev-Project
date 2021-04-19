import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!:Product[];

  constructor(private route: ActivatedRoute, private router: Router, private productService:ProductService) { }

  ngOnInit(): void {
    this.getProducts(); 
  }

  getCategoryId():number{
    return Number(this.route.snapshot.paramMap.get('categoryId'));
  }

  getProducts():void{
    this.productService.getProducts().subscribe((data)=>{
      let id = this.getCategoryId()
      this.products = data.filter(x=>x.id == id);
    })
  }

}
