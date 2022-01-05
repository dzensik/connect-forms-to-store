import { OperatorFunction } from 'rxjs';
import { ActionCreator } from '@ngrx/store/src/models';
import { Creator } from '@ngrx/store';
import { ofType } from '@ngrx/effects';
import { filter } from 'rxjs/operators';

export function ofFormAction<AC extends ActionCreator<string, Creator>[]>(
  formName: string,
  ...allowedTypes: AC
): OperatorFunction<any, ReturnType<AC[number]>> {
  return (source) =>
    source.pipe(
      ofType(...allowedTypes),
      filter((action) => (action as any).payload?.path === formName)
    );
}
