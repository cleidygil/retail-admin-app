import { Component, EventEmitter, HostListener, Input, Output, inject } from '@angular/core';
import { GlobalService } from 'src/app/global/services/global.service';
import { Menu } from '../../auth/interfaces/LoginInterface';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {
  private global = inject(GlobalService)
  @HostListener('window:resize', ['$event'])
  screenWidth: number = window.innerWidth
  @Input()
  valid!: boolean
  @Output() classMain = new EventEmitter<string>();
  classToggle: boolean = this.screenWidth < 949 ? false : true;

  get menu():Menu[]{
    const {menus} = this.global.User()
    return menus || []
  }
}
