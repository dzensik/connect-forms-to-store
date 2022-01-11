import { createAction, props } from '@ngrx/store';

export enum FormActions {
  formUpdateAction = '[FormActions] Update Form',
  formSubmitSuccessAction = '[FormActions] Form Submit Success',
  formSubmitErrorAction = '[FormActions] Form Submit Error',
  formSubmittedAction = '[FormActions] Form Submitted',
}

export const formSubmitSuccessAction = createAction(
  FormActions.formSubmitSuccessAction,
  props<{
    payload: {
      path: string;
      confirmationRequires?: boolean;
    };
  }>()
);

export const formSubmittedAction = createAction(
  FormActions.formSubmittedAction,
  props<{
    payload: {
      path: string;
      confirmationRequires?: boolean;
    };
  }>()
);

export const formErrorAction = createAction(
  FormActions.formSubmitErrorAction,
  props<{
    payload: {
      path: string;
      error: any;
    };
  }>()
);

export const formUpdateAction = createAction(
  FormActions.formUpdateAction,
  props<{
    payload: {
      path: string;
      value: any;
      rawValue?: any;
    };
  }>()
);
