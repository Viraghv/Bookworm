import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BookService} from "../../../shared/services/book.service";
import {Book} from "../../../shared/models/Book";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-upload-book',
    templateUrl: './upload-book.component.html',
    styleUrls: ['./upload-book.component.scss']
})
export class UploadBookComponent implements OnInit{
    bookId?: string | null

    uploadBookForm = new FormGroup({
        title: new FormControl('', [
            Validators.required,
        ]),
        author: new FormControl('', [
            Validators.required,
        ]),
        cost: new FormControl('', [
            Validators.required,
        ]),
        releaseDate: new FormControl<Date|null>(null, [
            Validators.required,
        ]),
    });

    coverImage?: File | null = null;
    imageErrors: Array<string> = [];
    bookData: any;

    constructor(private route: ActivatedRoute, private bookService: BookService, private router: Router) {
    }

    async ngOnInit() {
        this.bookId = this.route.snapshot.paramMap.get('id');

        if (this.bookId) {
            let source = this.bookService.getById(this.bookId)
            this.bookData = await firstValueFrom(source);

            this.uploadBookForm.get('title')?.setValue(String(this.bookData?.title))
            this.uploadBookForm.get('author')?.setValue(String(this.bookData?.author))
            this.uploadBookForm.get('cost')?.setValue(String(this.bookData?.cost))
            this.uploadBookForm.get('releaseDate')?.setValue(new Date(Number(this.bookData?.releaseDate)));
        }
    }

    onSubmit(){
        if(!this.bookId) {
            if(!this.coverImage) {
                this.imageErrors.push("Please upload a cover image");
            }

            if(this.uploadBookForm.valid){
                let book: Book = {
                    title: String(this.uploadBookForm.get("title")?.value),
                    author: String(this.uploadBookForm.get("author")?.value),
                    cost: Number(this.uploadBookForm.get("cost")?.value),
                    releaseDate: new Date(String(this.uploadBookForm.get("releaseDate")?.value)).getTime(),
                    imageUrl: "book-covers/" + this.coverImage?.name,
                }

                this.bookService.create(book, this.coverImage).then(_ => {
                    this.router.navigateByUrl('/admin');
                }).catch(error => {
                    console.error(error);
                })
            }
        } else {
            if(this.uploadBookForm.valid){
                let bookNewUrl: string;
                if(this.coverImage){
                    bookNewUrl = "book-covers/" + this.coverImage?.name;
                } else {
                    bookNewUrl = this.bookData?.imageUrl;
                }

                let book: Book = {
                    id: this.bookData.id,
                    title: String(this.uploadBookForm.get("title")?.value),
                    author: String(this.uploadBookForm.get("author")?.value),
                    cost: Number(this.uploadBookForm.get("cost")?.value),
                    releaseDate: new Date(String(this.uploadBookForm.get("releaseDate")?.value)).getTime(),
                    imageUrl: bookNewUrl,
                }

                this.bookService.update(book, this.coverImage, this.bookData.imageUrl).then( _ => {
                    this.router.navigateByUrl("/admin");
                }).catch(error => {
                    console.error(error)
                })
            }
        }
    }

    setBookCoverImage(event: any) {
        this.imageErrors = [];

        if(event.target?.files.length === 0){
            return;
        }

        if(event.target.files[0].type !== "image/jpeg" && event.target.files[0].type !== "image/png"){
            this.imageErrors.push("Incorrect file type. Allowed types: jpg, jpeg, png.")
        }

        if(event.target.files[0].size > 1024000){
            this.imageErrors.push("File can't be bigger than 1MB.")
        }

        if(this.imageErrors.length > 0){
            const file: any = document.getElementById('image-input');
            file.value = null;
            this.coverImage = null;
            return;
        }

        this.coverImage = event.target.files[0];
    }
}
