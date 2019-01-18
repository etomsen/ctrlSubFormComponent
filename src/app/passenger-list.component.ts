import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray, ValidatorFn, FormGroup } from '@angular/forms';
import { ControlledSubFormTypedComponent } from './ctrl-subform.component';
import { pick as _pick, cloneDeep as _cloneDeep, isEmpty as _isEmpty } from 'lodash';

interface PassengerList {
  passengers: any[];
}

const PassengerListValidator: ValidatorFn = (subForm: FormGroup) => {
  const passengerFormArray = subForm.get('passengers') as FormArray;
  const errors = passengerFormArray.errors || {};
  const selected = passengerFormArray.length ? passengerFormArray.controls.some(ctrl => {
    return ctrl.value ? ctrl.value.selected : false;
  }) : false;
  selected ? delete errors['noPassengerSelected'] : errors['noPassengerSelected'] = 'No passenger selected';
  return _isEmpty(errors) ? null : errors;
};

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html'
})
export class PassengerListComponent extends ControlledSubFormTypedComponent<PassengerList> {

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  protected getSubFormOptions() {
    return {validator: PassengerListValidator};
  }

  getSubFormConfig() {
    return {
      passengers: this.formBuilder.array([])
    };
  }

  protected mapControlValueToSubForm(value): PassengerList {
    if (!value) {
      return {passengers: []};
    }
    const result = {passengers: _cloneDeep(value)};
    this.updatePassengersFormArray(result);
    return result;
  }

  updatePassengersFormArray(newState: PassengerList) {
    const oldLength = this.getPassengersArray().length;
    if (oldLength === newState.passengers.length) {
      return;
    }
    // save the ctrl value before cleaning the array
    while (this.getPassengersArray().length) {
      this.getPassengersArray().removeAt(0);
    }
    // don't need to add anything
    if (!newState.passengers.length) {
      return;
    }
    // add new controls
    newState.passengers.forEach(_ => {
      this.getPassengersArray().push(this.formBuilder.control(null));
    });
  }

  protected mapSubFormValueToControl(oldCtrlValue: any, newSubFormValue: PassengerList): any {
    return _cloneDeep(newSubFormValue.passengers);
  }

  getPassengersArray(): FormArray {
    return this.subForm.get('passengers') as FormArray;
  }

}
