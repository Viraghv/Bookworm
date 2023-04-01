import {TestBed} from '@angular/core/testing';

import {ShoppingCartItemService} from './shopping-cart-item.service';

describe('ShoppingCartItemService', () => {
    let service: ShoppingCartItemService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ShoppingCartItemService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
