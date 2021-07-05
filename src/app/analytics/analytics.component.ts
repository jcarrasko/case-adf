import { Component, OnInit } from '@angular/core';
import { AppConfigService } from '@alfresco/adf-core';


@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {


  reportId: string ="1001";
  appId: string ="1001";

  constructor(private appConfig: AppConfigService) {}

  ngOnInit() {
    this.reportId = this.appConfig.get<string>('application.analyticsDefaultReportId');
    this.appId = this.appConfig.get<string>('application.analyticsDefaultAppId');

  }

  launchReport(report){
   this.reportId=report.id;
  }

}
