"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var album_service_1 = require("./album.service");
var AlbumsComponent = (function () {
    function AlbumsComponent(router, albumService) {
        this.router = router;
        this.albumService = albumService;
    }
    AlbumsComponent.prototype.getAlbums = function () {
        var _this = this;
        this.albumService.getAlbums().then(function (albums) { return _this.albums = albums; });
    };
    AlbumsComponent.prototype.ngOnInit = function () {
        this.getAlbums();
    };
    AlbumsComponent.prototype.onSelect = function (album) {
        this.selectedAlbum = album;
    };
    AlbumsComponent.prototype.gotoDetail = function () {
        this.router.navigate(['/detail', this.selectedAlbum.id]);
    };
    AlbumsComponent.prototype.add = function (name) {
        var _this = this;
        name = name.trim();
        if (!name) {
            return;
        }
        this.albumService.create(name)
            .then(function (album) {
            _this.albums.push(album);
            _this.selectedAlbum = null;
        });
    };
    AlbumsComponent.prototype.delete = function (album) {
        var _this = this;
        this.albumService
            .delete(album.id)
            .then(function () {
            _this.albums = _this.albums.filter(function (h) { return h !== album; });
            if (_this.selectedAlbum === album) {
                _this.selectedAlbum = null;
            }
        });
    };
    return AlbumsComponent;
}());
AlbumsComponent = __decorate([
    core_1.Component({
        selector: 'my-albums',
        templateUrl: './albums.component.html',
        styleUrls: ['./albums.component.css']
    }),
    __metadata("design:paramtypes", [router_1.Router,
        album_service_1.AlbumService])
], AlbumsComponent);
exports.AlbumsComponent = AlbumsComponent;
//# sourceMappingURL=albums.component.js.map