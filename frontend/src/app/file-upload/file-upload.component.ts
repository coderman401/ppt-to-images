import { Component, ViewChild } from '@angular/core';
import { FileService } from '../services/file.service';
import { Subject, Subscription } from 'rxjs';
import { HttpEventType, HttpEvent } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SwiperOptions } from 'swiper';

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

    @ViewChild('fileInputRead', { static: true }) fileInputRead: { nativeElement: { [x: string]: File; click?: any; }; };

    file: File | null = null;
    name = '';
    progress = 0;
    state = false;
    converting = false;
    slideshow = false;
    slideShowUrl = 'http://localhost:8080/slideshows/';
    images = [];

    subscribe$: Subscription;
    config: SwiperOptions = {
        a11y: { enabled: true },
        direction: 'horizontal',
        slidesPerView: 1,
        keyboard: true,
        mousewheel: true,
        scrollbar: false,
        navigation: true,
        pagination: false
    };


    constructor(private fileService: FileService, private snackBar: MatSnackBar) { }

    onClickFileInputButton(): void {
        this.fileInputRead.nativeElement.click();
    }

    // select file to upload
    onChangeFileInput(): void {
        const files: { [key: string]: File } = this.fileInputRead.nativeElement;
        this.file = files.files[0];
        this.name = this.file?.name;
        this.processUploading();
    }

    // start uploading progress
    processUploading() {
        const headersData = {
            size: this.file.size.toString(),
            name: this.name
        };
        this.subscribe$ = this.fileService.uploadFile(this.file, headersData).subscribe((event: HttpEvent<any>) => {
            this.images = [];
            switch (event.type) {
                case HttpEventType.Sent:
                    this.state = true;
                    break;
                case HttpEventType.UploadProgress:
                    const total = event.total;
                    const loaded = event.loaded;

                    this.progress = Math.round(loaded / total * 100);
                    if (this.progress === 100) {
                        this.showSnakbar('File uploaded successfully!');
                    }
                    break;
                case HttpEventType.Response:
                    if (event.body.status) {
                        if (event.body.file) {
                            this.converting = true;
                            this.convertCall(event.body.file);
                        }
                    }
                    this.resetFileProgress();
            }
        });
    }

    cancelFile() {
        this.subscribe$.unsubscribe();
        this.resetFileProgress();
    }

    resetFileProgress() {
        this.progress = 0;
        this.state = false;
        this.file = null;
    }

    convertCall(filename: string) {
        this.fileService.convertProcess(filename).subscribe((response) => {
            if (response.status) {
                console.log(response);
                this.images = response.images;
            }
            this.converting = false;
            this.slideshow = true;
        });
    }

    showSnakbar(message: string) {
        this.snackBar.open(message, 'OK', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
    }


}

