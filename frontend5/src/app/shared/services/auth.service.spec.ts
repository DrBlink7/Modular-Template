import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

import { Auth } from '@angular/fire/auth';

xdescribe('AuthService', () => {
    let service: AuthService;
    let mockAuth: jasmine.SpyObj<Auth>;
    let mockRouter: jasmine.SpyObj<Router>;

    beforeEach(() => {
        mockAuth = jasmine.createSpyObj<Auth>('Auth', [], ['currentUser']);
        mockRouter = jasmine.createSpyObj<Router>('Router', ['navigate']);

        TestBed.configureTestingModule({
            providers: [
                AuthService
            ]
        });

        service = TestBed.inject(AuthService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
