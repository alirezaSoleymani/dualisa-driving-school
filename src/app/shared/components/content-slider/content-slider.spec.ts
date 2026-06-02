import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentSlider } from './content-slider';

describe('ContentSlider', () => {
  let component: ContentSlider;
  let fixture: ComponentFixture<ContentSlider>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContentSlider]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContentSlider);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
