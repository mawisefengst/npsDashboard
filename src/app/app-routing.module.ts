import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";
import {LoginFormComponent} from "./login-form/login-form.component";
import {FolderListComponent} from "./folder-list/folder-list.component";
import {GalleryComponent} from "./gallery/gallery.component";

const appRoutes: Routes = [
  	{path: "", redirectTo: "login", pathMatch: "full"},
	{path: 'login', component: LoginFormComponent},
	{path: 'folders', component: FolderListComponent},
	{path: 'gallery/:galleryId', component: GalleryComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule{

}