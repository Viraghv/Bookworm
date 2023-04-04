import {Component, OnInit, OnDestroy} from '@angular/core';
import {BookService} from "../../shared/services/book.service";
import {Book} from "../../shared/models/Book";
import {ShoppingCartItem} from "../../shared/models/ShoppingCartItem";
import {ShoppingCartItemService} from "../../shared/services/shopping-cart-item.service";
import { Subscription } from 'rxjs';


@Component({
    selector: 'app-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy {

    books: Array<Book> = [];
    shoppingCartItemsOfUser: Array<ShoppingCartItem> = [];
    searchTerm: string = "";
    user?: any;

    bookSubscription?: Subscription;

    constructor(private bookService: BookService, private shoppingCartItemService: ShoppingCartItemService) {
    }

    ngOnInit() {
        if (JSON.parse(localStorage.getItem('user') as string)) {
            this.user = JSON.parse(localStorage.getItem('user') as string)
        } else {
            this.user = JSON.parse(localStorage.getItem('cred') as string)?.user;
        }

        this.bookSubscription = this.bookService.getAll().subscribe(books => {
            this.books = books;
        });

        if (this.user) {
            this.shoppingCartItemService.getAllByUserId(this.user.uid).subscribe(shoppingCartItems => {
                this.shoppingCartItemsOfUser = shoppingCartItems;
            })
        }
    }

    addToCart(book: Book) {
        const user = JSON.parse(localStorage.getItem('user') as string);
        let newShoppingCartItem: ShoppingCartItem = {
            userId: user.uid,
            bookId: String(book.id),
            amount: 1,
        }

        this.shoppingCartItemService.create(newShoppingCartItem).then().catch(error => {
            console.log(error);
        });
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

    ngOnDestroy() {
        this.bookSubscription?.unsubscribe();
    }

}
