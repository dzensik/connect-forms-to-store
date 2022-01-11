import {
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Actions } from '@ngrx/effects';
import {
  formErrorAction,
  formSubmitSuccessAction,
  formUpdateAction,
} from './connect-form.actions';
import { debounceTime, filter, map, take, takeUntil } from 'rxjs/operators';
import { selectAllNewStories } from '../stories/store/story.selectors';
import { ofFormAction } from 'src/app/directives/connect-form.operators';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[connectForm]',
})
export class ConnectFormDirective<T extends FormGroup>
  implements OnInit, OnDestroy
{
  @Input('connectForm') path!: string;
  @Input() formGroup!: T;
  @Input() updateStateOnInit = true;
  @Input() debounce: number = 300;
  @Input() selfClear = false;
  @Output() error = new EventEmitter();
  @Output() success = new EventEmitter();

  formSuccess!: Subscription;
  formError!: Subscription;

  subscription!: Subscription;

  public pauseUpdateForm = false;

  constructor(
    private formGroupDirective: FormGroupDirective,
    private actions$: Actions,
    private store: Store
  ) {}

  ngOnInit() {
    this.addSubscriptions();

    // Read the last story state from the store and populate it in form
    var stories$ = this.store.pipe(select(selectAllNewStories));
    stories$.pipe(take(1)).subscribe((val) => {
      this.formGroupDirective.form.patchValue(val);
    });
  }

  addSubscriptions() {
    this.subscription = new Subscription();

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

    this.subscription.add(
      this.actions$
        .pipe(
          ofFormAction(this.path, formSubmitSuccessAction),
          filter(({ payload }) => payload.path === this.path)
        )
        .subscribe(() => {
          this.formGroupDirective.form.reset({}, { emitEvent: false });
          this.success.emit();
        })
    );

    this.subscription.add(
      this.actions$
        .pipe(
          ofFormAction(this.path, formErrorAction),
          filter(({ payload }) => payload.path === this.path)
        )
        .subscribe((payload) => {
          this.error.emit(payload.payload.error);
        })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
