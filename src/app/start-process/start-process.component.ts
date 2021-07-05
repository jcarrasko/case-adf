import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProcessInstance } from '@alfresco/adf-process-services';
import { AppConfigService } from '@alfresco/adf-core';

import { FormService, FormEvent, FormFieldEvent, FormFieldModel } from '@alfresco/adf-core';

@Component({
  selector: 'app-start-process',
  templateUrl: './start-process.component.html',
  styleUrls: ['./start-process.component.scss']
})
export class StartProcessComponent implements OnInit {

  appId: string = null;
  processName: string = null;

  constructor(private router: Router,
              private route: ActivatedRoute,private appConfig: AppConfigService, formService: FormService) { 



                formService.formFieldValueChanged.subscribe((e: FormFieldEvent) => {
                  if (e.field.id === 'member') {
                      const fields: FormFieldModel[] = e.form.getFormFields();
                    
                      const schemeName = fields.find(f => f.id === 'schemename');
                      const schemeId = fields.find(f => f.id === 'scheme');
                      const nationalId = fields.find(f => f.id === 'nationalid');
                      const firstName = fields.find(f => f.id === 'memberfirstname');
                      const lastName = fields.find(f => f.id === 'memberlastname');
                      
                      if (schemeName != null) {
                        if(e.field.value==='U709152C'){
                          schemeName.value='Ithuba Agriculture (PTY) LTD';
                          schemeId.value="0090005090";
                          nationalId.value="92070409991087";
                          firstName.value="Jabulile";
                          lastName.value="Zondi";
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


          /*formService.formFieldValueChanged.subscribe((e: FormFieldEvent) => {
            if (e.field.id === 'company') {
                const fields: FormFieldModel[] = e.form.getFormFields();
           
                const company_address = fields.find(f => f.id === 'company_address');
                const company_legal = fields.find(f => f.id === 'company_legal');
                const company_city = fields.find(f => f.id === 'company_city');
                const company_capital = fields.find(f => f.id === 'company_capital');

            
                
                if (company_address != null) {
                  if(e.field.value==='Wholesale Fabrics'){
                    company_address.value='Las Ramblas 42';
                    company_legal.value='PLC';
                    company_city.value='Barcelona';
                    company_capital.value='120000';
                  }else{
                    company_address.value = '';
                    company_legal.value='';
                    company_city.value='';
                    company_capital.value='';
                  }
                }








                if (description != null) {
                    console.log(description);
                    description.value = 'Barcelona'; // + e.field.value;
                }
            }

          }); */
    }

  ngOnInit() {
    this.appId = this.appConfig.get<string>('application.processAppId');
    this.processName = this.appConfig.get<string>('application.processName');

    this.route.params.subscribe(params => {
      if (params.appId && params.appId !== '0') {
          this.appId = params.appId;
      } else {
        this.router.navigate(['/apps']);
      }
  }); 
  }

  onProcessStarted(process: ProcessInstance) {
    this.router.navigate(['/apps', this.appId || 0, 'tasks']);
  }

  onCancelStartProcess() {
    this.router.navigate(['/apps', this.appId || 0, 'tasks']);
  }
}
