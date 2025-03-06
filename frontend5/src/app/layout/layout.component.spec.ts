import { ComponentFixture, TestBed } from "@angular/core/testing";
import { AuthService } from "../shared/services/auth.service";
import { GoogleButtonComponent } from "./login/google-button/google-button.component";


describe('GoogleButtonComponent', () => {
  let component: GoogleButtonComponent;
  let fixture: ComponentFixture<GoogleButtonComponent>;
  let mockAuthService: jasmine.SpyObj<AuthService>;

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj<AuthService>('AuthService', ['login']);

    await TestBed.configureTestingModule({
      declarations: [GoogleButtonComponent],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GoogleButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call authService.login() when login() is called', () => {
    component.login();
    expect(mockAuthService.login).toHaveBeenCalled();
  });
});
