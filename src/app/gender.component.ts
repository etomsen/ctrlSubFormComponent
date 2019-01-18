import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ControlledSubFormTypedComponent } from './ctrl-subform.component';

import { cloneDeep as _cloneDeep} from 'lodash';

interface Gender {
  code: string;
}



@Component({
  selector: 'app-gender',
  templateUrl: './gender.component.html'
})
export class GenderComponent extends ControlledSubFormTypedComponent<Gender> {
  public genderLabels = [
    { value: 'MALE', display: 'male' },
    { value: 'FEMALE', display: 'female' }
  ];

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  getSubFormConfig() {
    return {
      code: ['', Validators.required]
    };
  }

  protected mapControlValueToSubForm(value): Gender {
    return {
      code: value ? value.code : ''
    };
  }

  protected mapSubFormValueToControl(oldCtrlValue: any, newSubFormValue: Gender): any {
    if (!newSubFormValue.code) {
      return _cloneDeep(oldCtrlValue);
    }
    return { code: newSubFormValue.code };
  }
}
