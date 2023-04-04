import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {firstValueFrom, Observable} from 'rxjs';
import {UserService} from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
    constructor(private router: Router, private userService: UserService) {
    }

    // @ts-ignore
    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Promise<boolean | UrlTree | Observable<boolean | UrlTree>> {

        const user = JSON.parse(localStorage.getItem('user') as string);
        if (user) {
            let source = this.userService.getById(user.uid)
            const userData = await firstValueFrom(source)

            if (userData?.admin){
                return true;
            }

        }

        this.router.navigateByUrl('/books');
        return false;
    }

}
