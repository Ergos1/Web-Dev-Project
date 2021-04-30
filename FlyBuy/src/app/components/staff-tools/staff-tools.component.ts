import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert.service';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
import { Alert } from 'src/interfaces/alert';
import { Category } from 'src/interfaces/category';
import { Image } from 'src/interfaces/image';
import { Option } from 'src/interfaces/option';
import { Product } from 'src/interfaces/product';
@Component({
  selector: 'app-staff-tools',
  templateUrl: './staff-tools.component.html',
  styleUrls: ['./staff-tools.component.css']
})
export class StaffToolsComponent implements OnInit {

  //Form fields
  name!:string;
  image_url!:string;
  price!:number;
  description!:string;
  rating!:number;
  category_id!:number;

  //Service fields
  categories!:Category[];
  category!:Category;//selected category
  products!:Product[];
  product!:Product;

  //Local fields
  selected_id!:number;
  options!:Option[];


  constructor(private modalService: NgbModal, private config: NgbModalConfig, private categoryService:CategoryService,
    private productService:ProductService, private imageService:ImageService, private alertService:AlertService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }
  

  ngOnInit(): void {
    this.getCategories();
    this.getProducts(); 
    this.resetOption();
  }


  resetOption():void{
    this.selected_id = 0;
    this.options = [{id:0, name:'No selected'}];
    this.category = {} as Category;
    this.product = {} as Product;
    this.name = '';
    this.image_url = '';
    this.price = 0;
    this.description = '';
    this.rating = 0;
    this.category_id = 0;
  }


  openWindow(content:object, size:string, name:string):void{
    this.modalService.open(content, { centered: true, size: size})
  }


  addCategory():void{
    this.name = this.name.trim();
    this.image_url = this.image_url.trim();

    let category:Category = {name:this.name, image_url:this.image_url} as Category;
    let alert:Alert;
    this.categoryService.addCategory(category).subscribe(
    (data)=>{
      alert = {message:'Category was added', type:'success'};
    },
    (error)=>{
      alert= {message:'Something is wrong', type:'danger'};
    }).add(()=>{
      this.alertService.showAlert(alert);
      this.getCategories();    
    });
  }


  deleteCategory():void{
    let alert:Alert;
    this.categoryService.deleteCategory(this.category).subscribe(
    (data)=>{
      alert = {message:'Category was deleted', type:'success'};
    },
    (error)=>{
      alert= {message:'Something is wrong', type:'danger'};
    }).add(()=>{
      this.alertService.showAlert(alert);
      this.getCategories();    
    })
  }


  deleteProduct():void{
    let alert:Alert;
    this.productService.deleteProduct(this.product).subscribe(
    (data)=>{
      alert = {message:'Product was deleted', type:'success'};
    },
    (error)=>{
      alert= {message:'Something is wrong', type:'danger'};
    }).add(()=>{
      this.alertService.showAlert(alert);
      this.getProducts();
    })
  }


  addProduct():void{
    this.name = this.name.trim();
    let product:Product = {name:this.name, price: this.price, description: this.description, rating: this.rating, category_id: this.category.id} as Product;
    let alert:Alert;
    this.productService.addProduct(product).subscribe(
    (data)=>{
      alert = {message:'Product was added', type:'success'};
    },
    (error)=>{
      alert= {message:'Something is wrong', type:'danger'};
    }).add(()=>{
      this.alertService.showAlert(alert);
      this.getProducts();
    })
  }


  addImage():void{
    let image:Image = {product_id: this.product.id, url: this.image_url} as Image;
    let alert:Alert;
    this.imageService.addImage(image).subscribe(
    (data)=>{
      alert = {message:'Image was added', type:'success'};
    },
    (error)=>{
      alert= {message:'Something is wrong', type:'danger'};
    }).add(()=>{
      this.alertService.showAlert(alert);
    })
  }


  getCategories():void{
    this.categoryService.getCategories().subscribe((data)=>{
      this.categories = data;
    })
  }


  getProducts():void{
    this.productService.getProducts().subscribe((data)=>{
      this.products = data;
    })
  }


  changeSelected(value:number):void{
    this.selected_id = value;
    this.category = this.categories.find(x=>x.id == this.selected_id) || {} as Category;
    this.product = this.products.find(x => x.id == this.selected_id) || {} as Product;
  }

}
