import { Component, inject } from '@angular/core';
import { Ambient, Management } from '../../interface/manege.interface';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingService } from 'src/app/global/services/loading.service';
import { ManageService } from '../../services/manege.service';

@Component({
  selector: 'app-manage-environments',
  templateUrl: './manage-environments.component.html',
  styleUrls: ['./manage-environments.component.css']
})
export class ManageEnvironmentsComponent {
 
}
