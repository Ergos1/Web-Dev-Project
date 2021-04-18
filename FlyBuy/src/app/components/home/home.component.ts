import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NgbConfig, NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { NewsService } from 'src/app/services/news.service';
import { News } from 'src/interfaces/news';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpen:boolean = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  news!:News[];

  constructor(ngbConfig: NgbConfig, ngbAlertConfig: NgbAlertConfig, private newsService:NewsService, private router: Router) {
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
