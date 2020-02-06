import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { CountryService } from '../country.service';
@Component({
  selector: 'app-save',
  templateUrl: './save.component.html',
  styleUrls: ['./save.component.css']
})
export class SaveComponent implements OnInit {

  constructor(private country: CountryService,
    private router: Router, private route: ActivatedRoute) { }
  list: any;
  id: any;
  obj: any =
    {
      id: '',
      name: '',
      price: ''
    }

  ngOnInit() {
    console.log('params', this.route.params['value'].id);
    this.id = this.route.params['value'].id
    if (this.id) {
      this.getById(this.id)
    }
  }


  getById(id) {
    console.log('edit req', id)
    this.country.edit(this.id).subscribe((res) => {
      console.log('edit res', res)
      this.obj.id = res['_id'],
        this.obj.name = res['unit_name'],
        this.obj.price = res['unit_price']
    })
  }


  submit(post) {
    if (this.id) {
      var postObj =
      {
        "_id": post.id,
        "unit_name": post.name,
        "unit_price": post.price
      }
      delete postObj['_id'];
      console.log('update req', postObj)
      this.country.update(this.id, postObj).subscribe((res) => {
        console.log('update res', res)
      },(error)=>{
        console.log('err',error)
      })
    }
    else {
      var postReqObj =
      {
        "unit_name": post.name,
        "unit_price": post.price
      }
      console.log('add req', post)
      this.country.create(postReqObj).subscribe((res) => {
        console.log('add res', res);
        
      },(error)=>{
        console.log('err',error)
      });
    }
    this.router.navigate(['/list']);
  }

}