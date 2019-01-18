import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ControlledSubFormTypedComponent } from './ctrl-subform.component';
import { pick as _pick, cloneDeep as _cloneDeep } from 'lodash';

interface PersonalDetails {
  name: string;
  surname: string;
  gender: any;
}

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html'
})
export class PersonalDetailsComponent extends ControlledSubFormTypedComponent<PersonalDetails> {
  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  getSubFormConfig() {
    return {
      name: ['', Validators.required],
      surname: '',
      gender: null
    };
  }

  protected mapControlValueToSubForm(value): PersonalDetails {
    if (!value) {
      return {name: '', surname: '', gender: null};
    }
    return _pick(value, ['name', 'surname', 'gender']);
  }

  protected mapSubFormValueToControl(oldCtrlValue: any, newSubFormValue: PersonalDetails): any {
    const result = _cloneDeep(oldCtrlValue) || {};
    result.name = newSubFormValue.name;
    result.surname = newSubFormValue.surname;
    result.gender = newSubFormValue.gender;
    return result;
  }
}
