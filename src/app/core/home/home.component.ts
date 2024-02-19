import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  @HostListener('window:resize', ['$event'])
  screenWidth:number =window.innerWidth
  valid: boolean = this.screenWidth < 949 ? false: false;
  classMain: string = this.screenWidth < 949 ? 'active': '';
  classToggle: string = ''

  toggleFullscreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }
  sidebarOverlay() {
    this.valid = !this.valid;
    this.classMain = this.valid? 'active':'';
    this.classToggle = this.valid? 'hidden': '';
  }
}
