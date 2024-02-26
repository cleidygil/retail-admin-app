import { Component, HostListener, inject } from '@angular/core';
import { GlobalService } from 'src/app/global/services/global.service';
import { AuthServices } from '../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  private global = inject(GlobalService)
  private auth = inject(AuthServices)

  @HostListener('window:resize', ['$event'])
  screenWidth: number = window.innerWidth
  valid: boolean = this.screenWidth < 949 ? false : false;
  classMain: string = this.screenWidth < 949 ? 'active' : '';
  classToggle: string = ''
  user:any = ''
  constructor() {
    this.user = this.global.User()
  }
  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
  sidebarOverlay() {
    this.valid = !this.valid;
    this.classMain = this.valid ? 'active' : '';
    this.classToggle = this.valid ? 'hidden' : '';
  }
  logout() {
    this.auth.logout()
  }
}
