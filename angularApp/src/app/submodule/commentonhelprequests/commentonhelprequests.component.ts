import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-commentonhelprequests',
  templateUrl: './commentonhelprequests.component.html',
  styleUrls: ['./commentonhelprequests.component.css'],
})
export class CommentonhelprequestsComponent implements OnInit {
  output: any;
  text: any;
  onoff: any;
  usertext: any;
  notification: number = 0;
  //fetch by id to refreshh the page autoo
  myForm: FormGroup;
  constructor(
    private router: Router,
    private myservice: MainServiceService,
    private formBuilder: FormBuilder
  ) {
    this.output = this.router.getCurrentNavigation()?.extras.state?.data;
    this.myForm = this.formBuilder.group({
      textInput: ['', Validators.required],
    });
    console.log('output', this.output);
  }

  ngOnInit(): void {}
  replyFunction(cid: any) {
    this.myservice
      .addReplyTohelprequestcomment(
        this.output._id,
        cid,
        this.myForm.get('textInput')?.value
      )
      .subscribe((data) => {
        console.log(data);
        this.fetchbyidtorefresh(this.output._id);
      });
  }
  textFunction() {
    this.text;
    console.log(this.text);
  }
  fetchbyidtorefresh(id: any) {
    this.myservice.gethelprequestbyid(id).subscribe((data: any) => {
      console.log('aman adisu be id', data);
      this.output = data?.result[0];
    });
  }
  comment() {
    this.onoff = !this.onoff;
  }
  addservice() {
    console.log(this.usertext);
  }
  postcomment() {
    this.onoff = !this.onoff;
    this.notification = this.notification + 1;
    this.myservice
      .addCommentTohelprequest(this.output._id, this.usertext)
      .subscribe((data: any) => {
        this.fetchbyidtorefresh(this.output._id);
        console.log('user is posting service:', data);
      });
  }
  clearNotification() {
    this.notification = 0;
  }
}
