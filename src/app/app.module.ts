import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ContentModule } from '@alfresco/adf-content-services';
import { ProcessModule } from '@alfresco/adf-process-services';
import { InsightsModule } from '@alfresco/adf-insights';
import { CoreModule, TRANSLATION_PROVIDER, TranslateLoaderService } from '@alfresco/adf-core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FileViewComponent } from './file-view/file-view.component';
import { BlobViewComponent } from './file-view/blob-view.component';
import {AlfrescoEnterpriseViewerComponent} from './file-view/alfresco-enterprise-viewer/alfresco-enterprise-viewer.component';



import { PreviewService } from './services/preview.service';
import { AosEditOnlineService } from './services/aos-edit-online-service.service';

// Custom stencils
import { StencilsModule } from './stencils.module';

// Locale
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import localeEs from '@angular/common/locales/es';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AppsComponent } from './apps/apps.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { DocumentlistComponent } from './documentlist/documentlist.component';
import { StartProcessComponent } from './start-process/start-process.component';
import { appRoutes } from './app.routes';
import { AppLayoutComponent } from './app-layout/app-layout.component';

//import custom
import { SearchComponent } from './search/search.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import {AuditViewerComponent} from './file-view/audit-viewer/audit-viewer.component';
// Dashboard
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChartsModule } from 'ng2-charts';
//Case library
import { CaseLibraryComponent } from './case-library/case-library.component';

registerLocaleData(localeFr);
registerLocaleData(localeEs);
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(
            appRoutes // ,
            // { enableTracing: true } // <-- debugging purposes only
        ),

        // ADF modules
        CoreModule.forRoot(),
        ContentModule.forRoot(),
        ProcessModule.forRoot(),
        InsightsModule.forRoot(),
        TranslateModule.forRoot({
            loader: { provide: TranslateLoader, useClass: TranslateLoaderService }
        }),
        StencilsModule,
        ChartsModule
    ],
    declarations: [
        AppComponent,
        AppsComponent,
        HomeComponent,
        LoginComponent,
        TasksComponent,
        TaskDetailsComponent,
        DocumentlistComponent,
        StartProcessComponent,
        AppLayoutComponent,
        FileViewComponent,
        BlobViewComponent,
        AlfrescoEnterpriseViewerComponent,
        AuditViewerComponent,
        SearchComponent,
        AnalyticsComponent,
        DashboardComponent,
        CaseLibraryComponent
    ],
    providers: [
        AosEditOnlineService,
        PreviewService,
        {
            provide: TRANSLATION_PROVIDER,
            multi: true,
            useValue: {
              name: 'translations',
              source: 'assets/translations'
            }
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
