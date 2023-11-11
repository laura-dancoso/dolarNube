import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistredUserComponent } from './registred-user.component';

describe('RegistredUserComponent', () => {
  let component: RegistredUserComponent;
  let fixture: ComponentFixture<RegistredUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistredUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistredUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
