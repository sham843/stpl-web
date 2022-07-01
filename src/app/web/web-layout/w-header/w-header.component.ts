import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-w-header',
  templateUrl: './w-header.component.html',
  styleUrls: ['./w-header.component.scss']
})
export class WHeaderComponent implements OnInit {  
  openoverlay:any;
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
      private router: Router
    ) { }
  
  ngOnInit(): void {
    this.requestForm();
    this.autoPopModal();
  }
  openNav() {
    this.openoverlay = "100%"
  }
  closeNav() {
    this.openoverlay = "0%"
  }
    //..........................................  RequestDemo Form code Start Here ..........................//

    get f() { return this.requestDemoForm.controls }

    requestForm() { 
      this.requestDemoForm = this.fb.group({
        fullName: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
        emailId: ['',[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
        // companyName: ['', [Validators.required,Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
        companyName: [''],
        phoneNo: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
        requestDetails: ['',[Validators.required,Validators.pattern('^[^[ ]+|[ ][gm]+$')]],
      })
    }
  
    requestSubmitForm(flag:any) {
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
          "isRequest": flag
        }
  
        this.apiService.setHttp('POST', 'RequestDemo', false, JSON.stringify(obj), false, 'stplUrl');
        this.apiService.getHttp().subscribe((res: any) => {
          if (res.statusCode == "200") {
            this.toastrService.success(res.statusMessage);
            if(flag == 1){
              this.requestDemoModel.nativeElement.click();
            }else{
              this.AutoPopupModal.nativeElement.click();
            }
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

     @HostListener('window:scroll', ['$event'])
     onWindowScroll() {
      let element = document.querySelector('.navbar') as HTMLElement;
      if (window.pageYOffset > element.clientHeight) {
        element.classList.add('navbar-scroll');
      } else {
        element.classList.remove('navbar-scroll');
      }  
    }

    // autoPopModal(){
    //   setTimeout(() => {
    //     this.router.url == '/home' ? this.AutoPopupModal.nativeElement.click() : '';
    //   }, 50000);
    // }

    autoPopModal(){
      setTimeout(() => {
        this.router.url == '/home' ? this.AutoPopupModal.nativeElement.click() : '';
      }, 3000);
    }

}
