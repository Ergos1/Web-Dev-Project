import { Component, OnInit } from '@angular/core';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoryService } from 'src/app/services/category.service';
import { ImageService } from 'src/app/services/image.service';
import { ProductService } from 'src/app/services/product.service';
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

  //Local fields
  categories!:Category[];
  category!:Category;//selected category
  products!:Product[];
  product!:Product;
  selected_id!:number;
  options!:Option[];

  constructor(private modalService: NgbModal, private config: NgbModalConfig, private categoryService:CategoryService,
    private productService:ProductService, private imageService:ImageService) {
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }

  ngOnInit(): void {
    this.getCategories();
    this.getProducts(); 
  }

  fillOption(array:any[]):void{
    this.selected_id = 0;
    this.options = [{id:0, name:'No selected'}];
    this.categories.push({id:0, name:'Unknown', image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjvg2PX8WrRFty9COIwiAHSmYXYdMfyz1d_rN0oqdV2tnrbA1imG8vjNKw1u0da0cBxDU&usqp=CAU"});
    this.category = this.categories[this.categories.length-1];
    this.product = {id:0} as Product;
    array.map( x => this.options.push({name:x.name, id:x.id}));
  }

  openWindow(content:object, size:string, name:string):void{
    if(name == 'category'){
      this.fillOption(this.categories);
    } else {
      this.fillOption(this.products);
    }
    this.modalService.open(content, { centered: true, size: size, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      // console.log(result)
    }, (reason) => {
      location.reload();
    });
  }

  addCategory():void{
    this.name = this.name.trim();
    this.image_url = this.image_url.trim();

    let category:Category = {name:this.name, image_url:this.image_url} as Category;
    this.categoryService.addCategory(category).subscribe((data)=>{
      console.log("Added");
      this.modalService.dismissAll('Done');
      location.reload();
    },
    (error)=>{
      console.log('Not good');
    })
  }

  deleteCategory():void{
    this.categoryService.deleteCategory(this.category).subscribe((data)=>{
      console.log('I deleted');
      this.modalService.dismissAll('Done');
      location.reload();
    },
    (error)=>{
      console.log('Something is wrong');
    })
  }

  deleteProduct():void{
    this.productService.deleteProduct(this.product).subscribe((data)=>{
      console.log('I deleted');
      this.modalService.dismissAll('Done');
      location.reload();
    },
    (error)=>{
      console.log('Something is wrong');
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

  addProduct():void{
    this.name = this.name.trim();
    let product:Product = {name:this.name, price: this.price, description: this.description, rating: this.rating, category_id: this.category.id} as Product;
    this.productService.addProduct(product).subscribe((data)=>{
      console.log('added');
      this.modalService.dismissAll('Done')
      location.reload();
    },
    (error)=>{
      console.log('Something is wrong');
    })
  }

  addImage():void{
    let image:Image = {product_id: this.product.id, url: this.image_url} as Image;
    this.imageService.addImage(image).subscribe((data)=>{
      console.log(data);
    },
    (error)=>{
      console.log(error);
    })
  }

  changeSelected(value:number):void{
    this.selected_id = value;
    this.category = this.categories.find(x=>x.id == this.selected_id) || this.category;
    this.product = this.products.find(x => x.id == this.selected_id) || this.product;
  }

}
