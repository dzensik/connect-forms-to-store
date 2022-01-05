import { createAction } from '@ngrx/store';

export const enum StoryActions {
  AddStory = '[Story] Add Story',
  AddStorySuccess = '[Story] Add Story Success',
}

export const addStory = createAction(StoryActions.AddStory);

export const addStorySuccess = createAction(StoryActions.AddStorySuccess);
