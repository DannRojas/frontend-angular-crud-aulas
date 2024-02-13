import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFromTemplateComponent } from './dialog-from-template.component';

describe('DialogFromTemplateComponent', () => {
  let component: DialogFromTemplateComponent;
  let fixture: ComponentFixture<DialogFromTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogFromTemplateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogFromTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
