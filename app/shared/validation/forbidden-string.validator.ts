import { ValidatorFn, AbstractControl } from '@angular/forms';

export function forbiddenStringValidator(StrReg: RegExp): ValidatorFn {
    return (control: AbstractControl): {[ key:string]: any } => {
        const str = control.value;
        const invalid = StrReg.test(str);
        return invalid ? { 'forbiddenString': { str } } : null;  

    }
}