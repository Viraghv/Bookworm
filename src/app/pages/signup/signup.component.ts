import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {UserService} from "../../shared/services/user.service";
import {User} from "../../shared/models/User";
import {Router} from "@angular/router";

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

    signUpForm = new FormGroup({
        username: new FormControl('', [
            Validators.required,
            Validators.minLength(4),
            Validators.maxLength(30),
        ]),
        email: new FormControl('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
        rePassword: new FormControl('', [
            Validators.required,
            Validators.minLength(4)
        ]),
    });

    constructor(private authService: AuthService, private userService: UserService, private router: Router,) {
    }

    onSubmit() {
        if(this.signUpForm.valid){
            if(this.signUpForm.get("password")?.value === this.signUpForm.get("rePassword")?.value){
                this.authService.signup(String(this.signUpForm.get('email')?.value), String(this.signUpForm.get('password')?.value)).then(cred => {

                    const user: User = {
                        id: cred.user?.uid as string,
                        email: String(this.signUpForm.get('email')?.value),
                        username: String(this.signUpForm.get('username')?.value),
                        admin: false,
                    }
                    this.userService.create(user).then(_ => {
                        this.router.navigateByUrl('/books');
                    }).catch(error => {
                        console.error(error);
                    });
                });
            } else {
                console.log("Jelszavak nem egyeznek.")
                //TODO
            }
        } else {
            //TODO
        }


    }


}
