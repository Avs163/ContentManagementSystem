import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CaseDataService } from '../test/case-data.service';
import { FormControl, FormGroupDirective, FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';

@Component({
  selector: 'app-case-create',
  templateUrl: './case-create.component.html',
  styleUrls: ['./case-create.component.css']
})
export class CaseCreateComponent implements OnInit {

  caseForm: FormGroup;
  client:string='';
  court:string='';
  case_name:string='';
  case_type:string='';
  case_number:string='';
  case_year:string='';
  case_description:string='';
  constructor(private router: Router, private api: CaseDataService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.caseForm = this.formBuilder.group({
      'client' : [null, Validators.required],
      'court' : [null, Validators.required],
      'case_name' : [null, Validators.required],
      'case_type' : [null, Validators.required],
      'case_number' : [null, Validators.required],
      'case_year' : [null, Validators.required],
      'case_description' : [null, Validators.required]
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
