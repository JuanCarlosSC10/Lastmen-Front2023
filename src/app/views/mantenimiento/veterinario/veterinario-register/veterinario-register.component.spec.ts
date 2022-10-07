import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeterinarioRegisterComponent } from './veterinario-register.component';

describe('VeterinarioRegisterComponent', () => {
  let component: VeterinarioRegisterComponent;
  let fixture: ComponentFixture<VeterinarioRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeterinarioRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VeterinarioRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
