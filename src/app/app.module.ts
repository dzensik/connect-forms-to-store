import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AddStoryFormComponent } from './story-component/add-story-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StoryEffects } from './store/story.effect';
import { ConnectFormDirective } from './story-component/connect-form.directive';
import * as fromStory from './store/story.reducer';

@NgModule({
  declarations: [AppComponent, AddStoryFormComponent, ConnectFormDirective],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forFeature(fromStory.storyFeatureKey, fromStory.reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forFeature([StoryEffects]),
  ],
  exports: [ConnectFormDirective],
  bootstrap: [AppComponent],
})
export class AppModule {}
