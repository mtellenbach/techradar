import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
  });

  it('should be created', () => {
    // @ts-ignore
      expect(service).toBeTruthy();
  });

  it('should parse role sysadmin', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI3MjAzOTBmYS00MzVlLTQ0N2EtOGFjZC00MTY0ODhlNDVmNTIiLCJyb2xlIjoic3lzYWRtaW4iLCJvcmdhbmlzYXRpb25faWQiOiIxIiwiaWF0IjoxNzA4OTUyNzY0LCJleHAiOjE3MDg5NTYzNjR9.aXt9pHzBIGirMhxi4qPbWbRcbIylsdIwyz8vYfkK09Y";
    const contents = service.parseToken(token);
    // @ts-ignore
      expect(contents.role).toBe('sysadmin');
  })
});
