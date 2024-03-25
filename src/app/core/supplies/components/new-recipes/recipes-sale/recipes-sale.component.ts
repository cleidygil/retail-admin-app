import { Component , inject} from '@angular/core';
import { SuppliesService } from '../../../services/supplies.service';

@Component({
  selector: 'app-recipes-sale',
  templateUrl: './recipes-sale.component.html',
  styleUrls: ['./recipes-sale.component.css']
})
export class RecipesSaleComponent {
  private services = inject(SuppliesService)
  categories: any[] = []
  
}
