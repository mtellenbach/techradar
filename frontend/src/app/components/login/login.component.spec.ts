import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";


describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'login']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        FormBuilder,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to dashboard if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not navigate to dashboard if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    component.ngOnInit();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it('should call AuthService.login() with correct username and password when login is called', fakeAsync(() => {
    component.loginForm.patchValue({ username: 'testuser', password: 'testpassword' });
    authService.login.and.returnValue(of(true));
    component.login();
    tick(); // Manually advance the clock to simulate asynchronous operations
    expect(authService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
  }));

  it('should mark all form controls as touched when login form is invalid', () => {
    component.loginForm.patchValue({}); // Set form to invalid state
    component.login();
    expect(component.loginForm.touched).toBeTrue();
  });

  it('should return true if field is touched and invalid', () => {
    component.loginForm.patchValue({ username: '' }); // Set username field to invalid state
    component.loginForm.markAllAsTouched();
    expect(component.isFieldValid('username')).toBeTrue();
  });

  it('should return error message for required field', () => {
    component.loginForm.patchValue({ username: '' }); // Set username field to invalid state
    component.loginForm.markAllAsTouched();
    expect(component.getErrorMessage('username')).toBe('Dieses Feld ist erforderlich');
  });
});
