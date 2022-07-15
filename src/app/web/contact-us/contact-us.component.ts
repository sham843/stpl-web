import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  contactUsForm!: FormGroup | any;
  submitted = false;

  constructor(
    public commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.myContactUsForm();
    window.scroll(0, 700);

  }

  get f() { return this.contactUsForm.controls }

  myContactUsForm() {
    this.contactUsForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      contactNo: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], 
      subject: ['', [Validators.required, Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+"\'\/\\]\\]{}][a-zA-Z.\\s]+$')]],
      message: [''],
    })
  }

  submitContactUsForm() {
    let formData = this.contactUsForm.value;
    this.submitted = true;
    if (this.contactUsForm.invalid) {
      return;
    } else {
      let obj = {
        "createdBy": 1,
        "modifiedBy": 1,
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": 0,
        "fullName": formData.fullName,
        "emailId": formData.emailId,
        "contactNo": formData.contactNo,
        "subject": formData.subject,
        "message": formData.message
      }

      this.apiService.setHttp('POST', 'ContactUs', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.toastrService.success(res.statusMessage);
          this.myContactUsForm();
          this.submitted = false;
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

}
