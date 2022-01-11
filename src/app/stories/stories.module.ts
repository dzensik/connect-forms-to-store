import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoriesRoutingModule } from './stories-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import * as fromStory from './store/story.reducer';
import { StoryEffects } from './store/story.effect';
import { AddStoryFormComponent } from './add-story/add-story-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConnectFormDirective } from '../directives/connect-form.directive';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StoriesRoutingModule,
    StoreModule.forFeature(fromStory.storyFeatureKey, fromStory.reducer),
    EffectsModule.forFeature([StoryEffects]),
  ],
  declarations: [AddStoryFormComponent, ConnectFormDirective],
  exports: [ConnectFormDirective],
})
export class StoriesModule {}
