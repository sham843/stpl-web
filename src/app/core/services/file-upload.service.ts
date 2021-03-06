import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { CommonService } from './common.service';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(private apiService: ApiService, private spinner: NgxSpinnerService,
     private error: ErrorsService, private commonService: CommonService, private toastrService : ToastrService) { }

  uploadDocuments(event: any, folderName?: any, allowedDocTypes?: any, minsize?: any, maxsize?: any) {
    minsize
    return new Observable(obj => {
      const selResult = event.target.value.split('.');
      const docExt = selResult.pop();
      const docExtLowerCase =  docExt.toLowerCase();
      if (allowedDocTypes.match(docExtLowerCase)) {
        if (event.target.files && event.target.files[0]) {
          const file = event.target.files[0];
          if ((file.size / 1048576) > maxsize) {
            obj.error("Required file size should be less than " + maxsize + " MB.");
          }
          else {
            const reader: any = new FileReader();
            reader.onload = () => {
              const formData = new FormData();
              formData.append('FolderName', folderName);
              formData.append('DocumentType', docExtLowerCase);
              formData.append('UploadDocPath', file);
              this.apiService.setHttp('post', 'document/UploadFile', false, formData, false, 'stplUrl');
              this.apiService.getHttp().subscribe({
                next: (res: any) => {
                  this.spinner.hide();
                  if (res.statusCode === "200") {
                    obj.next(res);
                  }
                  else {
                    this.commonService.checkDataType(res.statusMessage) == false ? this.error.handelError(res.statusCode) : this.toastrService.error(res.statusMessage);
                  }
                },
                error: ((error: any) => {
                  this.error.handelError(error.status);
                })
              })
            }
            reader.readAsDataURL(event.target.files[0]);
          }
        }
      }
      else {
        obj.error("Only " + allowedDocTypes + " file format allowed.");
        this.toastrService.error('Please Select Valid Document');
      }
    })
  }
}
