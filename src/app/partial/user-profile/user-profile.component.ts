import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/core/services/api.service';
import { CommonService } from 'src/app/core/services/common.service';
import { ErrorsService } from 'src/app/core/services/errors.service';
import { FileUploadService } from 'src/app/core/services/file-upload.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  userDetailsArray: any;
  userProfileForm!:FormGroup | any;
  roleArray = [ {'id': 0 , 'name': 'Admin'},{'id': 1 , 'name': 'HR'}];
  submitted = false;
  disableDiv: boolean = true;

  changePassForm!:FormGroup | any;
  submittedCp = false;
  oldPassword: boolean = true;
  newPassword: boolean = true;
  confirmPassword: boolean = true;

  @ViewChild('fileInput') fileInput!: ElementRef;
  selectedFile: any;
  getImgExt: any;
  imgName: any;
  file: any;
  ImgUrl: any;

  constructor(
    private localStorage: LocalstorageService,
    private commonService: CommonService,
    public apiService: ApiService,
    private toastrService: ToastrService,
    private errorSerivce: ErrorsService,
    private fb: FormBuilder,
    private spinner:NgxSpinnerService,
    private fileUploadService:FileUploadService,
  ) { }

  ngOnInit(): void {
    this.myProfileForm();
    this.getUserDetails();
    this.changePasswordForm();
  }

  get f() { return this.userProfileForm.controls }

  myProfileForm() {
    this.userProfileForm = this.fb.group({
      UserId: [this.localStorage.userId()],
      firstName: ['',[Validators.required ,Validators.pattern(/^\S*$/)]],
      lastName: ['', [Validators.required ,Validators.pattern(/^\S*$/)]],
      email: ['',[Validators.required,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      mobileNo: ['',[Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      userName: ['',[Validators.required,Validators.pattern('^[a-zA-Z0-9](_(?!(\.|_))|\.(?!(_|\.))|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]$')]],
      designation: ['',Validators.required],
      profilePath: ['']
    })
  }

  getUserDetails() {
    this.apiService.setHttp('get', "userdetails/GetById?" + 'Id=' + this.localStorage.userId(), false, false, false, 'stplUrl');
    this.apiService.getHttp().subscribe({
      next: (res: any) => {
        if (res.statusCode === "200") {
          this.userDetailsArray = res.responseData;
          this.patchProfileData(this.userDetailsArray);
          let imagePath = res.responseData?.profilePath;
          imagePath ? (this.ImgUrl = imagePath) : (this.ImgUrl ='assets/images/user.png');
        } else {
          this.userDetailsArray = [];
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      },
      error: ((error: any) => { this.errorSerivce.handelError(error.status) })
    });
  }

  patchProfileData(resData:any){
    // for img upload start
    let loginObj: any = localStorage.getItem('user');
    loginObj = JSON.parse(loginObj);
    loginObj.profilePath = resData?.profilePath;
    localStorage.setItem('user', JSON.stringify(loginObj));
    this.localStorage.pathchange(this.ImgUrl);
    // localStorage.setItem('imgUrl', this.ImgUrl);
    // for img upload End
    let fullName = resData.fullName.split(' ');
    this.userProfileForm.patchValue({
      UserId: this.localStorage.userId(),
      firstName: fullName[0],
      lastName: fullName[1],
      email: resData.email,
      mobileNo: resData.mobileNo,
      userName: resData.userName,
      designation: resData.designation,
    })
  }

  clearProfileForm(){
   this.patchProfileData(this.userDetailsArray);
   let imagePath = this.userDetailsArray?.profilePath;
   imagePath ? (this.ImgUrl = imagePath) : (this.ImgUrl ='assets/images/user.png');
  }

  updateProfileData() {
    let formData = this.userProfileForm.value;
    this.submitted = true;
    if (this.userProfileForm.invalid) {
      return;
    } else {
      let fullName = formData.firstName.trim().concat(" ", formData.lastName.trim());
      let obj = {
        "createdBy": this.localStorage.userId(),
        "modifiedBy": this.localStorage.userId(),
        "createdDate": new Date(),
        "modifiedDate": new Date(),
        "isDeleted": true,
        "id": formData.UserId,
        "userTypeId": 0,
        "fullName": fullName,
        "designation": formData.designation,
        "mobileNo": formData.mobileNo,
        "userName": formData.userName,
        "email": formData.email,
        "profilePath": formData.profilePath,
        "password": formData.password
      }

      this.apiService.setHttp('PUT', 'userdetails', false, JSON.stringify(obj), false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
           //set username in session storage Start
           this.localStorage.sendFullName(fullName);
           let loginObj: any = localStorage.getItem('user');
           loginObj = JSON.parse(loginObj);
           loginObj.fullName = fullName;
           localStorage.setItem('user', JSON.stringify(loginObj));
           //set username in session storage End
          this.toastrService.success(res.statusMessage);
          this.getUserDetails();
          this.submitted = false;
          this.disableDiv = true;
        } else {
          this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  //.........................................  Change Password Page Code Here ..................................//

  changePasswordForm() {
    this.changePassForm = this.fb.group({
      oldPassword: ['', Validators.compose([Validators.required])],
      newPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
      ConfirmPassword: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d.*)(?=.*\W.*)[a-zA-Z0-9\S]{8,}$/)]],
    })
  }

  get cp() {
    return this.changePassForm.controls;
  }

  changePassword() {
    this.submittedCp = true;
    let formData = this.changePassForm.value;  
    if (formData.newPassword != formData.ConfirmPassword) {
      this.cp.ConfirmPassword.setErrors({ 'notMatched': true });
      return
    }else if ((formData.oldPassword== formData.newPassword) && (formData.oldPassword! =''|| formData.newPassword!='' )) {    
      this.cp.ConfirmPassword.setErrors({ 'Matched': true });
      return;
    }
    if (this.changePassForm.status == "VALID") {
      this.spinner.show();
      let obj = 'UserName=' + this.localStorage.loggedInUserName() + '&Password=' + formData.newPassword + '&MobileNo=' + this.localStorage.userMobileNo() ;
      this.apiService.setHttp('put', "userdetails/UpdatePassward?" + obj, false, false, false, 'stplUrl');
      this.apiService.getHttp().subscribe((res: any) => {
        if (res.statusCode == "200") {
          this.spinner.hide();
          this.submittedCp = false;
          this.toastrService.success(res.statusMessage);
          this.changePasswordForm();
        } else {
          this.spinner.hide();
          this.commonService.checkDataType(res.statusMessage) == false ? this.errorSerivce.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
        }
      }, (error: any) => {
        this.spinner.hide();
        this.errorSerivce.handelError(error.status);
      });
    }
  }

  clearChangePassForm() {
   this.changePasswordForm();
   this.submittedCp = false;
  }

  documentUpload(event: any) {
    this.file = event;
    let selResult: any = event.target.value.split('.');
    let getImgExt = selResult.pop();
    getImgExt.toLowerCase();
    if (getImgExt == "png" || getImgExt == "jpg" || getImgExt == "jpeg") {
      this.selectedFile = <File>event.target.files[0];
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();
        reader.onload = (event: any) => {
          this.ImgUrl = event.target.result;
        }
        reader.readAsDataURL(event.target.files[0]);
        this.ImgUrl = event.target.files[0].name;
      }
    }
    else {
      this.toastrService.error("Profile image allowed only jpg or png format");
    }
  }

  addProfileData() {
    this.file ? this.fileUploaded() : this.updateProfileData();
  }

  fileUploaded() {
    let documentUrl: any = this.fileUploadService.uploadDocuments(this.file, "Profile", "png,jpg,jpeg,pdf", 5, 5000);
    documentUrl.subscribe((ele: any) => {
      if (ele.statusCode == '200') {
        this.userProfileForm.controls['profilePath'].setValue(ele.responseData);
        this.updateProfileData();
      } else {
        this.toastrService.error('Profile img is not uploaded')
        this.updateProfileData();
      }
    })
  }

  choosePhoto() {
    let clickPhoto: any = document.getElementById('my_file')
    clickPhoto.click();
  }

  removePhoto() {
    // localStorage.setItem('imgUrl', '');
    this.file = "";
    this.ImgUrl = 'assets/images/user.png';
    this.fileInput.nativeElement.value = '';
  }
}
