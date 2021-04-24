import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../app/services/sidebar.service';
import { AlertService } from './services/alert.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Alert } from 'src/interfaces/alert';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  isOpen!: boolean;
  alert!: Alert;

  constructor(private sidebarService: SidebarService, private alertService: AlertService,
    private config: NgbModalConfig, private modalService: NgbModal){
    config.backdrop = 'static';
    config.keyboard = false;
    config.animation = true;
  }

  ngOnInit(){
    this.getIsOpen();
  }

  getIsOpen(): void{
    this.sidebarService.isOpen.subscribe(() => {
      this.isOpen = this.sidebarService.getIsOpen();
    });
  }
  getAlert(): void{
    this.alertService.getAlert().subscribe((data) => {
      this.alert = data;
      this.modalService.open(alert);
    });
  }

  showMe(content: any): void {
    console.log(content);
  }

}
