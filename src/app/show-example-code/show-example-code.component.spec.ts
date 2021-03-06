import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ShowExampleCodeComponent } from './show-example-code.component';

describe('ShowExampleCodeComponent', () => {
  let component: ShowExampleCodeComponent;
  let fixture: ComponentFixture<ShowExampleCodeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowExampleCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowExampleCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
