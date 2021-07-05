import { Component, ViewChild, Input ,ViewEncapsulation} from '@angular/core';
import { DocumentListComponent } from '@alfresco/adf-content-services';
import { ThumbnailService } from '@alfresco/adf-core';
import { NodePaging, Pagination, ResultSetPaging } from '@alfresco/js-api';

import { MinimalNodeEntity } from '@alfresco/js-api';
import { PreviewService } from '../services/preview.service';



import { UserPreferencesService, SearchService, AppConfigService } from '@alfresco/adf-core';

import {
  SearchQueryBuilderService,
  SearchComponent as AdfSearchComponent,
  SearchFilterComponent
} from '@alfresco/adf-content-services';





@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [SearchService, SearchQueryBuilderService]
})
export class SearchComponent     {

  @Input()
  showViewer: boolean = false;

  @ViewChild('searchFilter')
  searchFilter: SearchFilterComponent;

  @Input()
  searchTerm: string ="Recherche";

  nodeId: string = null;

  @ViewChild('documentList')
  documentList: DocumentListComponent;


  data: NodePaging;
  pagination: Pagination;

  constructor(private thumbnailService: ThumbnailService,private preview: PreviewService,
    private preferences: UserPreferencesService,
    private queryBuilder: SearchQueryBuilderService) {


  }

  getMimeTypeIcon(node: MinimalNodeEntity): string {
      let mimeType;

      if (node.entry.content && node.entry.content.mimeType) {
      mimeType = node.entry.content.mimeType;
      }
      if (node.entry.isFolder) {
      mimeType = 'folder';
      }

    return this.thumbnailService.getMimeTypeIcon(mimeType);
  }

  showPreview(item) {

    const entry = item.value.entry;

    if (entry && entry.isFile) {
      this.preview.showResource(entry.id);
    }
  }

  clear(){
   this.searchTerm="";
  }


  isSuperRootFolder(){
      return false;
  }
  onGoBack(event: any) {
    this.showViewer = false;
    this.nodeId = null;
  }

doSearch(term){

  this.searchTerm=term;


}


 }
