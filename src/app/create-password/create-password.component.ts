import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from '../customValidator';

@Component({
  selector: 'app-create-password',
  templateUrl: './create-password.component.html',
  styleUrls: ['./create-password.component.css']
})
export class CreatePasswordComponent implements OnInit {
  passwordForm: FormGroup;
  isSubmitted: boolean;
  password = 'password';
  show = false;
  showConfirm: boolean;
  isUpdated: boolean;
  constructor(public formBuilder: FormBuilder, public router: Router) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      password: ['', Validators.compose([
        Validators.required,
        // check whether the entered password has a number
        CustomValidators.patternValidator(/\d/, {
          hasNumber: true
        }),
        // check whether the entered password has upper case letter
        CustomValidators.patternValidator(/[A-Z]/, {
          hasCapitalCase: true
        }),
        // check whether the entered password has a lower case letter
        CustomValidators.patternValidator(/[a-z]/, {
          hasSmallCase: true
        }),
        // check whether the entered password has a special character
        CustomValidators.patternValidator(
          /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
          {
            hasSpecialCharacters: true
          }
        ),
        Validators.minLength(8)
      ])],
      confirmPassword: ['', [Validators.required]]
    },
    {
      // check whether our password and confirm password match
      validator: CustomValidators.passwordMatchValidator
    });
    console.log(this.passwordForm.controls.confirmPassword)
  }
  get validate() {
    return this.passwordForm.controls;
  }
  onClick(event) {
    if((document.getElementById(event) as HTMLInputElement).type === 'password'){
      (document.getElementById(event) as HTMLInputElement).type = 'text';
      if(event === 'password'){
        this.show = true;
      } else if(event === 'confirmPassword'){
        this.showConfirm = true
      }
    } else {
      (document.getElementById(event) as HTMLInputElement).type = 'password';
      if(event === 'password'){
        this.show = false;
      } else if(event === 'confirmPassword'){
        this.showConfirm = false
      }
    }
  }
  clearPassword(event) {
    this.isSubmitted = false;
    this.isUpdated = false;
    this.passwordForm.controls[event].setValue(undefined);
  }
  passwordChange(){
    this.isSubmitted = true;
  }
  onSubmit(){
    this.isSubmitted = true;
    if(this.passwordForm.invalid){
      return
    } else {
      this.isUpdated = true;
      // this.router.navigate([''])
    }
  }

}
