import { Component, Input, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { Node } from '@alfresco/js-api';
import { ViewerExtensionInterface } from '@alfresco/adf-extensions';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AppConfigService, AlfrescoApiService } from '@alfresco/adf-core';

@Component({
  selector: 'alfresco-enterprise-viewer',
  templateUrl: './alfresco-enterprise-viewer.component.html',
  styleUrls: ['./alfresco-enterprise-viewer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AlfrescoEnterpriseViewerComponent
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
    // the user login, ticket, and the id of the selected document

    //OpenAnnotate/login/external.htm?docId=workspace://SpacesStore/f7d0f322-483f-4329-a504-baff172f6249&ticket=TICKET_fa13f3151a904e257578ef4caa6b2b915fc065f4&username=demo
    let aevDocumentUrl ="http://ec2-3-122-195-40.eu-central-1.compute.amazonaws.com"+
      this.aevConfig.properties.endpoints.aev + // assuming AEV is on same server as ADF
      '/login/external.htm?' +
      'docId=' +
      this.aevConfig.properties.alfrescoDocumentStorePrefix +
      this.node.id +
      '&username=' +
      localStorage.getItem('ACS_USERNAME') +
      '&ticket=' +
      localStorage.getItem('ticket-ECM');

      console.log("URRLK::"+this.sanitizer.bypassSecurityTrustResourceUrl(aevDocumentUrl));
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

    return this.sanitizer.bypassSecurityTrustResourceUrl(aevDocumentUrl);
  }


  onBackButtonClick() {
    this.close();
  }

  close() {
    this.showViewer = false;
    this.showViewerChange.emit(this.showViewer);
  }
}
