import { Component } from '@angular/core';
import { PreviewService } from '../services/preview.service';
import { Router } from '@angular/router';

import { AppConfigService } from '@alfresco/adf-core';

//AOS
import { AosEditOnlineService } from '../services/aos-edit-online-service.service';
import {Location} from '@angular/common';
@Component({
    templateUrl: 'bob-view.component.html'
})
export class BlobViewComponent {
    content: Blob;
    name: string;
    apsContentId: string;
    
    // hack for AEV
    defaultNodeId: string = null;

    constructor(private editOnlineService: AosEditOnlineService, private appConfig: AppConfigService, preview: PreviewService, router: Router,private _location: Location) {
        if (preview.content === null || preview.name === null) {
            router.navigate([{ outlets: { overlay: null } }]);
            return;
        }

        this.content = preview.content;
        this.name = preview.name;
        this.apsContentId = preview.apsContentId;
    }

    ngOnInit() {
        this.defaultNodeId = this.appConfig.get<string>('application.ApsDefaultNodeId');
    
      }

    aosEditonline(event) {

      this.editOnlineService.onActionEditOnlineAosForAps(this.name,this.apsContentId);
      console.log(this.content);
      console.log(this.apsContentId);


    }

    goBack() {
        
        this._location.back();
       
      }
}
