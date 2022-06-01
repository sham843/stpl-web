import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router,PRIMARY_OUTLET, NavigationEnd } from '@angular/router';
// import { filter, map } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { ApiService } from 'src/app/core/services/api.service';
import { LocalstorageService } from 'src/app/core/services/localstorage.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  breadcrumbs: any;
  nameImgObj: any;
  fullName:any;
  pic:any;

  constructor(
    private route: ActivatedRoute,
    private router: Router, 
     private activatedRoute: ActivatedRoute,
    public localstorageService: LocalstorageService,
     private apiService:ApiService) {
    this.addBreadcrumbs();
   }

  ngOnInit(): void {
    this.nameImgObj = this.localstorageService.getFullName_ProfilePhoto();
    this.pic = this.nameImgObj.profilePath;
    this.fullName = this.nameImgObj.fullName;
    this.localstorageService.imageChange.subscribe((imagePath:any) => {
     if (!!imagePath) {
       this.pic = imagePath;
     } else {
       this.pic = this.nameImgObj.profilePath;
     }
   });

   this.localstorageService.getNameOnChange.subscribe(message => {
    if (message) {
      this.fullName = message
    } else {
      this.fullName = this.nameImgObj.fullName;
    }
  });
  }

  addBreadcrumbs() {
    this.router.events.pipe(filter((event:any) => event instanceof NavigationEnd)).pipe(map(() => this.activatedRoute))
      .pipe(map((route:any) => {
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }))
      .pipe(filter((route:any) => route.outlet === PRIMARY_OUTLET))
      .subscribe((route:any) => {

        let snapshot = this.router.routerState.snapshot;
        this.breadcrumbs = [];
        let url = snapshot.url;
        let routeData = route.snapshot.data;
        let label = routeData['breadcrumb'];
        let params = snapshot.root.params;

        this.breadcrumbs.push({
          url: url,
          label: label,
          params: params
        });
      });
  }

  onToggleMenu() {
    let sideBar: any = document.getElementById("sidebar");
    let content: any = document.getElementById("content");
    if (sideBar.classList.contains('d-none')) {
      setTimeout(() => {
        sideBar.classList.remove("d-none");
      }, 75);
      content.classList.remove("active");
    }
    else {
      sideBar.classList.add("d-none");
      content.classList.add("active");
    }
  }

  logOut() {
    localStorage.clear();
    this.router.navigate(['../home'], { relativeTo: this.route });
  }
  
}
