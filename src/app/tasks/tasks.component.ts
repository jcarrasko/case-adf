import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslationService } from '@alfresco/adf-core';

import {
  ProcessService,
  ProcessInstance,
  ProcessInstanceVariable,
  ProcessDefinitionRepresentation,
  ProcessFilterParamRepresentationModel,
  TaskDetailsModel
} from "@alfresco/adf-process-services";

interface Contract {
  contractNumber: string;
  company: string;
  object: string;
  price: string;
}

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  appId: string = null;
  instanceCompany: string = "";
  companyName: string="";
  instanceObject: string = "";
  contractObject: string="";
  instancePrice: string = "";
  price: string="";
  instanceContractNumber: string="";
  contractNumber: string="";

  // instances:

  contracts: Contract[]=[];
  // requestNode
  requestNode: ProcessFilterParamRepresentationModel;
    // App definition ID
  appDefinitionId = '2';
    // process definition ID
    processDefinitionId = 'Process_sid-DCD817AC-2D0F-4AC3-8831-53B45A5BD071:18:7829';
 
  allLoaded: boolean=false;

  constructor(public translationService: TranslationService,private router: Router,
              private route: ActivatedRoute,private processService: ProcessService) { 


                this.route.params.subscribe(params => {
                  const applicationId = params['appId'];
                  if (applicationId && applicationId !== '0') {
                      this.appId = params['appId'];
                  }
                });

/*
    this.allLoaded=false;

      this.requestNode = this.createRequestNode();
      this.processService
      .getProcessInstances(this.requestNode, 'Process_sid-DCD817AC-2D0F-4AC3-8831-53B45A5BD071')
      .subscribe(
        response => {
        
        console.log(response.data);
       
 
        for (var i = 0; i < response.data.length; i++) {
          let instanceID=response.data[i].id;
          
          this.processService
          .getProcessInstanceVariables(instanceID)
          .subscribe(
            responseps => {
              let myContract: Contract={company:'',price:'',contractNumber:'',object:''};
              myContract.company= responseps.find(f => f.name === "company").value;
              myContract.object= responseps.find(f => f.name === "object").value;
              myContract.price= responseps.find(f => f.name === "price").value;
              myContract.contractNumber= responseps.find(f => f.name === "contract_number").value;
              this.contracts[instanceID]=myContract;
             
         

            },
            error => {
              console.error(error);
            });
    
        }

        
        },
        error => {
          console.log(error);
        }
      );
   
      console.log(this.contracts);
      
      this.allLoaded=true;
*/
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const applicationId = params['appId'];
      if (applicationId && applicationId !== '0') {
          this.appId = params['appId'];
      }
    }); 

  
  }
  


  private createRequestNode() {
    let requestNode = {
      appDefinitionId: this.appDefinitionId,
      processDefinitionId: this.processDefinitionId,
      processInstanceId: null,
      state: null,
      sort: null,
      page: 0,
      size: 20,
      start: 0
    };
    return new ProcessFilterParamRepresentationModel(requestNode);
  }

  onRowClick(taskId: string) {
    if (taskId) {
      this.router.navigate(['/apps', this.appId || 0, 'tasks', taskId]);
    }
  }

 

  getCompany (instanceId: any){
    
    if(this.contracts[instanceId] != null){
      // console.log(this.contracts);
     return this.contracts[instanceId].company;
   }
  }

  getObject (instanceId: any){
    
    if(this.contracts[instanceId] != null){
      // console.log(this.contracts);
     return this.contracts[instanceId].object;
   }
  }

  getPrice (instanceId: any){
    if(this.contracts[instanceId] != null){
      // console.log(this.contracts);
     return this.contracts[instanceId].price;
   }
  }

  getContractNumber (instanceId: any){
    if(this.contracts[instanceId] != null){
       // console.log(this.contracts);
      return this.contracts[instanceId].contractNumber;
    }
  }



  

}
