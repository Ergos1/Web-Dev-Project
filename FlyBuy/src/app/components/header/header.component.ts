import { Component, OnInit } from '@angular/core';
import {NgbConfig, NgbAlertConfig} from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  activeId!:number;

  constructor(ngbConfig: NgbConfig, ngbAlertConfig: NgbAlertConfig, private router: Router) {
    ngbConfig.animation = false;
  }

  ngOnInit(): void {
    this.activeId = 1;
  }

  

}
