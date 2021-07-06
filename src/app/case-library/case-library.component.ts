import { Component, ViewChild, Input } from '@angular/core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { PreviewService } from '../services/preview.service';
import { AppConfigService } from '@alfresco/adf-core';
import { ProcessInstance } from '@alfresco/adf-process-services';

// To launch the action 

import { 
  AlfrescoApiService, ContentService, NodesApiService,
  NotificationService, DataColumn, DataRow, UserPreferencesService, FormValues
} from '@alfresco/adf-core';
 
  
import { RestVariable } from '@alfresco/js-api';
import { Node, MinimalNodeEntity, MinimalNodeEntryEntity  } from '@alfresco/js-api';

import { FormService, FormEvent, FormFieldEvent, FormFieldModel } from '@alfresco/adf-core';

@Component({
  selector: 'app-case-library',
  templateUrl: './case-library.component.html',
  styleUrls: ['./case-library.component.css']
})
export class CaseLibraryComponent  {

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
  showNewTask: boolean = false;
  showRequestMoreFiles: boolean = false;
  showIndexNewFiles: boolean = false;

  

  isCaseFolder: boolean = false;
  isRootFolder: boolean = false;

  memberId: string = null;
  caseId: string = null;

  @ViewChild('documentList')
  documentList: DocumentListComponent;

  formService: FormService;
 

  constructor(private notificationService: NotificationService,
    private preview: PreviewService, private appConfig: AppConfigService,
    private nodesApiService: NodesApiService, formService: FormService
  ) {

    
    this.formService=formService;
   

    formService.formFieldValueChanged.subscribe((e: FormFieldEvent) => {
      if (e.field.id === 'member') {
          const fields: FormFieldModel[] = e.form.getFormFields();
        
          const schemeName = fields.find(f => f.id === 'schemename');
          const schemeId = fields.find(f => f.id === 'scheme');
          const memberId = fields.find(f => f.id === 'member');
          const nationalId = fields.find(f => f.id === 'nationalid');
          const firstName = fields.find(f => f.id === 'memberfirstname');
          const lastName = fields.find(f => f.id === 'memberlastname');
          
          if (schemeName != null) {
            if(this.isCaseFolder==true){
              memberId.value=this.documentList.folderNode.properties["case:MemberId"];
              schemeName.value=this.documentList.folderNode.properties["case:schemeName"];
              schemeId.value=this.documentList.folderNode.properties["case:schemeId"];
              nationalId.value=this.documentList.folderNode.properties["case:nationalId"];
              firstName.value=this.documentList.folderNode.properties["case:firstName"];
              lastName.value=this.documentList.folderNode.properties["case:lastName"];
            }else{
              schemeName.value='';
              schemeId.value="";
              nationalId.value="";
              firstName.value="";
              lastName.value="";
         
            }
          }
 
        
      






         /* if (description != null) {
              console.log(description);
              description.value = 'Barcelona'; // + e.field.value;
          }*/
      }

    });

    this.nodeId = this.appConfig.get<string>('application.caseLibraryRootNodeId');
  
 

  }
 
  ngOnInit() {
    this.defaultNodeId = this.appConfig.get<string>('application.caseLibraryRootNodeId');
  

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

  launchNewTaskWorkflow(event: any) {

  
    this.nodesApiService.getNode(this.defaultNodeId).subscribe((node: Node) => {
      this.formValues = {
        'content': node,
        'label1': 'New Task:'
      }
      this.processName = 'New Task for case:';
      this.processId = "1"; 
    }    );


  


    this.showDL = false;
    this.showProcess = true;

   // this.defaultNodeId=this.documentList.currentFolderId;
    /*this.notificationService
    .openSnackMessage('Review and Approve workflow launched', 2000)
    .afterDismissed()
    .subscribe(() => {  
        console.log('Review and Approve workflow launched');
    });*/

    }


  launchWorkflow(event: any) {

    let entry = event.value.entry;
    this.nodesApiService.getNode(event.value.entry.id).subscribe((node: Node) => {
      this.formValues = {
        'content': node,
        'label1': 'Review and Approve'
      }
      this.processName = 'Approve the document ' + event.value.entry.name;
      this.processId = "1"; 
    }    );

    this.showDL = false;
    this.showProcess = true;

    this.nodeId=this.documentList.currentFolderId;
    /*this.notificationService
    .openSnackMessage('Review and Approve workflow launched', 2000)
    .afterDismissed()
    .subscribe(() => {  
        console.log('Review and Approve workflow launched');
    });*/

  }

  launchRequestMoreFilesWorkflow(event: any) {

    this.processName = 'Request docs for Claim:' + this.documentList.folderNode.properties["case:id"];
    this.showDL = false;
    this.showRequestMoreFiles = true;
    
    //this.defaultNodeId=this.documentList.currentFolderId;
    /*this.notificationService
    .showInfo('Request docs for case' + this.documentList.folderNode.properties["case:id"]);*/
  
  }

  launchIndexNewFileFlow(event: any) {

    this.processName = 'Index new File for Claim: ' + this.documentList.folderNode.properties["case:id"];
    this.showDL = false;
    this.showIndexNewFiles = true;

    this.formValues = {
      'folderid': this.documentList.currentFolderId
    };
    //this.defaultNodeId=this.documentList.currentFolderId;
    //this.memberId=this.documentList.folderNode.properties["case:id"];
    //this.caseId=this.documentList.folderNode.properties["case:id"];
    

    /*this.notificationService
    .showInfo('Request docs for case' + this.documentList.folderNode.properties["case:id"]);*/
  
  }


  startingWorkflow(event) {
    this.showDL = true;
    this.showProcess = false;
    this.showIndexNewFiles= false;
    this.showNewTask=false;
    this.showRequestMoreFiles=false;
    
  }
 
  cancelingWorkflow(event) {
    
    this.showProcess = false;
    this.showIndexNewFiles= false;
    this.showNewTask=false;
    this.showRequestMoreFiles=false;
    this.showDL = true;
 
   
   
  }

  refreshFolder(event){

    this.defaultNodeId = this.appConfig.get<string>('application.caseLibraryRootNodeId');
    if (this.documentList.currentFolderId!=this.defaultNodeId){
      this.isCaseFolder=true;
      this.isRootFolder=false; 
      
      

      this.formService.formFieldValueChanged.subscribe((e: FormFieldEvent) => {
        if (e.field.id === 'member') {
            const fields: FormFieldModel[] = e.form.getFormFields();
          
            const schemeName = fields.find(f => f.id === 'schemename');
            const schemeId = fields.find(f => f.id === 'scheme');
            const memberId = fields.find(f => f.id === 'member');
            const nationalId = fields.find(f => f.id === 'nationalid');
            const firstName = fields.find(f => f.id === 'memberfirstname');
            const lastName = fields.find(f => f.id === 'memberlastname');
            
            if (schemeName != null) {
              if(this.isCaseFolder==true){
                memberId.value=this.documentList.folderNode.properties["case:MemberId"];
                schemeName.value=this.documentList.folderNode.properties["case:schemeName"];
                schemeId.value=this.documentList.folderNode.properties["case:schemeId"];
                nationalId.value=this.documentList.folderNode.properties["case:nationalId"];
                firstName.value=this.documentList.folderNode.properties["case:firstName"];
                lastName.value=this.documentList.folderNode.properties["case:lastName"];
              }else{
                schemeName.value='';
                schemeId.value="";
                nationalId.value="";
                firstName.value="";
                lastName.value="";
           
              }
            }}});



    }else{
      this.isCaseFolder=false;
      this.isRootFolder=true;
    }

     
     return false;
  }
  

}
