import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {Book} from "../models/Book";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
    providedIn: 'root'
})
export class BookService {

    collectionName = 'Books';

    constructor(private afs: AngularFirestore, private storage: AngularFireStorage) {
    }

    create(book: Book, coverImage: File | null | undefined) {
        book.id = this.afs.createId();
        book.imageUrl = "book-covers/" + book.id + '.' + coverImage?.name.split('.')[1];
        this.storage.upload(String(book.imageUrl), coverImage);
        return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
    }

    getById(id: string) {
        return this.afs.collection<Book>(this.collectionName).doc(id).valueChanges();
    }

    getAll() {
        return this.afs.collection<Book>(this.collectionName, ref => ref.orderBy("title")).valueChanges();
    }

    async update(book: Book, coverImage: File | null | undefined, previousImagePath: string | null | undefined) {
        if (coverImage && previousImagePath) {
            await this.storage.storage.ref(previousImagePath).delete();
            await this.storage.upload(String(book.imageUrl), coverImage);
        }
        return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
    }

    async delete(book: Book) {
        await this.storage.storage.ref(book.imageUrl).delete();
        return this.afs.collection<Book>(this.collectionName).doc(book.id).delete();
    }

    loadImage(imageUrl: string) {
        return this.storage.ref(imageUrl).getDownloadURL();
    }

}
