import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  loginForm: FormGroup;
  isSubmitted: boolean;
  isForgotPassowrd: boolean;
  createpassword: string;
  password = 'password';
  show = false;
  isLogin: boolean;
  constructor(public formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      emailId: ['', [Validators.required, Validators.email, Validators.maxLength(80),
      Validators.pattern('[a-zA-Z0-9.-_+]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      password: ['', [Validators.required] ]
    })
    this.createpassword = '/createpassword';
  }
   get validate() {
    return this.loginForm.controls;
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.loginForm.invalid){
      return
    } else {
      this.isLogin = true
    }
  }
  onEmailCheck(){
    this.isSubmitted = true;
  }
  onClick() {
    if (this.password === 'password') {
      this.password = 'text';
      this.show = true;
    } else {
      this.password = 'password';
      this.show = false;
    }
  }
  clearPassword() {
   (document.getElementById("password") as HTMLInputElement).value = '';
  }

}
