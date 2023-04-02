import {Component, Input, OnInit, OnChanges, Output, EventEmitter} from '@angular/core';
import {Book} from "../../../shared/models/Book";
import {BookService} from "../../../shared/services/book.service";
import {ShoppingCartItem} from "../../../shared/models/ShoppingCartItem";

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges {

    @Input() book?: Book;
    @Input() searchTerm: string = "";
    @Input() shoppingCartItems: Array<ShoppingCartItem> = [];
    @Output() addToCartEmitter: EventEmitter<any> = new EventEmitter();
    @Output() increaseEmitter: EventEmitter<any> = new EventEmitter();
    @Output() decreaseEmitter: EventEmitter<any> = new EventEmitter();


    loadedImage?: string;
    inCartAmount: number = 0;
    shoppingCartItem?: ShoppingCartItem;
    user?: any;

    constructor(private bookService: BookService) {
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('user') as string);
        this.bookService.loadImage(String(this.book?.imageUrl)).subscribe(data => {
            this.loadedImage = data;
        });
        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            if (this.shoppingCartItems[i].bookId === this.book?.id) {
                this.inCartAmount = this.shoppingCartItems[i].amount;
                this.shoppingCartItem = this.shoppingCartItems[i];
                break;
            }
        }
    }

    ngOnChanges() {
        this.inCartAmount = 0;
        this.user = JSON.parse(localStorage.getItem('user') as string);
        for (let i = 0; i < this.shoppingCartItems.length; i++) {
            if (this.shoppingCartItems[i].bookId === this.book?.id) {
                this.inCartAmount = this.shoppingCartItems[i].amount;
                this.shoppingCartItem = this.shoppingCartItems[i];
                break;
            }
        }
    }

    emitAddToCart() {
        this.addToCartEmitter.emit(this.book);
    }

    emitIncrease() {
        this.increaseEmitter.emit(this.shoppingCartItem);
    }

    emitDecrease() {
        this.decreaseEmitter.emit(this.shoppingCartItem);
    }
}
