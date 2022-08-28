import { Test, TestingModule } from '@nestjs/testing';
import { CourseResourcesService } from './course-resources.service';

describe('CourseResourcesService', () => {
  let service: CourseResourcesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CourseResourcesService],
    }).compile();

    service = module.get<CourseResourcesService>(CourseResourcesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
