import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
// import { HttpClientModule } from '@angular/common/http';
// import { CarouselModule } from 'ngx-owl-carousel-o';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
