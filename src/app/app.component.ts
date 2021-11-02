import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = '';
  lastname = '';

  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.pattern(/[a-z]*/)]],
      lastname: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[a-z -]*/)]],
    });
  }


}
