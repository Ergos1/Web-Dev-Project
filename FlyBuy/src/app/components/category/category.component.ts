import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { Category } from 'src/interfaces/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories!: Category[];

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    })
  }

}
