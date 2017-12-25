import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from "@angular/http";
import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { PhotositeServiceService } from "./service/photosite-service.service";
import { GalleryPluginDirective } from './directive/gallery-plugin.directive'


@NgModule({
  declarations: [
    AppComponent,
    GalleryPluginDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    PhotositeServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
