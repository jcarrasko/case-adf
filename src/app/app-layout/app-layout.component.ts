import { Component } from '@angular/core';
import { TranslationService, AuthenticationService } from '@alfresco/adf-core';

import { Router } from '@angular/router';
import { MinimalNodeEntity } from '@alfresco/js-api';
import { PreviewService } from '../services/preview.service';


@Component({
  selector: 'app-root',
  templateUrl: './app-layout.component.html',
  styleUrls: ['./app-layout.component.css']
})
export class AppLayoutComponent {  

  constructor(public translationService: TranslationService, public router: Router, private preview: PreviewService, private authService: AuthenticationService) { }



  onSearchSubmit(event: KeyboardEvent) {
    const value = (event.target as HTMLInputElement).value;
    this.router.navigate(['/search', {
        q: value
    }]);
}

onItemClicked(event: MinimalNodeEntity) {
    if (event.entry.isFile) {
        //this.preview.showResource(event.entry.id);
        //this.preview.showDocumentDetails(event.entry.id);
    } else if (event.entry.isFolder) {
        this.router.navigate(['/documents', event.entry.id]);
    }
}

getUserName(){
  return this.authService.getEcmUsername();
}

isSuperUser(){
  var myUser=this.authService.getBpmUsername();

  if (myUser=="demo" || myUser=="procmanager"){
   return true;
  }else{
    return false;}

}

}
