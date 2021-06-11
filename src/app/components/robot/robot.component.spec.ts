import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RobotComponent } from './robot.component';

describe('RobotComponent', () => {
  let component: RobotComponent;
  let fixture: ComponentFixture<RobotComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RobotComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RobotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Output: 0, 1, North', () => {
    component.x = 0;
    component.y = 0;
    component.f = 'north';
    component.onPlaceRobot();
    component.onMove();
    component.onReport();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#reportLog').textContent).toBe('Output: 0, 1, North');
  });

  it('Output: 0, 0, West', () => {
    component.x = 0;
    component.y = 0;
    component.f = 'north';
    component.onPlaceRobot();
    component.onTurnLeft();
    component.onReport();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#reportLog').textContent).toBe('Output: 0, 0, West');
  });

  it('Output: 3, 3, North', () => {
    component.x = 1;
    component.y = 2;
    component.f = 'east';
    component.onPlaceRobot();
    component.onMove();
    component.onMove();
    component.onTurnLeft();
    component.onMove();
    component.onReport();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#reportLog').textContent).toBe('Output: 3, 3, North');
  });
});
