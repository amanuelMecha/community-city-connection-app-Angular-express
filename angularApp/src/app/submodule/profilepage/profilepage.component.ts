import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MainServiceService } from './../main-service.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profilepage',
  templateUrl: './profilepage.component.html',
  styleUrls: ['./profilepage.component.css'],
})
export class ProfilepageComponent implements OnInit {
  data: any;
  val: any;
  textinput: any;
  myform: FormGroup;
  onoff = false;
  tokenForSignout: any = localStorage.getItem('token');

  constructor(
    private s: Router,
    private myservice: MainServiceService,
    private formbuild: FormBuilder
  ) {
    this.val = this.s.getCurrentNavigation()?.extras.state?.id;
    console.log('progile id', this.val);
    this.myform = this.formbuild.group({
      text: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchprofilepage();
  }
  fetchprofilepage() {
    this.myservice.fetchProfile(this.val).subscribe((data: any) => {
      this.data = data?.result;
      this.textinput = this.data.address.city;
      console.log('output', data);
    });
  }
  updatecity() {
    this.onoff = !this.onoff;
  }
  inputaccept() {
    console.log(this.textinput);
    this.textinput;
  }
  saveupdate() {
    console.log('idddd', this.data._id);
    this.myservice.changecityName = this.myform.value.text;
    //req.address.city = this.myform.value.text;
    // console.log('this.myform changedCity', changedCity);
    this.myservice
      .changecity(this.data._id, this.myform.value.text)
      .subscribe((data) => {
        console.log(data);
        this.fetchprofilepage();
        this.onoff = !this.onoff;
      });
  }

  signout() {
    localStorage.setItem('token', '');
    this.s.navigate(['/']);
  }
}
