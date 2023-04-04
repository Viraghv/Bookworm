import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Book} from "../../../shared/models/Book";
import {ShoppingCartItem} from "../../../shared/models/ShoppingCartItem";
import {BookService} from "../../../shared/services/book.service";
import {Subscription} from "rxjs";

@Component({
    selector: 'app-shopping-cart-item',
    templateUrl: './shopping-cart-item.component.html',
    styleUrls: ['./shopping-cart-item.component.scss']
})
export class ShoppingCartItemComponent implements OnInit, OnDestroy {
    @Input() shoppingCartItem?: ShoppingCartItem;
    @Output() increaseEmitter: EventEmitter<any> = new EventEmitter();
    @Output() decreaseEmitter: EventEmitter<any> = new EventEmitter();
    @Output() deleteEmitter: EventEmitter<any> = new EventEmitter();

    book?: Book;
    loadedImage?: string;
    user?: any;

    bookSubscription?: Subscription;

    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user') as string);

        this.bookSubscription = this.bookService.getById(String(this.shoppingCartItem?.bookId)).subscribe(book => {
            this.book = book;

            this.bookService.loadImage(String(this.book?.imageUrl)).subscribe(data => {
                this.loadedImage = data;
            });
        })
    }

    emitIncrease() {
        this.increaseEmitter.emit(this.shoppingCartItem);
    }

    emitDecrease() {
        this.decreaseEmitter.emit(this.shoppingCartItem);
    }

    emitDelete() {
        this.deleteEmitter.emit(this.shoppingCartItem);
    }

    ngOnDestroy() {
        this.bookSubscription?.unsubscribe();
    }
}
