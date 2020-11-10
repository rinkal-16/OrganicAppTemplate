import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvvVerifyFormComponent } from './cvv-verify-form.component';

describe('CvvVerifyFormComponent', () => {
  let component: CvvVerifyFormComponent;
  let fixture: ComponentFixture<CvvVerifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CvvVerifyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CvvVerifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
