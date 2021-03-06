/*!
 * @license
 * Copyright 2016 Alfresco Software, Ltd.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { AlfrescoApiService } from "@alfresco/adf-core";
import { MatSnackBar } from "@angular/material/snack-bar";
import {Location} from '@angular/common';

@Component({
    selector: 'app-file-view',
    templateUrl: 'file-view.component.html',
    styleUrls: ['file-view.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class FileViewComponent implements OnInit {

    nodeId: string = null;
    showAudit: boolean = false;
    nodeType: string = "pdf";

    constructor(private router: Router,
                private route: ActivatedRoute,
                private snackBar: MatSnackBar,
                private apiService: AlfrescoApiService,private _location: Location) {
    }

    ngOnInit() {

        this.route.params.subscribe(params => {
            const id = params.nodeId;
            if (id) {
                this.apiService.getInstance().nodes.getNodeInfo(id).then(
                    (node) => {
                        if (node) {
                            this.nodeId = id;
                            this.nodeType=node.content.mimeType;
                            
                            return;
                        }
                        this.router.navigate(['/files', id]);
                    },
                    () => this.router.navigate(['/files', id])
                );
            }
        });
    }

    onUploadError(errorMessage: string) {
        this.snackBar.open(errorMessage, '', { duration: 4000 });
    }

    toggleAudit(){
        if(this.showAudit==false){
            this.showAudit=true;
        }else{
            this.showAudit=false;
        };
    }
    goBack() {
     
        this._location.back();
       
      }
   
}
