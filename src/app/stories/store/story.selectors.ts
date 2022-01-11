import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromStory from './story.reducer';

export const selectStoryState = createFeatureSelector<fromStory.State>(
  fromStory.storyFeatureKey
);

export const selectAllNewStories = createSelector(
  selectStoryState,
  (state) => state.newStory
);
