import {Component, OnDestroy, OnInit} from '@angular/core';
import {Book} from "../../../shared/models/Book";
import {BookService} from "../../../shared/services/book.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
    selector: 'app-admin-books',
    templateUrl: './books.component.html',
    styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit, OnDestroy{
    books: Array<Book> = [];
    booksSubscription?: Subscription;
    displayedColumns: string[] = ['id', 'title', 'author', 'cost', 'releaseDate', 'actionButtons']

    constructor(private booksService: BookService, private router: Router) {
    }

    ngOnInit() {
        this.booksSubscription = this.booksService.getAll().subscribe(books => {
            this.books = books;
        })
    }

    navigateToUploadBook(){
        this.router.navigateByUrl('/admin/upload-book');
    }

    editBook(book: Book){
        this.router.navigateByUrl('/admin/upload-book/' + book.id);
    }

    deleteBook(book: Book){
        this.booksService.delete(book).catch(error => {
            console.error(error)
        });
    }

    ngOnDestroy() {
        this.booksSubscription?.unsubscribe();
    }
}
