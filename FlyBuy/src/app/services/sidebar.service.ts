import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService implements OnInit {

  isOpen:BehaviorSubject<boolean>  = new BehaviorSubject<boolean>(true);;

  constructor() { }

  ngOnInit():void{
    // this.isOpen = new BehaviorSubject<boolean>(true);
  }

  getIsOpen():boolean{
    return this.isOpen.getValue();
  }
  setIsOpen(value:boolean):void{
    this.isOpen.next(value);
  }


}
