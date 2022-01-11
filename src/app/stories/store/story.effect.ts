import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { StoryService } from '../add-story/add-story.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { addStoryAction } from './story.actions';
import {
  formErrorAction,
  formSubmitSuccessAction,
} from '../../directives/connect-form.actions';

@Injectable()
export class StoryEffects {
  constructor(private storyService: StoryService, private actions$: Actions) {}

  addStory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addStoryAction),
      switchMap(() =>
        this.storyService.add().pipe(
          map(() =>
            formSubmitSuccessAction({
              payload: { path: 'newStory', confirmationRequires: false },
            })
          ),
          catchError((error) => of(formErrorAction(error)))
        )
      )
    );
  });
}
