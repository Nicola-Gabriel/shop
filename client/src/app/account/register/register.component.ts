import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  error: string [];
  value: string[];
  constructor(private accountService: AccountService,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

 createForm () {
   this.registerForm = new FormGroup({
    email: new FormControl('', 
    [Validators.required, Validators.pattern('^\\w+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$')],
    [this.checkIfEmailExists()]
    ),
    password: new FormControl('', [Validators.required, Validators.pattern('(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;\'?/&gt;.&lt;,])(?!.*\\s).*$')]),
    displayName: new FormControl('', [Validators.required, Validators.pattern('(?!^[0-9]*$)(?!^[a-zA-Z]*$)^([a-zA-Z0-9]{6,15})$')])
   });
 }

 onSubmit() {
      this.accountService.register(this.registerForm.value).subscribe(res => {
        this.router.navigateByUrl('/shop');
        console.log(res);
        }, error => {
          console.log(error);
          this.error = error.error;
        });
    }

 checkIfEmailExists(): AsyncValidatorFn {
   return control => {
     return timer(500).pipe(
       switchMap(() => {
         if(!control.value) {
           return of(null);
         }

         return this.accountService.returnEmailAddress(control.value).pipe(
           map( res => {
             return res ? {emailExists: this.messageForEmail()} : this.error = [''];
           })
         );
       })
     );
   };
 }

 messageForEmail() {
   this.accountService.returnEmailAddress(this.registerForm.get('email').value).subscribe(res => {
     if (res) {
       this.error = ['Email in use'];
     }
   });

    }
 }

