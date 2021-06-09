import { Router } from '@angular/router';
import { MainServiceService } from './../main-service.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  myform: FormGroup;
  constructor(
    private formbuild: FormBuilder,
    private myservice: MainServiceService,
    private route: Router
  ) {
    this.myform = formbuild.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.myform.valueChanges.subscribe((data) => {
      this.myservice.showdeleteforauthorizeduser = data.email;
      console.log('showDeleteIfYoucanD', this.myservice.showdeleteforauthorizeduser);
    });
  }
  signin() {
    //@ts-ignore

    //this.myservice.showDeleteIfYoucanD = this.myform.get('email').value;

    this.myservice.signinservice(this.myform.value).subscribe((data: any) => {
      console.log('datat singinin frontendt');
      localStorage.setItem('token', data.result);

      data.result
        ? this.route.navigate(['/profile'], { state: { id: data.id } })
        : this.route.navigate(['/errorpage']);
    });
  }
}
