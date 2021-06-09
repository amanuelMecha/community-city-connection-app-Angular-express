import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-serviceproviders',
  templateUrl: './serviceproviders.component.html',
  styleUrls: ['./serviceproviders.component.css'],
})
export class ServiceprovidersComponent implements OnInit {
  output: any;
  usertext: any;
  onoff = false;
  onoffComment = false;
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
      .listoflserviceprovider(this.skipNumber)
      .subscribe((data: any) => {
        this.output = data.result;
        console.log('helper list', data);
      });
  }
  comment(data: any) {
    this.router.navigate(['/commentonproviders'], { state: { data: data } });
    //this.myservice.addCommentToServiceProvider()
  }
  enableform() {
    this.onoff = !this.onoff;
  }
  addservice() {
    console.log(this.usertext);
  }
  postservice() {
    this.onoff = !this.onoff;
    this.myservice.postservice(this.usertext).subscribe((data: any) => {
      this.firtloadFunction();
      console.log('user is posting service:', data);
    });
  }
  deleteFunction(id: any, email: any) {
    alert(`id ` + id + email);
    this.myservice.deleteserviceproviderbyid(id, email).subscribe((data) => {
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
