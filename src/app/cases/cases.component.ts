import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { Component, OnInit, TemplateRef,ViewChild, ViewEncapsulation } from '@angular/core';
import { orderData } from './data';
import { FilterService, GridComponent,IFilter,ToolbarService,VirtualScrollService  } from '@syncfusion/ej2-angular-grids';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { CheckBox  } from '@syncfusion/ej2-buttons';
import { getData } from './data';
import { gettingData } from './casedata';
import { EditService, PageService } from '@syncfusion/ej2-angular-grids';
import {EditSettingsModel, ToolbarItems} from '@syncfusion/ej2-angular-grids';
import { FilteringEventArgs } from '@syncfusion/ej2-dropdowns';
import { EmitType } from '@syncfusion/ej2-base';
import { Query } from '@syncfusion/ej2-data';
import { ProgressButton, SpinSettingsModel, AnimationSettingsModel } from '@syncfusion/ej2-angular-splitbuttons';
import { MatTabGroup } from '@angular/material/tabs';
import{NgForm} from '@angular/forms';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import {EmployeeService} from './employee.service';
import { Employee } from './employee.model';
import { CKEditor4 } from 'ckeditor4-angular/ckeditor';

declare var M: any;
// none
@Component({
    selector: 'app-cases',
    templateUrl: 'cases.component.html',
    styleUrls: ['cases.component.css'],
    providers: [EmployeeService, FilterService,VirtualScrollService,ToolbarService, EditService, PageService,],
    encapsulation: ViewEncapsulation.None
})
export class CasesComponent implements OnInit {

  constructor(public employeeService: EmployeeService) {}

  public editOptions: EditSettingsModel =  { allowEditing: true, allowAdding: true, allowDeleting: true,mode: 'Dialog' };
    public toolbarOptions: ToolbarItems[] = [];
    public dReady: boolean = false;
    public dtTime: boolean = false;
    public isDataBound: boolean = false;
    public isDataChanged: boolean = true;
    public intervalFun: any;
    public clrIntervalFun: any;
    public clrIntervalFun1: any;
    public clrIntervalFun2: any;
    public dropSlectedIndex: number = null;
    public stTime: any;
    public data: Object;
    public casedata: Object;
    public filter: Object;
    public filterSettings: Object;
    public selectionSettings: Object;
    public height: string = '240px';
    @ViewChild('sample')
    public listObj: DropDownListComponent;
    @ViewChild('overviewgrid')
    public gridInstance : GridComponent ;
    @ViewChild('casesgrid')
    public gridCase : GridComponent ;
    public ddlData: Object[] = [
        { text: '1,000 Rows and 11 Columns', value: '1000' },
        { text: '10,000 Rows and 11 Columns', value: '10000' },
        { text: '1,00,000 Rows and 11 Columns', value: '100000' }
    ];
    public fields: Object = { text: 'text', value: 'value' };
    public item: number[] = [1, 2, 3, 4, 5];
    @ViewChild('tabs') tabGroup: MatTabGroup;
    public ngOnInit(): void {
        this.data = getData(1000);
        this.casedata = gettingData(1000);
        this.filterSettings = { type: "Menu" };
        this.filter = { type: "CheckBox" };
       this.stTime = performance.now();
        this.selectionSettings = {persistSelection: true, type: "Multiple", checkboxOnly: true };
        this.tabGroup.selectedIndex = 0;
        // this.refreshEmployeeList();
    }
    public add(e: any): void {
      this.gridInstance.editModule.addRecord();
  }
  public addcase(e: any): void {
    this.gridCase.editModule.addRecord();
}
    ngAfterViewInit(args: any): void {
        this.gridInstance.on('data-ready', function () {
            this.dReady = true;
        });
        document.getElementById('overviewgrid').addEventListener('DOMSubtreeModified', () => {
            if (this.stTime && this.isDataChanged) {
                let msgEle = document.getElementById('msg');
                let val: any = (performance.now() - this.stTime).toFixed(0);
                this.stTime = null;
                this.dtTime = false;
                this.isDataChanged = false;
                msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
                msgEle.classList.remove('e-hide')
           }
            })
        // Cases
        this.gridCase.on('data-ready', function () {
          this.dReady = true;
      });
      document.getElementById('casesgrid').addEventListener('DOMSubtreeModified', () => {
          if (this.stTime && this.isDataChanged) {
              let msgEle = document.getElementById('msg');
              let val: any = (performance.now() - this.stTime).toFixed(0);
              this.stTime = null;
              this.dtTime = false;
              this.isDataChanged = false;
              msgEle.innerHTML = 'Load Time: ' + "<b>" + val + "</b>" + '<b>ms</b>';
              msgEle.classList.remove('e-hide')
         }
          })

    }
    valueChange(args:any): void {
		this.listObj.hidePopup();
        this.gridInstance.showSpinner();
        this.gridCase.showSpinner();
        this.dropSlectedIndex = null;
         let index: number = this.listObj.value as number;
         clearTimeout(this.clrIntervalFun2);
         this.clrIntervalFun2 = setTimeout(() => {
             this.isDataChanged = true;
             this.stTime = null;
             let contentElement: Element = this.gridInstance.contentModule.getPanel().firstChild as Element;
             contentElement.scrollLeft = 0;
             contentElement.scrollTop = 0;
             this.gridInstance.pageSettings.currentPage = 1;
             this.stTime = performance.now();
             this.gridInstance.dataSource = getData(index);
             this.gridInstance.hideSpinner();
         }, 100);
         this.clrIntervalFun2 = setTimeout(() => {
          this.isDataChanged = true;
          this.stTime = null;
          let contentElement: Element = this.gridCase.contentModule.getPanel().firstChild as Element;
          contentElement.scrollLeft = 0;
          contentElement.scrollTop = 0;
          this.gridCase.pageSettings.currentPage = 1;
          this.stTime = performance.now();
          this.gridCase.dataSource = gettingData(index);
          this.gridCase.hideSpinner();
      }, 100);
    }
    onDataBound(args:any):void {
        clearTimeout(this.clrIntervalFun);
        clearInterval(this.intervalFun);
        this.dtTime = true;
    }

    // This is for button animation
    @ViewChild('contractBtn')
    public contractBtn: ProgressButton;


    public spinRight: SpinSettingsModel = { position: 'Right' };
    public spinTop: SpinSettingsModel = { position: 'Top' };
    public spinBottom: SpinSettingsModel = { position: 'Bottom' };
    public spinCenter: SpinSettingsModel = { position: 'Center' };
    public zoomOut: AnimationSettingsModel = { effect: 'ZoomOut' };
    public slideLeft: AnimationSettingsModel = { effect: 'SlideLeft' };
    public slideRight: AnimationSettingsModel = { effect: 'SlideRight' };
    public zoomIn: AnimationSettingsModel = { effect: 'ZoomIn' };

    public contractBegin() {
        this.contractBtn.element.classList.add('e-round');
    }

    public contractEnd() {
        this.contractBtn.element.classList.remove('e-round');
    }

    public path: Object = {
      saveUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Save',
      removeUrl: 'https://ej2.syncfusion.com/services/api/uploadbox/Remove',
      // set chunk size for enable the chunk upload
      chunkSize: 102400
    };

    //define the filtering data
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

public box : string = 'Box';
selectedIndex: number = 0;
 nextStep() {
  this.selectedIndex = this.selectedIndex + 1;
      console.log(this.selectedIndex);
  }
previousStep() {
    this.selectedIndex = this.selectedIndex - 1;
  console.log(this.selectedIndex);
}

public onChange( event: CKEditor4.EventInfo ) {
  console.log( event.editor.getData() );
}

// resetForm(form?: NgForm){
//   if(form)
//   form.reset();
//   this.employeeService.selectedEmployee = {
//     _id: "",
//     name: "",
//     type: "",
//     mobile: "",
//     mail: "",
//     address: ""
//   }
// }
// onSubmit(form: NgForm){
//   this.employeeService.postEmployee(form.value).subscribe((res) => {
//     this.resetForm(form);
//     console.log("Yay");
//   });
// }

// resetForm(form?: NgForm) {
//   if (form)
//     form.reset();
//   this.employeeService.selectedEmployee = {
//     _id: "",
//     name: "",
//     type: "",
//     mobile: "",
//     mail: "",
//     address: "",
//   }
// }

// onSubmit(form: NgForm) {
//   if (form.value._id == "") {
//     this.employeeService.postEmployee(form.value).subscribe((res) => {
//       this.resetForm(form);
//       this.refreshEmployeeList();
//       M.toast({ html: 'Saved successfully', classes: 'rounded' });
//     });
//   }
//   else {
//     this.employeeService.putEmployee(form.value).subscribe((res) => {
//       this.resetForm(form);
//       this.refreshEmployeeList();
//       M.toast({ html: 'Updated successfully', classes: 'rounded' });
//     });
//   }
// }

// refreshEmployeeList() {
//   this.employeeService.getEmployeeList().subscribe((res) => {
//     this.employeeService.employees = res as Employee[];
//   });
// }

// onEdit(emp: Employee) {
//   this.employeeService.selectedEmployee = emp;
// }

// onDelete(_id: string, form: NgForm) {
//   if (confirm('Are you sure to delete this record ?') == true) {
//     this.employeeService.deleteEmployee(_id).subscribe((res) => {
//       this.refreshEmployeeList();
//       this.resetForm(form);
//       M.toast({ html: 'Deleted successfully', classes: 'rounded' });
//     });
//   }
// }

}
