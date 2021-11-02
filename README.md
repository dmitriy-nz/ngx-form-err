# Description

Flexible display of validation errors in angular forms  
Display localized validation messages for your angular forms. Customize the message display logic to suit your needs

## Features

- Support for reactive and templated forms
- customize error display logic:
  - always
  - when typing
  - when you lose focus
  - when submitting a form
- small markup
- change messages to your liking, for localization messages
- variable in messages, include specifics from validator (e.g. min length)

### [Demo](https://dmitriy-nz.github.io/ngx-from-err/)

## Installation

```sh
$ npm install ngx-from-err
```

Add the module to your application

```ts
@Module({
  imports: [
    BrowserModule,
    NgxFormErrModule,  // <- import
  ],
})
export class AppModule {
}
```

## Usage

### Template-driven form

```html

<form>
  <label>Firstname</label>
  <input class="form-control" name="firstname" [(ngModel)]="name"
         placeholder="Enter your firstname"
         [required]="true"
         [minlength]="2"
         pattern="[a-z]*"
         #nameNgModel="ngModel">

  <ngx-form-err [control]="nameNgModel"></ngx-form-err>
</form>
```

### Reactive form

Template

```html

<form [formGroup]="userForm">

  <div class="form-group mb-3">
    <label>Firstname</label>
    <input class="form-control" placeholder="Enter your firstname" formControlName="name">
    <ngx-form-err [control]="userForm.controls.name"></ngx-form-err>
  </div>

  <div class="form-group">
    <label>Firstname</label>
    <input class="form-control" placeholder="Enter your lastname" formControlName="lastname">
    <ngx-form-err [control]="userForm.controls.lastname"></ngx-form-err>
  </div>

  <button class="btn btn-primary mt-3" type="submit">Submit</button>

</form>

```

Controller

```ts
import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(2), Validators.pattern(/[a-z]*/)]],
      lastname: [null, [Validators.required, Validators.maxLength(10), Validators.pattern(/[a-z -]*/)]],
    });
  }


}

```

## Components

### ngx-form-err

Component for displaying validation errors for one input

#### Inputs

| Prop | Type | Description |
|------|------|-------------|
| control | FormControl or NgModel | Input field controller, needed to track status and display validation errors |
| mode | [NgxFormErrViewMode](#NgxFormErrViewMode) | Type of logic for displaying errors, can display only the first validation error or a list of all validation errors | 
| showWhen | [NgxFormErrViewLogic](#NgxFormErrViewLogic)[] | When should validation errors be shown, an array of parameters |

## Configurations

#### Module-level configuration

You can pass the config file when connecting the module to your application, The configuration object is of type
`NgxFormErrConfig`

```ts
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFormErrModule.forRoot({
      mode: NgxFormErrViewMode.single,
      showWhen: [NgxFormErrViewLogic.formSubmitted, NgxFormErrViewLogic.touched]
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

#### Configuration when using a component

You can override config options when using component  
The names of the incoming parameters match the field name in the configuration

```html

<ngx-form-err [control]="nameNgModel" mode="single" [showWhen]="['touched']"></ngx-form-err>
```

## Error message customization

To customize validation error messages, reload `NgxFormErrStorageFactory` with your implementation, and be sure to
implement from `AbstractNgxFormErrStorageFactory`.

The `getErrorStorage` method must be implemented, it must return an object of type `ErrorGeneratorStorage`

`ErrorGeneratorStorage` is an object whose keys are the name of the validator, and the value is a string or function to
generate an error message. Depending on the type of validator, additional data will be passed as the first argument to
the function to generate an error message.

```ts
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AppComponent} from './app.component';
import {NgxFormErrModule, NgxFormErrStorageFactory} from 'ngx-form-err';
import {CustomFormErrStorageFactory} from "./custom-form-err-storage.factory";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxFormErrModule
  ],
  providers: [
    // Overloading the NgxFormErrStorageFactory standard class of your own implementation
    {
      provide: NgxFormErrStorageFactory,
      useClass: CustomFormErrStorageFactory
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
```

```ts
import {Injectable} from '@angular/core';
import {AbstractNgxFormErrStorageFactory, ErrorGeneratorStorage} from 'ngx-form-err';

@Injectable()
export class CustomFormErrStorageFactory implements AbstractNgxFormErrStorageFactory {

  getErrorStorage(): ErrorGeneratorStorage {
    // Your logic for receiving and returning error messages
    return {
      required: 'My custom required error message',
      minlength: 'My min length message',
      maxlength: (data) => `The maximum length should be no more than ${data.requiredLength}`
    };
  }

}

```

## Types and Interfaces

### NgxFormErrConfig

| Prop | Type | Description |
|------|------|-------------|
| mode | [NgxFormErrViewMode](#NgxFormErrViewMode) | Type of logic for displaying errors, can display only the first validation error or a list of all validation errors |
| showWhen | [NgxFormErrViewLogic](#NgxFormErrViewLogic)[] | When should validation errors be shown, an array of parameters

#### NgxFormErrViewMode

Enum

| Key | Description |
|------|-------------|
|single| Show only the first validation error |
| all | Show all validations errors|

#### NgxFormErrViewLogic

Enum, configuring error display logic

| Key | Description |
|------|-------------|
| immediately | Show validation errors immediately  |
| touched | Show validation errors only when the input has lost focus |
| dirty | Show validation errors when changing the model |
| formSubmitted | Show validation errors after form submission |

#### ErrorGeneratorStorage

A type that describes a storage object for validation error messages

```ts
export type ErrorGeneratorStorage = { [key: string]: ErrorGenerator };
```

#### ErrorGenerator

The type of single error message, can be a regular string or a function

```ts
export type ErrorGeneratorDynamic = (data: any) => string;
export type ErrorGenerator = ErrorGeneratorDynamic | string;

```
