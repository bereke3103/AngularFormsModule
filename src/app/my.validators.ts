import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';

export interface IKeyToBoolean {
  [key: string]: boolean;
}

export class MyValidators {
  static forbidden(control: FormControl): IKeyToBoolean | null {
    if (['bereke3103@mail.ru', 'kek@mail.ru'].includes(control.value)) {
      return { forbidden: true };
    }
    return null;
  }

  static AsyncValidator(
    control: FormControl
  ): Promise<IKeyToBoolean> | Observable<IKeyToBoolean> | null {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (['async@mail.ru', 'async2@mail.ru'].includes(control.value)) {
          resolve({ uniqEmail: true });
        } else if (control.value === 'mail@mail.ru') {
          resolve({ uniqMail: true });
        } else {
          return resolve({ uniqEmail: false, uniqMail: false });
        }
      }, 2000);
    });
    return null;
  }
}
