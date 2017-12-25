import { TestBed, inject } from '@angular/core/testing';

import { PhotositeServiceService } from './photosite-service.service';

describe('PhotositeServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PhotositeServiceService]
    });
  });

  it('should be created', inject([PhotositeServiceService], (service: PhotositeServiceService) => {
    expect(service).toBeTruthy();
  }));
});
