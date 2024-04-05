import { Component, inject } from '@angular/core';
import { EntryAndExitService } from './services/entry-and-exit.service';
import { DialogDetailEntryExitComponent } from './components/dialog-detail-entry-exit/dialog-detail-entry-exit.component';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from 'src/app/global/services/global.service';
import { AllStore, MyStoreParams } from '../store/interfaces/store';
import { StoreService } from '../store/services/store.service';
import { EntryAndExit } from './interfaces/entry-and-exit';
import { FormGroup, FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { DepotService } from '../depot/services/depot.service';

@Component({
  selector: 'app-entry-and-exit',
  templateUrl: './entry-and-exit.component.html',
  styleUrls: ['./entry-and-exit.component.css']
})
export class EntryAndExitComponent {
  
}
