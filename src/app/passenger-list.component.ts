import { Component } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { ControlledSubFormTypedComponent } from './ctrl-subform.component';
import { pick as _pick, cloneDeep as _cloneDeep } from 'lodash';

interface PassengerList {
  passengers: any[];
  passengerSelected: boolean;
}

@Component({
  selector: 'app-passenger-list',
  templateUrl: './passenger-list.component.html'
})
export class PassengerListComponent extends ControlledSubFormTypedComponent<PassengerList> {

  selectedPassenger = -1;

  constructor(formBuilder: FormBuilder) {
    super(formBuilder);
  }

  getSubFormConfig() {
    return {
      passengers: this.formBuilder.array([]),
      passengerSelected: [false, Validators.requiredTrue]
    };
  }

  protected mapControlValueToSubForm(value): PassengerList {
    if (!value) {
      return {passengers: [], passengerSelected: false};
    }
    const result = {passengers: _cloneDeep(value), passengerSelected: this.selectedPassenger >= 0};
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
