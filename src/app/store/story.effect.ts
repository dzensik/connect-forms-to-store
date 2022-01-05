import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { StoryService } from '../story-component/story.service';
import { catchError, map, switchMap } from 'rxjs/operators';
import { addStory } from './story.actions';
import {
  formErrorAction,
  formSuccessAction,
} from '../directives/connect-form.actions';

@Injectable()
export class StoryEffects {
  constructor(private storyService: StoryService, private actions$: Actions) {}

  addStory$ = createEffect(() => {
    console.log('createEffect add story');
    return this.actions$.pipe(
      ofType(addStory),
      switchMap(() =>
        this.storyService.add().pipe(
          map((response) =>
            formSuccessAction({
              payload: { path: 'newStory', confirmationRequires: false },
            })
          ),
          catchError((error) => of(formErrorAction(error)))
        )
      )
    );
  });
}
