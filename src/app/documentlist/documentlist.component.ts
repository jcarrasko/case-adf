import { Component, ViewChild, Input } from '@angular/core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../services/preview.service';
import { AppConfigService } from '@alfresco/adf-core';

// launch action
import {
  AlfrescoApiService, ContentService, NodesApiService,
  NotificationService, DataColumn, DataRow, UserPreferencesService, FormValues
} from '@alfresco/adf-core';


import { RestVariable } from '@alfresco/js-api';
import { Node, MinimalNodeEntity, MinimalNodeEntryEntity  } from '@alfresco/js-api';


@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.component.html',
  styleUrls: ['./documentlist.component.css']
})
export class DocumentlistComponent {

  @Input()
  showViewer: boolean = false;

  nodeId: string = null;

  defaultNodeId: string = null;
  defaultFolderId: string = null;

  // For launching
  formValues: FormValues = null;

  myRestValue: RestVariable = null;


  processId;
  processName;

  showDL: boolean = true;
  showProcess: boolean = false;

  @ViewChild('documentList')
  documentList: DocumentListComponent;

  constructor(private notificationService: NotificationService,
    private preview: PreviewService, private appConfig: AppConfigService,
    private nodesApiService: NodesApiService
  ) {
  }

  ngOnInit() {
    this.defaultNodeId = this.appConfig.get<string>('application.dlDefaultNodeId');

  }

  uploadSuccess(event: any) {
    this.notificationService.openSnackMessage('File uploaded');
    this.documentList.reload();
  }

  showPreview(event) {

    const entry = event.value.entry;
    this.showViewer = true;
    if (entry && entry.isFile) {
      this.preview.showResource(entry.id);
    }
  }

  goBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;
   
  }


  isSuperRootFolder() {

  if (this.documentList && this.documentList.currentFolderId === this.defaultNodeId) {
      return false;
    } else {
      return true;
    }
  }


  launchWorkflow(event: any) {

    let entry = event.value.entry;
    this.nodesApiService.getNode(event.value.entry.id).subscribe((node: Node) => {
      this.formValues = {
        'content': node,
        'label1': 'test'
      }
      this.processName = 'Examiner du document ' + event.value.entry.name;
      this.processId = "1";//3003
    }    );

    this.showDL = false;
    this.showProcess = true;
  }

  startingWorkflow(event) {
    this.showDL = true;
    this.showProcess = false;
  }

  cancelingWorkflow(event) {
    this.showDL = true;
    this.showProcess = false;
  }

  

}
