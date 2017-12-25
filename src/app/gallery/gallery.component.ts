import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { PhotositeServiceService } from "../service/photosite-service.service";
import { Router } from '@angular/router';
declare var jQuery: any;

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit,AfterViewInit {
  galleryId: string;
  allData : any;
  showList: boolean;
  hostUri:string;
  currentGalleryName : string;
  currentGalleryNameDisplay : string;
  currentList: string;
  currentListDisplay:string;
  loading : boolean;

  constructor(private activatedRoute: ActivatedRoute,private photoService: PhotositeServiceService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("sssi-photosite-email")== null){
      this.router.navigate(['login']);
    }else{
        this.loading = true;
        this.showList = true;
        this.activatedRoute.params.subscribe(params => {
          this.galleryId = params["galleryId"];
          this.photoService.getSingleAlbumByName(this.galleryId).subscribe(data => {
              this.allData = data;
              this.currentList = '';
              this.currentGalleryName ="sssi-photosite-landing-const";
              this.currentListDisplay = "";
              this.loading = false;
          });
        });
        this.hostUri = window.location.href;
    }    
  }

  ngAfterViewInit(){}

  backToList(){
    debugger;
    if(this.currentGalleryName === "sssi-photosite-landing-const" && this.currentList != ""){
      this.currentList = "";
    }else{
      this.currentGalleryName ="sssi-photosite-landing-const";
      this.currentList = this.currentListDisplay;
    }
  }

  onKeyLinks(dirName){
    this.currentList = dirName;
    this.currentListDisplay = dirName;
  }

  onKey(dirName,folderName){
    this.currentList = '';
    this.currentGalleryName = dirName;
    this.currentGalleryNameDisplay = folderName;
  }

}
