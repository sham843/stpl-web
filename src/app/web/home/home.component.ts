import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  applaySubscribeForm!: FormGroup | any;
  submitted = false;
  servicesArray: any;

  public imagesUrl: any;
  public logoUrl: any;

  constructor(
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subScribeForm();
    this.getPageMaster();
  }


  // Tech logo Slider........

  imageObject: Array<object> = [
    {
      image: 'assets/images/tech/Flutter.png',
      thumbImage: 'assets/images/tech/Flutter.png',
      // title: 'APP DEVELOPMENT'
    },
    {
      image: 'assets/images/tech/android.png',
      thumbImage: 'assets/images/tech/android.png',
      // title: 'APP DEVELOPMENT'
    },
    {
      image: 'assets/images/tech/ios.png',
      thumbImage: 'assets/images/tech/ios.png',
      // title: 'APP DEVELOPMENT' 
    },
    {
      image: 'assets/images/tech/mongoDB.png',
      thumbImage: 'assets/images/tech/mongoDB.png',
      // title: 'BACKEND DEVELOPMENT' 
    },
    {
      image: 'assets/images/tech/javascript.png',
      thumbImage: 'assets/images/tech/javascript.png',
      // title: 'JS & FRAMEWORKS' 
    },
    {
      image: 'assets/images/tech/azure.png',
      thumbImage: 'assets/images/tech/azure.png',
      // title: 'CLOUD PLATFORM' 
    },
    {
      image: 'assets/images/tech/AWS.png',
      thumbImage: 'assets/images/tech/AWS.png',
      // title: 'CLOUD PLATFORM' 
    },
    {
      image: 'assets/images/tech/typescript.png',
      thumbImage: 'assets/images/tech/typescript.png',
      // title: 'TS(ANGULAR)'
    },
    {
      image: 'assets/images/tech/css3.png',
      thumbImage: 'assets/images/tech/css3.png',
      // title: 'DESIGNING' 
    },
    {
      image: 'assets/images/tech/5-HTML.png',
      thumbImage: 'assets/images/tech/5-HTML.png',
      // title: 'DESIGNING' 
    },
    {
      image: 'assets/images/tech/angular-material.png',
      thumbImage: 'assets/images/tech/angular-material.png',
      // title: 'FRONTEND DEVELOPMENT' 
    },
    {
      image: 'assets/images/tech/Net.png',
      thumbImage: 'assets/images/tech/Net.png',
      // title: 'BACKEND DEVELOPMENT' 
    }
  ];
  // tech logo slider ends..........

  // Client tale Slider     
  imageObject2: Array<object> = [
    {
      image: 'assets/images/clientele/consult-buddy.png',
      thumbImage: 'assets/images/clientele/consult-buddy.png'
    },
    {
      image: 'assets/images/clientele/Govind-Logo.png',
      thumbImage: 'assets/images/clientele/Govind-Logo.png',
    },
    {
      image: 'assets/images/clientele/India_Army.png',
      thumbImage: 'assets/images/clientele/India_Army.png',
    },
    {
      image: 'assets/images/clientele/indian-railway-logo.png',
      thumbImage: 'assets/images/clientele/indian-railway-logo.png',
    },
    {
      image: 'assets/images/clientele/Railtel_Logo.png',
      thumbImage: 'assets/images/clientele/Railtel_Logo.png',
    },
    {
      image: 'assets/images/clientele/Railway_Protection_Force_Logo.png',
      thumbImage: 'assets/images/clientele/Railway_Protection_Force_Logo.png',
    },
    {
      image: 'assets/images/clientele/Seal_of_Maharashtra.png',
      thumbImage: 'assets/images/clientele/Seal_of_Maharashtra.png',
    },
    {
      image: 'assets/images/clientele/trti-logo.png',
      thumbImage: 'assets/images/clientele/trti-logo.png',
    }
  ];





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

  //..........................................  subScribeForm code Start Here ..........................//
  get f() { return this.applaySubscribeForm.controls }

  subScribeForm() {
    this.applaySubscribeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      lastName: ['', [Validators.required, Validators.maxLength(50), Validators.pattern('^[^\\s0-9\\[\\[`&._@#%*!+,|"\-\'\/\\]\\]{}][a-zA-Z]+$')]],
      emailId: ['', [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]],
    })
  }

  subScribeSubmitForm() {
    let formData = this.applaySubscribeForm.value;
    this.submitted = true;
    if (this.applaySubscribeForm.invalid) {
      return;
    } else {
      let obj = {
        "createdBy": 1,
        "modifiedBy": 1,
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
          this.subScribeForm();
          this.submitted = false;
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  //..........................................  subScribeForm code End Here ..........................//

}
