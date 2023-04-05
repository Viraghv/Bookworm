import {Component, OnInit, OnDestroy} from '@angular/core';
import {BookService} from "../../shared/services/book.service";
import {ShoppingCartItemService} from "../../shared/services/shopping-cart-item.service";
import {ShoppingCartItem} from "../../shared/models/ShoppingCartItem";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Order} from "../../shared/models/Order";
import {OrderService} from "../../shared/services/order.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shopping-cart',
    templateUrl: './shopping-cart.component.html',
    styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit, OnDestroy {

    shoppingCartItemsOfUser: Array<ShoppingCartItem> = [];
    user?: any;

    orderFormGroup = new FormGroup({
        firstname: new FormControl('', [
            Validators.required,
        ]),
        lastname: new FormControl('', [
            Validators.required,
        ]),
        zipCode: new FormControl('', [
            Validators.required,
        ]),
        address: new FormControl('', [
            Validators.required,
        ]),
        phoneNumber: new FormControl('', [
            Validators.required,
            Validators.pattern('^[\\+]?[(]?[0-9]{3}[)]?[-\\s\\.]?[0-9]{3}[-\\s\\.]?[0-9]{4,6}$')
        ]),
        paymentType: new FormControl('', [
            Validators.required,
        ]),
    });

    paymentTypes: any = [
        {
            value: 'cash on delivery',
            viewValue: 'Cash on delivery'
        },
        {
            value: 'credit card',
            viewValue: 'Credit card'
        },
        {
            value: 'paypal',
            viewValue: 'Paypal'
        },
    ];

    shoppingCartItemsSubscription?: Subscription;

    constructor(private bookService: BookService, private shoppingCartItemService: ShoppingCartItemService,
                private orderService: OrderService, private _snackBar: MatSnackBar,
                private router: Router) {
    }

    ngOnInit() {
        if (JSON.parse(localStorage.getItem('user') as string)) {
            this.user = JSON.parse(localStorage.getItem('user') as string)
        } else {
            this.user = JSON.parse(localStorage.getItem('cred') as string)?.user;
        }

        this.shoppingCartItemsSubscription = this.shoppingCartItemService.getAllByUserId(this.user.uid).subscribe(async shoppingCartItems => {
            this.shoppingCartItemsOfUser = shoppingCartItems;
        })
    }

    increaseAmount(shoppingCartItem: ShoppingCartItem) {
        let amount = shoppingCartItem.amount + 1;

        this.shoppingCartItemService.update(String(shoppingCartItem.id), amount).then().catch(error => {
            console.log(error);
        });
    }

    decreaseAmount(shoppingCartItem: ShoppingCartItem) {
        let amount = shoppingCartItem.amount - 1;

        if (amount > 0) {
            this.shoppingCartItemService.update(String(shoppingCartItem.id), amount).then().catch(error => {
                console.log(error);
            });
        } else {
            this.shoppingCartItemService.delete(String(shoppingCartItem.id)).then().catch(error => {
                console.log(error);
            });
        }
    }

    deleteItem(shoppingCartItem: ShoppingCartItem) {
        this.shoppingCartItemService.delete(String(shoppingCartItem.id)).then().catch(error => {
            console.log(error);
        });
    }

    async onOrderSubmit() {
        if (this.orderFormGroup.valid) {
            try {
                while (this.shoppingCartItemsOfUser.length != 0) {
                    let order: Order = {
                        firstname: String(this.orderFormGroup.get('firstname')?.value),
                        lastname: String(this.orderFormGroup.get('lastname')?.value),
                        zipCode: String(this.orderFormGroup.get('zipCode')?.value),
                        address: String(this.orderFormGroup.get('address')?.value),
                        phoneNumber: String(this.orderFormGroup.get('phoneNumber')?.value),
                        paymentType: String(this.orderFormGroup.get('paymentType')?.value),
                        userId: String(this.user.uid),
                        bookId: String(this.shoppingCartItemsOfUser[0].bookId),
                        amount: this.shoppingCartItemsOfUser[0].amount,
                    }

                    await this.orderService.create(order);
                    await this.shoppingCartItemService.delete(String(this.shoppingCartItemsOfUser[0].id));
                }

                this._snackBar.open('Your order has been placed!', 'OK');
                this.router.navigateByUrl('/books');
            } catch (error) {
                console.log(error)
            }
        }
    }

    ngOnDestroy() {
        this.shoppingCartItemsSubscription?.unsubscribe();
    }

}
