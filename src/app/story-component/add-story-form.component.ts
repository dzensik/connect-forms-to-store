import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { StoryActions } from '../store/story.actions';

@Component({
  selector: 'add-story-form',
  templateUrl: './add-story-form.html',
})
export class AddStoryFormComponent {
  public newStory!: FormGroup;
  public success: Boolean = false;
  public error!: Error;

  constructor(private store: Store) {}

  options = [
    { id: 1, label: 'Category One' },
    { id: 2, label: 'Category Two' },
  ];

  onError(event: any) {
    this.error = event;
  }

  onSuccess() {
    this.success = true;
  }

  ngOnInit() {
    console.log('call ngOnInit() in add-story-form.component');
    this.newStory = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      draft: new FormControl(false),
      category: new FormControl(this.options[1].id, Validators.required),
    });
  }

  submit() {
    console.log('Submit clicked');
    this.success = false;
    this.store.dispatch({
      type: StoryActions.AddStory,
    });
  }
}
