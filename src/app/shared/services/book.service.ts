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

    create(book: Book) {
        book.id = this.afs.createId();
        return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
    }

    getById(id: string) {
        return this.afs.collection<Book>(this.collectionName).doc(id).valueChanges();
    }

    getAll() {
        return this.afs.collection<Book>(this.collectionName, ref => ref.orderBy("title")).valueChanges();
    }

    update(book: Book) {
        return this.afs.collection<Book>(this.collectionName).doc(book.id).set(book);
    }

    delete(id: string) {
        return this.afs.collection<Book>(this.collectionName).doc(id).delete();
    }

    loadImage(imageUrl: string) {
        return this.storage.ref(imageUrl).getDownloadURL();

    }
}
