import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { mergeMap, map } from 'rxjs/operators';
import { CountryService } from '../country.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private country: CountryService, private router: Router) { }


  ngOnInit() {
    this.getList();
  }

  List: any = [];
  getList() {
    this.country.getAll().subscribe((res) => {
      this.List = res;
      console.log('countries', res);
    })
  }

  id: any
  editCountry(country) {
    console.log('country', country._id);
    this.id = country._id
    this.router.navigate(['/edit/' + this.id]);
  }

  deleteCountries(c) {
    this.country.delete(c).subscribe((res) => {
      console.log('deleted', res)
      this.getList();
    })
  }

  create() {
    this.router.navigate(['/add']);
  }

}
