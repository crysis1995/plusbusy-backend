import { Test, TestingModule } from '@nestjs/testing';
import { CourseResourcesController } from './course-resources.controller';

describe('CourseResourcesController', () => {
  let controller: CourseResourcesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CourseResourcesController],
    }).compile();

    controller = module.get<CourseResourcesController>(CourseResourcesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
