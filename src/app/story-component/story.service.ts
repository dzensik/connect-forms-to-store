import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  add(): Observable<boolean> {
    console.log('Save the story on the server');
    const obs$ = of(true);
    return obs$;
  }
}
