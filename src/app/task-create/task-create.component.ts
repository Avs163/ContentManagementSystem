import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestService } from '../test/test.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  testForm: FormGroup;
  name:string='';
  type:string='';
  mobile:string='';
  mail:string='';
  address:string='';
  constructor (private router: Router, private api: TestService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.testForm = this.formBuilder.group({
      'name' : [null, Validators.required],
      'type' : [null, Validators.required],
      'mobile' : [null, Validators.required],
      'mail' : [null, Validators.required],
      'address' : [null, Validators.required],
    });
  }
  onFormSubmit(form:NgForm) {
    this.api.postBook(form)
      .subscribe(res => {
          let id = res['_id'];
          this.router.navigate(['/', id]);
        }, (err) => {
          console.log(err);
        });
  }

}
