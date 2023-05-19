import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { MyValidators } from './my.validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(
        '',
        [Validators.email, Validators.required, MyValidators.forbidden]
        //AsyncValidator устарел
        //MyValidators.AsyncValidator
      ),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      address: new FormGroup({
        country: new FormControl('kz', Validators.required),
        city: new FormControl('', Validators.required),
      }),
      // skills: new FormArray([]),
    });
  }

  submit() {
    console.log('Form', this.form);
    const formData = { ...this.form.value };
    console.log('DATA:', formData);
    console.log('DATA without spread operator:', this.form.value);

    //чистит форму
    this.form.reset();
  }

  setCapital() {
    const capitalOfCountry: ICity = {
      ru: 'Москва',
      ua: 'Киев',
      by: 'Минск',
      kz: 'Астана',
    };

    const capitalKey: string = this.form.get('address')?.get('country')?.value;
    const capital = capitalOfCountry[capitalKey];

    this.form.patchValue({
      address: {
        city: capital,
      },
    });
  }

  addSkill() {
    const control = new FormControl('', Validators.required);
    //Первый способо
    (<FormArray>this.form.get('skills')).push(control);

    //Второй способ
    // (this.form.get('skill') as FormArray).push(control);
  }
}

export interface ICityIndex {
  [index: string]: string;
}
export interface ICity extends ICityIndex {
  ru: string;
  ua: string;
  by: string;
  kz: string;
}
