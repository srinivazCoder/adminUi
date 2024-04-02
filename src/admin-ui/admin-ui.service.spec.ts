import { TestBed } from '@angular/core/testing';

import { AdminUiService } from './admin-ui.service';

describe('AdminUiService', () => {
  let service: AdminUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
