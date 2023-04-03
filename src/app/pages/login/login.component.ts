import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    loginForm = new FormGroup({
        email: new FormControl('', [
            Validators.required,
        ]),
        password: new FormControl('', [
            Validators.required,
        ]),
    });

    loginErrorMessages: Array<string> = [];

    constructor(private authService: AuthService, private router: Router) {
    }

    login() {
        this.loginErrorMessages = [];
        this.authService.login(String(this.loginForm.get('email')?.value), String(this.loginForm.get('password')?.value)).then(cred => {
            localStorage.setItem('cred', JSON.stringify(cred));
            this.router.navigateByUrl('/books');
        }).catch(error => {
            localStorage.setItem('cred', JSON.stringify('null'));

            if(error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-email'){
                this.loginErrorMessages.push('Invalid email or password.')
            }
        });
    }
}
