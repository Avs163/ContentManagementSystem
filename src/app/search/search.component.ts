import {Component} from '@angular/core'
interface Food {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent{
  value = '';
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Client'},
    {value: 'pizza-1', viewValue: 'Cases'},
    {value: 'tacos-2', viewValue: 'Law'},
    {value: 'tacos-3', viewValue: 'KMS'}
  ];
}
