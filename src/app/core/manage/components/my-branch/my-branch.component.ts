import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-my-branch',
  templateUrl: './my-branch.component.html',
  styleUrls: ['./my-branch.component.css']
})
export class MyBranchComponent implements OnInit {
  private services = inject(ManageService)
  ruta: string = ''
  newUrl: string = ''
  private activateRou = inject(ActivatedRoute);
  private router = inject(Router)

  sub!: Subscription
  id: number | null = null
  constructor() {
    // this.sub = this.activateRou.params.subscribe(data => {
    //   this.ruta = data['store']
    //   console.log(this.ruta)
    // })
    // this.sub = this.activateRou.children[0].url.subscribe(data => {
    //   this.ruta = data[0]?.path || ''
    // })
  }

  ngOnInit() {
    this.ruta = this.services.store.value
  }

}
