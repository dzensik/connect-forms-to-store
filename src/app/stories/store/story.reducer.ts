import { createReducer, on } from '@ngrx/store';
import { addStoryAction } from './story.actions';
import { formUpdateAction } from '../../directives/connect-form.actions';

export const storyFeatureKey = 'story';

export interface State {
  newStory: {
    title: String;
    description: String;
    draft: String;
    category: Number;
  };
}

export const initialState: State = {
  newStory: {
    title: '',
    description: '',
    draft: '',
    category: 0,
  },
};

export const reducer = createReducer(
  initialState,
  on(addStoryAction, (state) => {
    return { ...state };
  }),

  on(formUpdateAction, (state, action) => {
    return {
      ...state,
      [action.payload.path]: action.payload.value,
    };
  })
);
