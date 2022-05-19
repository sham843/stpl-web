import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {
  getlocalStorageData: any;

  constructor() { }

  checkUserIsLoggedIn() { // check user isLoggedIn or not  
    let sessionData:any =  sessionStorage.getItem('loggedIn');
    sessionData == null || sessionData == ''  ? localStorage.clear(): '';
    if (localStorage.getItem('user') && sessionData == 'true') return true;
    else return false;
  }

  getLoggedInLocalstorageData() {
    let data = JSON.parse(localStorage['user']);
    return data;
  }

  loggedInUserName() {
    let data = JSON.parse(localStorage['user']);
    return data['userName'];
  }

  userId() {
    let userId = this.getLoggedInLocalstorageData();
    return userId.id;
  }

  profilePath() {
    let userId = this.getLoggedInLocalstorageData();
    let profilePath = userId.profilePath =="" || userId.profilePath == null || userId.profilePath == undefined  ? 'assets/images/user.png' : userId.profilePath;
    return profilePath;
  }

  userTypeId() {
    let userTypeId = this.getLoggedInLocalstorageData();
    return userTypeId.userTypeId;
  }

  subUserTypeId() {
    let userTypeId = this.getLoggedInLocalstorageData();
    return userTypeId.subUserTypeId;
  }

  getAllPageName() {
    let getAllPageName = this.getLoggedInLocalstorageData();
    return getAllPageName.pageUrls;
  }

  redirectToDashborad() {
    let logInUserType: any = this.getAllPageName();
    let redirectToDashboard = logInUserType[0].pageURL;
    return redirectToDashboard;
  }

  userMobileNo() {
    let mobileNumber = this.getLoggedInLocalstorageData();
    return mobileNumber.mobileNo;
  }
}
