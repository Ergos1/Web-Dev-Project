import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbConfig} from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/interfaces/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpen:boolean = false;
  news!:News[];

  constructor(ngbConfig: NgbConfig, private newsService:NewsService, private router: Router) {
    ngbConfig.animation = true;
  }

  ngOnInit(): void {
    this.getNews();
  }

  getNews():void{
    this.newsService.getNews().subscribe((data)=>{
      this.news = data;
    });
  }

  goToPage(url:string):void{
    this.router.navigate([url]);
  }


}
