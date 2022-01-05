import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import { Subscription } from 'rxjs';
import {
  formClearAction,
  formSuccessAction,
  formUpdateAction,
} from '../directives/connect-form.actions';
import { ofFormAction } from '../directives/conect-form.operators';
import { debounceTime, filter } from 'rxjs/operators';

@Directive({
  selector: '[connectForm]',
})
export class ConnectFormDirective<T extends FormGroup>
  implements OnInit, OnDestroy
{
  @Input('connectForm') path: string = '';
  @Input() formGroup!: T;
  @Input() updateStateOnInit = true;
  @Input() debounce: number = 300;
  @Input() selfClear = false;
  @Output() error = new EventEmitter();
  @Output() success = new EventEmitter();
  // formChange!: Subscription;
  // formSuccess!: Subscription;
  // formError!: Subscription;

  subscription!: Subscription;

  public pauseUpdateForm = false;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private actions$: Actions,
    private store: Store
  ) {}

  ngOnInit() {
    console.log('call ngOnInit() in connect-form.directives');

    this.addSubscriptions();

    if (
      this.formGroup.value &&
      Object.values(this.formGroup.value).length > 0 &&
      this.updateStateOnInit
    ) {
      this.store.dispatch(
        formUpdateAction({
          payload: {
            value: this.formGroup.value,
            rawValue: this.formGroup.getRawValue(),
            path: this.path,
          },
        })
      );
    }

    // this.store
    //   .select((state) => state.forms[this.path])
    //   .take(1)
    //   .subscribe((val) => {
    //     this.formGroupDirective.form.patchValue(val);
    //   });
    // this.formChange = this.formGroupDirective.form.valueChanges
    //   .debounceTime(this.debounce)
    //   .subscribe((value) => {
    //     this.store.dispatch({
    //       type: UPDATE_FORM,
    //       payload: {
    //         value,
    //         path: this.path,
    //       },
    //     });
    //   });
    // this.formSuccess = this.actions$
    //   .ofType(FORM_SUBMIT_SUCCESS)
    //   .filter(({ payload }) => payload.path === this.path)
    //   .subscribe(() => {
    //     this.formGroupDirective.form.reset();
    //     this.success.emit();
    //   });
    // this.formError = this.actions$
    //   .ofType(FORM_SUBMIT_ERROR)
    //   .filter(({ payload }) => payload.path === this.path)
    //   .subscribe(({ payload }) => this.error.emit(payload.error));
  }

  addSubscriptions() {
    this.subscription = new Subscription();

    // Clear the form
    // after the form data ere successfully saved on the server and in the local store
    this.subscription.add(
      this.actions$
        .pipe(ofFormAction(this.path, formSuccessAction))
        .subscribe(() => {
          this.formGroupDirective.form.reset({}, { emitEvent: false });
          this.success.emit();
        })
    );

    // User change input
    this.subscription.add(
      this.formGroup.valueChanges
        .pipe(
          filter(() => !this.pauseUpdateForm),
          debounceTime(this.debounce)
        )
        .subscribe((value) => {
          this.store.dispatch(
            formUpdateAction({
              payload: {
                value,
                rawValue: this.formGroup.getRawValue(),
                path: this.path,
              },
            })
          );
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    if (this.selfClear) {
      this.store.dispatch(
        formClearAction({
          payload: {
            path: this.path,
          },
        })
      );
    }
  }
}
