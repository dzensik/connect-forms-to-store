import { createReducer, on } from '@ngrx/store';
import { addStory } from './story.actions';
import { formUpdateAction } from '../directives/connect-form.actions';

export const storyFeatureKey = 'story store';

export interface State {
  title: String;
  description: String;
  draft: String;
  category: Number;
}

export const initialState: State = {
  title: 'Initial Title',
  description: '',
  draft: '',
  category: 0,
};

export const reducer = createReducer(
  initialState,
  on(addStory, (state) => {
    console.log('on addStory');
    return { ...state };
  }),

  on(formUpdateAction, (state, action) => {
    console.log('new title:' + action.payload.value.title);
    return {
      ...state,
      title: action.payload.value.title,
      description: action.payload.value.description,
      draft: action.payload.value.draft,
      category: action.payload.value.category,
    };
  })
);
