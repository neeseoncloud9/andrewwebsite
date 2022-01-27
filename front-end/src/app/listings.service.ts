import { Injectable } from '@angular/core';
import { Listing } from './types';
import { observable, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Auth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { observeInsideAngular } from '@angular/fire';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-text': 'application/json',
  })
};

const httpOptionsWithAuthToken = token => ({
  headers: new HttpHeaders({
    'Content-text': 'application/json',
    'AuthToken': token,
  })
});

@Injectable({
  providedIn: 'root'
})
export class ListingsService {

  constructor(
    private http: HttpClient,
    private auth: Auth,
  ) { }

  getListings(): Observable<Listing[]> {
    return this.http.get<Listing[]>('/api/listings');
  }

  getListingById(id: string): Observable<Listing> {
    return this.http.get<Listing>(`/api/listings/${id}`);
  }

  addViewToListing(id: string): Observable<Listing> {
    return this.http.post<Listing>(
      `/api/listings/${id}/add-view`,
      {},
      httpOptions,
    );
  }

  getListingsForUser(): Observable<Listing[]> {
      return new Observable<Listing[]>(observer => {
        const auth = getAuth();
        const user = auth.currentUser;
        const uid = user.uid;
        user && user.getIdToken().then(token => {
          if (user !== null && token) {
            this.http.get<Listing[]>(`/api/users/${uid}/listings`, httpOptionsWithAuthToken(token))
            .subscribe(listings => {
              observer.next(listings);
            });
          } else {
            observer.next([]);
          }
        })
      })
  }

  deleteListing(id: string): Observable<any> {
    return new Observable<any>(observer => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      user && user.getIdToken().then(token => {
        if (user !== null && token) {
          this.http.delete(`/api/listings/${id}`, httpOptionsWithAuthToken(token))
          .subscribe(() => observer.next());
        } else {
          observer.next();
        }
      })
    });
  }

  createListing(name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      user && user.getIdToken().then(token => {
        if (user !== null && token) {
          this.http.post<Listing>(
            '/api/listings',
            { name, description, price },
            httpOptionsWithAuthToken(token),
            ).subscribe(() => observer.next());
        } else {
          observer.next();
        }
      });
    }); 
  }

  editListing(id: string, name: string, description: string, price: number): Observable<Listing> {
    return new Observable<Listing>(observer => {
      const auth = getAuth();
      const user = auth.currentUser;
      const uid = user.uid;
      user && user.getIdToken().then(token => {
        if (user !== null && token) {
          this.http.post<Listing>(
            `/api/listings/${id}`,
            { name, description, price },
            httpOptionsWithAuthToken(token),
          ).subscribe(() => observer.next())
        } else {
          observer.next();
        }
      })
    });
  }
}
