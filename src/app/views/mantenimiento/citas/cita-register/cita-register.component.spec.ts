import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitasRegisterComponent } from './cita-register.component';

describe('CitaRegisterComponent', () => {
  let component: CitasRegisterComponent;
  let fixture: ComponentFixture<CitasRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CitasRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
