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

import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class PreviewService {

    public content: Blob = null;
    public name: string = null;
    public apsContentId: string = null;

    constructor(private router: Router) {}

    showResource(resourceId): void {
        this.router.navigate([{ outlets: { overlay: ['files', resourceId, 'view'] } }]);
    }

    showBlob(name: string, content: Blob, apsContentId: string): void {
        this.name = name;
        this.content = content;
        this.apsContentId = apsContentId;
        this.router.navigate([{ outlets: { overlay: ['preview', 'blob'] } }]);
    }
}
