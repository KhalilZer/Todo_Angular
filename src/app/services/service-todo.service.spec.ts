import { TestBed } from '@angular/core/testing';

import { ServiceTodoService } from './service-todo.service';

describe('ServiceTodoService', () => {
  let service: ServiceTodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceTodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
