import { Router } from '@angular/router';
import { MainServiceService } from './../main-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-helprequest',
  templateUrl: './helprequest.component.html',
  styleUrls: ['./helprequest.component.css'],
})
export class HelprequestComponent implements OnInit {
  output: any;
  usertext: any;
  onoff = false;
  skipNumber: number = 1;
  indexNumber: number = 1;
  showdeletebutton: any;
  constructor(private myservice: MainServiceService, private router: Router) {}

  ngOnInit(): void {
    this.firtloadFunction();
    this.showdeletebutton = this.myservice.showdeleteforauthorizeduser;
  }
  firtloadFunction() {
    this.myservice
      .listoflhelprequest(this.skipNumber)
      .subscribe((data: any) => {
        this.output = data.result;
        // console.log('helper list', data);
      });
  }

  comment(data: any) {
    this.router.navigate(['/commentonhelprequest'], { state: { data: data } });
  }
  enableform() {
    this.onoff = !this.onoff;
  }
  addHelpRequest() {
    console.log(this.usertext);
  }
  postHelpRequest() {
    this.onoff = !this.onoff;
    this.myservice.postHelpRequest(this.usertext).subscribe((data: any) => {
      this.firtloadFunction();
      console.log('user is posting service:', data);
    });
  }
  deleteFunction(id: any, email: any) {
    // alert(`id ` + id);
    this.myservice.deletehelprequestby(id, email).subscribe((data) => {
      this.firtloadFunction();
    });
  }
  previousFunction() {
    this.indexNumber = this.indexNumber - 3;
    this.skipNumber = this.skipNumber - 1;
    if (this.skipNumber <= 0 || this.indexNumber <= 0) {
      this.skipNumber = 1;
      this.indexNumber = 1;
    }
    this.firtloadFunction();
    console.log('previous', this.skipNumber);
    //console.log('previous', this.skipNumber);
  }
  nextFunction() {
    this.indexNumber = this.indexNumber + 3;
    this.skipNumber = this.skipNumber + 1;
    console.log('next', this.skipNumber);
    this.firtloadFunction();
  }
}
