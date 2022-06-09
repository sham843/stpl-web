import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-w-header',
  templateUrl: './w-header.component.html',
  styleUrls: ['./w-header.component.scss']
})
export class WHeaderComponent implements OnInit {
  @HostListener('window:scroll', ['$event'])

  requestDemoForm!:FormGroup | any;
  submitted = false;
  @ViewChild('requestDemoModel') requestDemoModel: any;

  @ViewChild('AutoPopupModal') AutoPopupModal: any;
 
    constructor(
      public commonService:CommonService,
      public apiService: ApiService,
      private toastrService: ToastrService,
      private errorSerivce: ErrorsService,
      private fb: FormBuilder,
    ) { }
  
  ngOnInit(): void {
    this.requestForm();
    this.autoPopModal();
  }

    //..........................................  RequestDemo Form code End Here ..........................//

    get f() { return this.requestDemoForm.controls }

    requestForm() { 
      this.requestDemoForm = this.fb.group({
        fullName: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
        emailId: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        companyName: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
        phoneNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        requestDetails: ['',[Validators.required,Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
      })
    }
  
    requestSubmitForm() {
      let formData = this.requestDemoForm.value;
      this.submitted = true;
      if (this.requestDemoForm.invalid) {
        return;
      }else {
        let obj = {
          "createdBy": 0,
          "modifiedBy": 0,
          "createdDate": new Date(),
          "modifiedDate": new Date(),
          "isDeleted": false,
          "id": 0,
          "fullName": formData.fullName,
          "emailId": formData.emailId,
          "companyName": formData.companyName,
          "phoneNo": formData.phoneNo,
          "requestDetails": formData.requestDetails,
        }
  
        this.apiService.setHttp('POST', 'RequestDemo', false, JSON.stringify(obj), false, 'stplUrl');
        this.apiService.getHttp().subscribe((res: any) => {
          if (res.statusCode == "200") {
            this.toastrService.success(res.statusMessage);
            this.requestDemoModel.nativeElement.click();
           this.clearForm();
          } else {
            this.toastrService.error(res.statusMessage);
          }
        }, (error: any) => {
          this.errorSerivce.handelError(error.status);
        });
      }
    } 

    clearForm() {
      this.submitted = false;
      this.requestForm();
    }

     //..........................................  RequestDemo Form code End Here ..........................//

     onWindowScroll() {
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-scroll');
      } else {
        element.classList.remove('navbar-scroll');
      }  
    }

    autoPopModal(){
      setTimeout(() => {
        this.AutoPopupModal.nativeElement.click();
      }, 2000);
    }

}
