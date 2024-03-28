import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { User } from './user.model';
import { environment } from '../../environments/environment';
import { catchError, forkJoin, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private http = inject(HttpClient);

  public getUsers() {
    return this.http.get<User[]>(`${environment.urlApi}/users`)
    .pipe(
      switchMap(users => {

        const userImageRequests = users.map(user => this.getUserImage(user.id)
          pipe(
            catchError(() => of(null)),
            map(image => ({
              user, image
            })
          )
        )
       );        
       return forkJoin(userImageRequests);       
      })
    );
  }

  getUserImage(userId: string){
    return this.http.get(`${environment.urlApi}/users/${userId}/image`, { responseType: 'blob' });
  }
  
  uploadUserImage(userId: string, image: ArrayBuffer){
    const blobImage = new Blob([image]);
    const formData = new FormData();
    formData.append('file', blobImage);

    return this.http.put(`${environment.urlApi}/users/${userId}/image`, formData);
  }
}
