import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFormErrComponent } from './ngx-form-err.component';

describe('NgxFormErrComponent', () => {
  let component: NgxFormErrComponent;
  let fixture: ComponentFixture<NgxFormErrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFormErrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFormErrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
