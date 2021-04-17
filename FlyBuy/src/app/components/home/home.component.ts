import { Component, OnInit } from '@angular/core';
import {NgbConfig, NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isOpen:boolean = false;
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);

  constructor(ngbConfig: NgbConfig, ngbAlertConfig: NgbAlertConfig) {
    ngbConfig.animation = false;
  }

  ngOnInit(): void {
  }

}
