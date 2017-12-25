import { Component, OnInit } from '@angular/core';
import { PhotositeServiceService } from "../service/photosite-service.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-folder-list',
  templateUrl: './folder-list.component.html',
  styleUrls: ['./folder-list.component.css'],
  providers: [PhotositeServiceService]
})
export class FolderListComponent implements OnInit {
  folders: any;
  loading : boolean;
  constructor(private photoService: PhotositeServiceService, private router: Router) {

  }

  ngOnInit() {
    this.loading = true;
    if(localStorage.getItem("sssi-photosite-email") == null){
      this.router.navigate(['login']);
    }else{
      this.photoService.getAlbumsList().subscribe(data => {
        this.folders = data;
        this.loading = false;
      });
    }
  }

}
