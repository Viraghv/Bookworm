import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ShoppingCartItem} from "../models/ShoppingCartItem";

@Injectable({
    providedIn: 'root'
})
export class ShoppingCartItemService {

    collectionName = "ShoppingCartItems"

    constructor(private afs: AngularFirestore) {}

    create(shoppingCartItem: ShoppingCartItem) {
        shoppingCartItem.id = this.afs.createId();
        return this.afs.collection<ShoppingCartItem>(this.collectionName).doc(shoppingCartItem.id).set(shoppingCartItem);
    }

    update(shoppingCartItemId: string, amount: number) {
        return this.afs.collection<ShoppingCartItem>(this.collectionName).doc(shoppingCartItemId).update({amount: amount});
    }

    delete(shoppingCartItemId: string) {
        return this.afs.collection<ShoppingCartItem>(this.collectionName).doc(shoppingCartItemId).delete();
    }

    getAllByUserId(userId: string) {
        return this.afs.collection<ShoppingCartItem>(this.collectionName, ref => ref.where('userId', '==', userId)).valueChanges();
    }


}
