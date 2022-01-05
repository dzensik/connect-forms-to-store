import { createAction, props } from '@ngrx/store';

export enum FormActions {
  formSubmitSuccess = '[FormActions] Form Submit Success',
  formSubmitError = '[FormActions] Form Submit Error',
  formSubmittedAction = '[FormActions] Form Submitted',
  initFormState = '[FormActions] Init Form State',
  initializeForm = '[FormActions] Initialize Form', // needs for reinitialize form with new data
  updateForm = '[FormActions] Update Form',
  forceUpdateForm = '[FormActions] Force Update Form',
  formRetInitState = '[FormActions] Ret Init State',
  formSetSubmitState = '[FormActions] Set Submit State',
  clearForm = '[FormActions] Clear Form',
  formFetchData = '[FormActions] Fetch Data',
}

export const formSuccessAction = createAction(
  FormActions.formSubmitSuccess,
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
  FormActions.formSubmitError,
  props<{
    payload: {
      path: string;
      error: any;
    };
  }>()
);

/**
 * this action should be called when u need to reinitialize the form,
 * for example in case when form intended to create a new item and the id of this
 * item comes only in response after creating. If we just update this form we will
 * have an unwanted diff between the current state and submitted, so for evading this
 * situation better use this action.
 */

export const formInitializeAction = createAction(
  FormActions.initializeForm,
  props<{
    payload: {
      path: string;
      value: any;
      rawValue?: any;
    };
  }>()
);

export const formUpdateAction = createAction(
  FormActions.updateForm,
  props<{
    payload: {
      path: string;
      value: any;
      rawValue?: any;
    };
  }>()
);

export const formForceUpdateAction = createAction(
  FormActions.forceUpdateForm,
  props<{
    payload: {
      path: string;
      value: any;
    };
  }>()
);

/**
 * Rewrite initial state of particular form.
 *
 * @see import('./clear-submitted-on-force-update.directive.ts').ClearSubmittedOnForceUpdateDirective
 */
export const formRetInitState = createAction(
  FormActions.formRetInitState,
  props<{
    payload: {
      path: string;
      value: any;
    };
  }>()
);

/**
 * Rewrite initial state of particular form.
 *
 * @see import('./re-init-on-force-update.directive.ts').ReInitOnForceUpdateDirective
 */
export const formSetSubmitState = createAction(
  FormActions.formSetSubmitState,
  props<{
    payload: {
      path: string;
      value: any;
    };
  }>()
);

export const formClearAction = createAction(
  FormActions.clearForm,
  props<{
    payload: {
      path: string;
    };
  }>()
);

export const formFetchData = createAction(
  FormActions.formFetchData,
  props<{
    payload: {
      path: string;
    };
  }>()
);
