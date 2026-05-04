import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  allContent: any;

  constructor(private http: HttpClient) {}

  getContent(page: string): Observable<any> {
    if (this.allContent) return of(this.allContent[page]);

    return this.http.get('/data/content.json').pipe(
      map((data: any) => {
        this.allContent = data;
        return data[page];
      }),
    );
  }
}
