import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FormBuilder, Validators } from '@angular/forms';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  applayUserForm!:FormGroup | any;
  submitted = false;
  servicesArray:any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private localStorage:LocalstorageService
  ) { }

  ngOnInit(): void {
    this.defaultForm();
    this.getPageMaster();
  }

  get f() { return this.applayUserForm.controls }

  defaultForm() {
    this.applayUserForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      emailId: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  submitForm() {
    let formData = this.applayUserForm.value;
    this.submitted = true;
    if (this.applayUserForm.invalid) {
      return;
    }else {
      let obj =  {
        "createdBy": this.localStorage.userId(),
        "modifiedBy": this.localStorage.userId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": 0,
        "firstName": formData.firstName,
        "lastName": formData.lastName,
        "emailId": formData.emailId,
      }

      this.apiService.setHttp('POST', 'dashboard', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.toastrService.success(res.statusMessage);
          this.defaultForm();
          this.submitted = false;
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  } 

  getPageMaster() {
    this.apiService.setHttp('get', "dashboard/GetServices", false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.servicesArray = res.responseData;
        } else {
          this.servicesArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

}
