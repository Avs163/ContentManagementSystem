import { Component, OnInit } from '@angular/core';
import { TestService } from './test.service';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs';
import { CaseDataService } from './case-data.service';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { EmitType } from '@syncfusion/ej2-base';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import { PostsService } from './posts.service';
import {ActivatedRoute, ParamMap} from '@angular/router'
import { Post } from './post.model';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
// import {mimeType} from "./mime-type.validator";

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  filePreview: string;

  books: any;
  displayedColumns = ['isbn', 'title', 'author','mail','address'];
  cases: any;
  displayedColumns2 = ['Client', 'Court', 'Case Name','Case Type','Case Number','Case Year','Case Description'];
  casedataSource = new CaseDataSource(this.api2);
  dataSource = new BookDataSource(this.api);

  enteredTitle = "";
  enteredContent = "";
  post: Post;
  isLoading = false;
  form: FormGroup;
  private mode = "create";
  imagePreview: string;
  private postId: string;


  // Outputting posts
  posts : Post[] =[];
  isLoadingpdf = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];
  private postsSub: Subscription;

  panelOpenState = false;

  constructor(private api: TestService,private api2: CaseDataService,public postsService : PostsService,public route: ActivatedRoute,public postsServicepdf : PostsService) { }

  ngOnInit(): void {
    this.api.getBooks()
    .subscribe(res => {
      console.log(res);
      this.books = res;
    }, err => {
      console.log(err);
    });
    this.api2.getBooks()
    .subscribe(res => {
      console.log(res);
      this.cases = res;
    }, err => {
      console.log(err);
    });



    this.form = new FormGroup({
      'title': new FormControl(null,{
        validators: [Validators.required, Validators.minLength(3)]
      }),
      'content': new FormControl(null,{
        validators: [Validators.required]}),
      'image': new FormControl(null,{
          validators: [Validators.required],

        })
    });
    this.route.paramMap.subscribe((paramMap : ParamMap) => {
      if(paramMap.has('postId')){
        this.mode = 'edit';
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postsService.getPost(this.postId).subscribe(postData => {
        this.isLoading = false;
          this.post = {id: postData._id,
            title: postData.title,
            content: postData.content,
            imagePath: postData.imagePath};
          this.form.setValue({
            'title': this.post.title,
            'content': this.post.content,
            'image': this.post.imagePath
          });
        });
    }else{
        this.mode = 'create';
        this.postId = null;
      }
    })


    this.isLoadingpdf = true;
    this.postsServicepdf.getPosts(this.postsPerPage,this.currentPage);
    this.postsSub = this.postsServicepdf.getPostUpdateListener()
    .subscribe((postData: {posts: Post[], postCount: number}) => {
      this.isLoadingpdf = false;
      this.totalPosts = postData.postCount;
      this.posts = postData.posts;
    });



  }

  public drop: { [key: string]: Object; }[] = [
    { Name: 'Michael', Code: 'AU' },
    { Name: 'Kathryn', Code: 'BM' },
    { Name: 'Tamer', Code: 'CA' },
    { Name: 'Martin', Code: 'CM' },
    { Name: 'Davolio', Code: 'DK' },
    { Name: 'Nancy', Code: 'FR' },
    { Name: 'Fuller', Code: 'FI' },
    { Name: 'Leverling', Code: 'DE' },
    { Name: 'Peacock', Code: 'GL' },
    { Name: 'Margare', Code: 'HK' },
    { Name: 'Buchanan', Code: 'IN' },
    { Name: 'Janet', Code: 'IT' },
    { Name: 'Andrew', Code: 'JP' },
    { Name: 'Mexico', Code: 'MX' },
    { Name: 'Callahan', Code: 'NO' },
    { Name: 'Laura', Code: 'PL' },
    { Name: 'Dodsworth', Code: 'CH' },
    { Name: 'Anne', Code: 'GB' },
    { Name: 'Jack', Code: 'US' }
];
public path: Object = {
  saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
  removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
  // set chunk size for enable the chunk upload
  chunkSize: 102400
};
// maps the appropriate column to fields property
public dropfields: Object = { text: 'Name', value: 'Code' };
// set the placeholder to DropDownList input element
public text: string = 'Select a Client';
public text2: string = 'Choose Case';
// set the placeholder to filter search box input element
public filterPlaceholder: string = 'Search';
// filtering event handler to filter a Countr
public onFiltering: EmitType<FilteringEventArgs> = (e: FilteringEventArgs) => {
  let query: Query = new Query();
  //frame the query based on search string with filter type.
  query = (e.text !== '') ? query.where('Name', 'startswith', e.text, true) : query;
  //pass the filter data source, filter query to updateData method.
  e.updateData(this.drop, query);
};



onImagePicked(event: Event){
  const file = (event.target as HTMLInputElement).files[0];
  this.form.patchValue({image:file});
  this.form.get('image').updateValueAndValidity();
  const reader = new FileReader();
  reader.onload = () => {
      this.imagePreview = reader.result as string;
  };
  reader.readAsDataURL(file);
}

onSavePost(){
  if(this.form.invalid){
    return;
  }
  this.isLoading = true;
  if(this.mode === "create"){
    this.postsService.addPost(this.form.value.title,this.form.value.content,this.form.value.image);
  }
  else{
    this.postsService.updatePost(
      this.postId,
      this.form.value.title,
      this.form.value.content,
      this.form.value.image
    );
  }
  this.form.reset();
}



onChangedPage(pageData: PageEvent){
  this.isLoadingpdf = true;
  this.currentPage = pageData.pageIndex + 1;
  this.postsPerPage = pageData.pageSize;
  this.postsServicepdf.getPosts(this.postsPerPage,this.currentPage);
}

onDelete(postId: string){
  this.isLoadingpdf = true;
  this.postsServicepdf.deletePost(postId).subscribe(() => {
  this.postsServicepdf.getPosts(this.postsPerPage, this.currentPage)
  });
}

ngOnDestroy(){
  this.postsSub.unsubscribe();
}




}
export class BookDataSource extends DataSource<any> {
  constructor(private api: TestService) {
    super()
  }

  connect() {
    return this.api.getBooks();
  }

  disconnect() {

  }
}

export class CaseDataSource extends DataSource<any> {
  constructor(private api2: CaseDataService) {
    super()
  }

  connect() {
    return this.api2.getBooks();
  }

  disconnect() {

  }
}
