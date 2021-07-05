import { Component } from "@angular/core";
//process imports
import {
  ProcessService,
  ProcessInstance,
  ProcessInstanceVariable,
  ProcessDefinitionRepresentation,
  ProcessFilterParamRepresentationModel,
  TaskDetailsModel
} from "@alfresco/adf-process-services";
import { variable } from "@angular/compiler/src/output/output_ast";

interface Quarter {
  value: string;
  viewValue: string;
}

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"]
})


export class DashboardComponent {
  requestNode: ProcessFilterParamRepresentationModel;
  // the instances
  instances;
  // instance Values
  instanceValues;
  // the selected Product with the instance ID
  selectedInstance;
  // App definition ID
  appDefinitionId = '2002';
  // process definition ID
  processDefinitionId = 'ConceptRelease-QualityRiskCheckforApparel:3:10637';


  constructor(private processService: ProcessService) {
    this.stringfiedSectionChartData = JSON.stringify(this.sectionChartData);
    this.stringfiedDetailChartData = JSON.stringify(this.detailChartData);
    this.fill();


  }

 

  selectedQuarter: string = '0';


  quarters: Quarter[] = [
    { value: '1', viewValue: '3/2020' },
    { value: '2', viewValue: '4/2020' },
    { value: '3', viewValue: '1/2021' },
    { value: '4', viewValue: '2/2021' },
  ];

  stringfiedSectionChartData: string = '';
  stringfiedDetailChartData: string = '';


  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };

  // Specific for

  public sectionChartData: any[] = [
    { data: [0], label: "Retirement" },
    { data: [0], label: "Risk Salary Claim" },
    { data: [0], label: "Disability Claim" }
  ];

  public detailChartData: any[] = [
    { data: [0], label: "Open" },
    { data: [0], label: "In Review" },
    { data: [0], label: "Signed" }
  ];

  // Colors
  public sectionChartColors: Array<any> = [
    { backgroundColor: ["#FF6666", "blue", "gold"] }
  ];
  public detailChartColors: Array<any> = [
    { backgroundColor: ["#FF6666", "blue", "gold"] }
  ];

  public barChartLabelsType: string[] = ["Retirement", "Risk Salary Claim", "Disability Claim"];
  public barChartLabels: string[] = ["Open", "In Review", "Signed"];
  public barChartType: string = "bar";
  public pieChartType: string = "pie";
  public barChartLegend: boolean = true;

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }



  public fill(): void {

    // variables for the graphic SECTIONS
    let technical = 5;
    let financial = 1;
    let legal = 1;


    // variables for the graphics DETAILS

    let open = 2;
    let review = 2;
    let signed = 3;


    if (this.selectedQuarter === '1') {

      technical = 1;
      financial = 2;
      legal = 0;
      open = 0;
      review = 0;
      signed = 3;

    } else if (this.selectedQuarter === '2') {
      technical = 1;
      financial = 1;
      legal = 1;
      open = 0;
      review = 1;
      signed = 2;


    } else if (this.selectedQuarter === '3') {

      technical = 4;
      financial = 2;
      legal = 1;
      open = 0;
      review = 2;
      signed = 5;

    } else {

      technical = 5;
      financial = 2;
      legal = 1;
      open = 3;
      review = 2;
      signed = 3;


    }




    // Change the Section
    let data1 = [technical, financial, legal];


    let clone = JSON.parse(this.stringfiedSectionChartData);
    clone[0].data = data1;

    this.sectionChartData = clone;

    // Change the detail
    let data_detail1 = [open, review, signed];

    let clone_detail = JSON.parse(this.stringfiedDetailChartData);
    clone_detail[0].data = data_detail1;
    this.detailChartData = clone_detail;


  }






}
