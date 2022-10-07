import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MascotaRegisterComponent } from './mascota-register.component';

describe('MascotaRegisterComponent', () => {
  let component: MascotaRegisterComponent;
  let fixture: ComponentFixture<MascotaRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MascotaRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MascotaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
