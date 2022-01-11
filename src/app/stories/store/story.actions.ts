import { createAction } from '@ngrx/store';

export const enum StoryActions {
  AddStory = '[Story] Add Story',
}

export const addStoryAction = createAction(StoryActions.AddStory);
