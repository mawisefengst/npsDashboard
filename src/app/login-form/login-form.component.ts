import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from "@angular/forms";
import { PhotositeServiceService } from "../service/photosite-service.service"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  providers: [PhotositeServiceService]
})
export class LoginFormComponent implements OnInit {
  @ViewChild("f") signUpForm: NgForm;
  serverMessage: string;

  constructor(private photoService: PhotositeServiceService, private router: Router) { }

  ngOnInit() {
    if(localStorage.getItem("sssi-photosite-email") != null){
      this.router.navigate(['folders']);
    }
  }

  /*onSubmit(form: NgForm){
  	console.log(form);
  }*/

  onSubmit(){
  	this.photoService.postLoginForm(this.signUpForm.value).subscribe(data => {
      if(data.status == "1"){
        localStorage.setItem('sssi-photosite-email', this.signUpForm.value.email);
        this.router.navigate(['folders']);
      }else{
         this.serverMessage = data.message;
      }
  	});
  }

}
