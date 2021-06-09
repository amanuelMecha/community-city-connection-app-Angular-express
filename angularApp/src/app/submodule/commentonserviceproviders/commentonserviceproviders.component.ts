import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainServiceService } from '../main-service.service';

@Component({
  selector: 'app-commentonserviceproviders',
  templateUrl: './commentonserviceproviders.component.html',
  styleUrls: ['./commentonserviceproviders.component.css'],
})
export class CommentonserviceprovidersComponent implements OnInit {
  output: any;
  // text: any;
  onoff: any;
  notification: number = 0;
  usertext: any;
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
  }

  ngOnInit(): void {}
  replyFunction(cid: any) {
    console.log('this.myForm.value', this.myForm.get('textInput')?.value);
    this.myservice
      .addReplyToServiceComment(
        this.output._id,
        cid,
        this.myForm.get('textInput')?.value
      )
      .subscribe((data) => {
        this.fetchbyidtorefresh(this.output._id);
      });
  }
  // textFunction() {
  //  // this.text;
  //   console.log(this.text);
  // }
  fetchbyidtorefresh(id: any) {
    this.myservice.getserviceproviderbyid(id).subscribe((data: any) => {
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
    this.notification = this.notification + 1;
    this.onoff = !this.onoff;
    this.myservice
      .addCommentToServiceProvider(this.output._id, this.usertext)
      .subscribe((data: any) => {
        // this.firtloadFunction();
        this.fetchbyidtorefresh(this.output._id);
        console.log('user is posting service:', data);
      });
  }
  clearNotification() {
    this.notification = 0;
  }
}
