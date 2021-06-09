import { MainServiceService } from './../main-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  myform: FormGroup;
  image: any;
  emailExits: boolean = false;
  constructor(
    private formbuild: FormBuilder,
    private myservice: MainServiceService,
    private route: Router
  ) {
    this.myform = this.formbuild.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      phone: ['', Validators.required],
      image: [''],
      address: this.formbuild.group({
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zipcode: ['', Validators.required],
      }),
    });
    this.myform.valueChanges.subscribe((data) => {
      console.log(data);
    });
    // console.log(
    //   '"password length should be greater than 4" ',
    //   //@ts-ignore
    //   this.myForm.get('password').invalid
    // );
  }

  ngOnInit(): void {}
  signup() {
    console.log(this.myform);
    this.myservice.signupservice(this.myform.value).subscribe((data: any) => {
      console.log('signup data', data);
      if (data.status === 'User exists') {
        this.emailExits = true;
      } else {
        this.route.navigate(['']);
      }
    });
  }
  get passwordLength() {
    //@ts-ignore
    console.log('password', this.myform.get('password'));

    return (
      //@ts-ignore
      this.myform.get('password').invalid &&
      this.myform.get('password')?.touched
    );
  }
}
