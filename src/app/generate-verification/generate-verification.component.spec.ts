import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateVerificationComponent } from './generate-verification.component';

describe('GenerateVerificationComponent', () => {
  let component: GenerateVerificationComponent;
  let fixture: ComponentFixture<GenerateVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenerateVerificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
