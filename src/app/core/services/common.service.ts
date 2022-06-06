import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '10rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    toolbarHiddenButtons: [
      ['bold', 'fontName', 'heading', 'fontSize','subscript','superscript','justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent','heading',
      'fontName','customClasses',
      'link',
      'unlink',
      'insertImage',
      'insertVideo',
      'insertHorizontalRule','textColor',
      'backgroundColor',]
    ],
  };

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  checkDataType(val: any) {
    let value: any;
    if (val == "" || val == null || val == "null" || val == undefined || val == "undefined" || val == 'string' || val == null || val == 0) {
      value = false;
    } else {
      value = true;
    }
    return value;
  }

  routerLinkRedirect(path: any) {
    this.router.navigate([path], { relativeTo: this.route })
  }

  onlyDigitsExcludeZeroAtStart(event: any) {
    const maskSeperator = new RegExp('^[1-9][0-9]*$', 'g');
    if(event.currentTarget.value != "" && event.currentTarget.value.length > 0 && event.key == '0') {
        return true
    }
    return maskSeperator.test(event.key);
}

}
