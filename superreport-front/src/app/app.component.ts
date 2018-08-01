import { NgModule, Component, Pipe, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  FormsModule,
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private httpClient: HttpClient) { }

  ips: string[] = [
    '172.31.31.1',
    '172.31.31.2',
    '10.33.3.1 3',
  ];

  projects: string[] = [
    'Supermicro',
    'eBay',
    'Hulu',
    'Samsung',
    'Walmart',
    'Comcast',
    'Intel',
    'Millennium',
  ];
  stages: number[] = [
    1,
    0,
  ]


  myform: FormGroup;
  serial: FormControl;
  project: FormControl;
  testServerAddress: FormControl;
  stage: FormControl;





  ngOnInit() {
    this.createFormControls();
    this.createForm();
  }

  createFormControls() {
    this.serial = new FormControl('', Validators.required);
    this.project = new FormControl('');
    this.testServerAddress = new FormControl('');
    this.stage = new FormControl('');
  }

  createForm() {
    this.myform = new FormGroup({
      // name: new FormGroup({
        serial: this.serial,
        project: this.project,
        testServerAddress: this.testServerAddress,
        stage: this.stage
      // })
    });
  }

  doPOST() {
    console.log('POST');
    const form = new FormData()
    const testServerAddress = this.myform.controls.testServerAddress.value;
    const project = this.myform.controls.project.value;
    const serial = this.myform.controls.serial.value;
    const stage = this.myform.controls.stage.value;

    console.log('POST' + testServerAddress + project + serial + stage);


    form.append('testServerAddress', testServerAddress);
    form.append('project', project);
    form.append('serial', serial);
    form.append('stage', stage);

    this.httpClient.post('http://127.0.0.1:5000/generate',
      form, {responseType: 'blob'}
    )
      .subscribe(
        res => {
          const fileURL = URL.createObjectURL(res);
          window.open(fileURL);
        });

    this.myform.reset();
  }
}



