import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Node } from '@alfresco/js-api';
import { ViewerExtensionInterface } from '@alfresco/adf-extensions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppConfigService, AlfrescoApiService } from '@alfresco/adf-core';

@Component({
  selector: 'audit-viewer',
  templateUrl: './audit-viewer.component.html',
  styleUrls: ['./audit-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuditViewerComponent
  implements ViewerExtensionInterface {
  /* Required for Viewer Extension Interface */
  @Input() nodeId: string;

  url: string;
  nameFile: string;
  node: Node;

  /* Alfresco Enterprise Viewer Code Below */
  AEV_APP_CONFIG_KEY: string = 'alfresco-enterprise-viewer';

  sanitizedAevUrl: SafeResourceUrl;
  documentIdPrefix: string;
  aevConfig: any;


  // ================ CUSTOM CODE ================
  @Input()
  showViewer = true;
  @Output()
  showViewerChange = new EventEmitter<boolean>();

  constructor(
    private sanitizer: DomSanitizer,
    private appConfigService: AppConfigService,
    private apiService: AlfrescoApiService,

  ) {}

  ngOnInit() {
    this.aevConfig = this.appConfigService.config[this.AEV_APP_CONFIG_KEY];

   
    this.apiService.getInstance().nodes.getNodeInfo(this.nodeId).then(
      (node) => {
          if (node) {
        
              this.node = node;
              this.setViewerUrl();
              return;
          }
      },
    );
  }

  /**
   *
   */
  setViewerUrl(): void {
    let supportedDocTypes = this.aevConfig.properties.supportedMimetypes
      .documents;
    let supportedVideoTypes = this.aevConfig.properties.supportedMimetypes
      .videos;

    if (supportedVideoTypes.indexOf(this.node.content.mimeType) !== -1) {
      this.sanitizedAevUrl = this.getAEVUrlForVideo();
    } else if (
      supportedDocTypes.indexOf('*') !== -1 ||
      supportedDocTypes.indexOf(this.node.content.mimeType) !== -1
    ) {
      this.sanitizedAevUrl = this.getAEVUrl();
    } else {
      /* throw an error (not supported mimetype) */
    }
  }

  /**
   *
   */
  getAEVUrl(): SafeResourceUrl {
    // update the src of the iframe to AEV's external authorization passing
    // the user login, ticket, and the id of the selected documentoc
    let aevDocumentUrl =
      this.aevConfig.properties.endpoints.aev + // assuming AEV is on same server as ADF
      '/login/external.htm?' +
      'docId=' +
      this.aevConfig.properties.alfrescoDocumentStorePrefix +
      this.node.id +
      '&username=' +
      localStorage.getItem('ACS_USERNAME') +
      '&ticket=' +
      localStorage.getItem('ticket-ECM');
      //console.error(this.sanitizer.bypassSecurityTrustResourceUrl(aevDocumentUrl));
      aevDocumentUrl="http://ec2-35-156-148-100.eu-central-1.compute.amazonaws.com/share/page/site/rm/rm-audit?nodeName="+this.node.name+"&nodeRef=workspace/SpacesStore/"+this.nodeId;
      aevDocumentUrl="/share/page/site/rm/rm-audit?nodeName="+this.node.name+"&nodeRef=workspace/SpacesStore/"+this.nodeId;

    return this.sanitizer.bypassSecurityTrustResourceUrl(aevDocumentUrl);
 

  }

  /**
   *
   */
  getAEVUrlForVideo(): SafeResourceUrl {
    // update the src of the iframe to AEV's external authorization passing
    // the user login, ticket, and the id of the selected document
    let aevDocumentUrl =
      this.aevConfig.properties.endpoints.aevVideo + // assuming AEV is on same server as ADF
      '/#/login?' +
      'docName=' +
      encodeURIComponent(this.node.name) +
      '&docId=' +
      this.aevConfig.properties.alfrescoDocumentStorePrefix +
      this.node.id +
      '&username=' +
      localStorage.getItem('ACS_USERNAME');

    // for auth we need to set the cookie before we return
    document.cookie =
      'ticket' + '=' + localStorage.getItem('ticket-ECM') + ';' + 'path=/';

    //return "http://ec2-35-156-148-100.eu-central-1.compute.amazonaws.com/"+this.sanitizer.bypassSecurityTrustResourceUrl(aevDocumentUrl);
  
    return "http://localhost:5200/OpenAnnotate/viewer.htm?docId=workspace%3A%2F%2FSpacesStore%2Fd61eea4e-766a-4768-ad6e-6e3aaf213363&username=demo";
  
  }


  onBackButtonClick() {
    this.close();
  }

  close() {
    this.showViewer = false;
    this.showViewerChange.emit(this.showViewer);
  }
}
