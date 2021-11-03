import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgxFormErrViewLogic, NgxFormErrViewMode} from "../../projects/ngx-form-err/src/lib/types";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = '';
  lastname = '';

  userForm: FormGroup;

  demoForm = {
    city: '',
    street: '',
    zip: ''
  };

  ngxFormErrViewMode = NgxFormErrViewMode;
  ngxFormErrViewLogic = NgxFormErrViewLogic;

  showErrorWhenSelected: (keyof typeof NgxFormErrViewLogic)[] = [NgxFormErrViewLogic.formSubmitted, NgxFormErrViewLogic.touched];
  errorViewLogicSelected: NgxFormErrViewMode = NgxFormErrViewMode.single;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.pattern(/[a-z]*/)]],
      lastname: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[a-z -]*/)]],
    });
  }

  toggleShowErrorWhen(mode: NgxFormErrViewLogic): void {
    if (this.showErrorWhenSelected.includes(mode)) {
      this.showErrorWhenSelected.splice(this.showErrorWhenSelected.indexOf(mode), 1);
    } else {
      this.showErrorWhenSelected.push(mode);
    }
  }


}
