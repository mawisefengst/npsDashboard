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
var common_1 = require("@angular/common");
var album_1 = require("./album");
var album_service_1 = require("./album.service");
require("rxjs/add/operator/switchMap");
var AlbumDetailComponent = (function () {
    function AlbumDetailComponent(albumService, route, location) {
        this.albumService = albumService;
        this.route = route;
        this.location = location;
    }
    AlbumDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.paramMap
            .switchMap(function (params) { return _this.albumService.getAlbum(+params.get('id')); })
            .subscribe(function (album) { return _this.album = album; });
    };
    AlbumDetailComponent.prototype.goBack = function () {
        this.location.back();
    };
    AlbumDetailComponent.prototype.save = function () {
        var _this = this;
        this.albumService.update(this.album)
            .then(function () { return _this.goBack(); });
    };
    return AlbumDetailComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", album_1.Album)
], AlbumDetailComponent.prototype, "album", void 0);
AlbumDetailComponent = __decorate([
    core_1.Component({
        selector: 'album-detail',
        templateUrl: './album-detail.component.html',
        styleUrls: ['./album-detail.component.css']
    }),
    __metadata("design:paramtypes", [album_service_1.AlbumService,
        router_1.ActivatedRoute,
        common_1.Location])
], AlbumDetailComponent);
exports.AlbumDetailComponent = AlbumDetailComponent;
//# sourceMappingURL=album-detail.component.js.map