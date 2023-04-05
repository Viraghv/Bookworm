import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderService} from "../../../shared/services/order.service";
import {Order} from "../../../shared/models/Order";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy{

    orders: Array<Order> = [];
    ordersSubscription?: Subscription;
    displayedColumns: string[] = ['id', 'firstname', 'lastname', 'zipCode', 'address', 'phoneNumber', 'paymentType', 'amount', 'bookId', 'userId' ]


    constructor(private orderService: OrderService) {
    }

    ngOnInit() {
        this.ordersSubscription = this.orderService.getAll().subscribe(orders => {
            this.orders = orders;
        })
    }

    ngOnDestroy() {
        this.ordersSubscription?.unsubscribe();
    }

}
