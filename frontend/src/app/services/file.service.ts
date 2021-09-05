import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class FileService {

    url = 'http://localhost:8080/';
    headers;

    constructor(private httpClient: HttpClient) { }

    // handle response error
    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
            // Client-side errors
            errorMessage = `Error: ${error.error.message}`;
        } else {
            // Server-side errors
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        window.alert(errorMessage);
        return throwError(errorMessage);
    }

    // upload file
    uploadFile(file: any, headers: any): Observable<any> {
        console.log(file);
        return this.httpClient.post<any>(`${this.url}upload`, file, {
            headers,
            reportProgress: true,
            observe: 'events'
        }).pipe(catchError(this.handleError));
    }

    convertProcess(filename: string): Observable<any> {
        return this.httpClient.post<any>(`${this.url}convert`, { filename });
    }

}
