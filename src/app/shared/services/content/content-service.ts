import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  allContent: any;

  constructor(private http: HttpClient) {}

  getContent(page: string): Observable<any> {
    if (this.allContent) {
      return new Observable((observer) => {
        observer.next(this.allContent[page]);
        observer.complete();
      });
    }

    return this.http.get('/public/data/content.json').pipe(
      map((data: any) => {
        this.allContent = data;
        return data[page];
      }),
    );
  }
}
