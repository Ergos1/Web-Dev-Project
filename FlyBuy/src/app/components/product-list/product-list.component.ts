import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/interfaces/product';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products!:Product[];
  category_name!:string;

  constructor(private route: ActivatedRoute, private router: Router, private productService:ProductService,
    private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getCategoryId():number{
    return Number(this.route.snapshot.paramMap.get('categoryId'));
  }

  getProducts():void{
    this.productService.getProductsByCategoryId(this.getCategoryId()).subscribe((data)=>{
      this.products = data;
      this.getCategoryName();
    })
  }

  getCategoryName():void{
    this.categoryService.getCategory(this.getCategoryId()).subscribe((data)=>{
      this.category_name = data.name;
    })
  }

}
