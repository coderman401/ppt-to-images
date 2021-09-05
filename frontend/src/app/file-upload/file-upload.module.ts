// modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadRoutingModule } from './file-upload-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../shared/material.module';
import { SwiperModule } from 'ngx-swiper-wrapper';
import { SWIPER_CONFIG } from 'ngx-swiper-wrapper';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

// service
import { FileService } from '../services/file.service';

// component
import { FileUploadComponent } from './file-upload.component';

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
    direction: 'horizontal',
    slidesPerView: 'auto'
};

@NgModule({
    declarations: [
        FileUploadComponent
    ],
    imports: [
        CommonModule,
        FileUploadRoutingModule,
        HttpClientModule,
        MaterialModule,
        SwiperModule
    ],
    providers: [
        {
            provide: SWIPER_CONFIG,
            useValue: DEFAULT_SWIPER_CONFIG
        },
        FileService
    ]
})
export class FileUploadModule { }
