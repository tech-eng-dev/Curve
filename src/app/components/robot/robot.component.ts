import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Direction } from '../../enums/direction.enum';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss'],
})
export class RobotComponent implements OnInit {
  @ViewChild('robot', {static: true}) robotElement: ElementRef;
  @ViewChild('reportLog', {static: true}) reportLogElement: ElementRef;
  DirectionEnum = Direction;
  public x: number = 0;
  public y: number = 0;
  public f: string = this.DirectionEnum.N;
  public placed: boolean = false;
  private scale: number = 20;
  private total: number = this.scale * 4;
  private dir: string[] = [this.DirectionEnum.N, this.DirectionEnum.S, this.DirectionEnum.E, this.DirectionEnum.W];

  constructor() { }

  ngOnInit() {}

  onPlaceRobot() {
    this.robotElement.nativeElement.style.display = 'block';
    this.robotElement.nativeElement.style.left = this.x * this.scale + '%';
    this.robotElement.nativeElement.style.top = (this.total - this.y * this.scale) + '%';
    this.robotElement.nativeElement.className = this.f;
    this.placed = true;
  }

  onTurnLeft() {
    if(this.validate()) {
      switch(this.f) {
        case this.DirectionEnum.N:
          this.f = this.DirectionEnum.W;
          break;
        case this.DirectionEnum.W:
          this.f = this.DirectionEnum.S;
          break;
        case this.DirectionEnum.S:
          this.f = this.DirectionEnum.E;
          break;
        case this.DirectionEnum.E:
          this.f = this.DirectionEnum.N;
          break;
        default:
          break;
      }
      this.robotElement.nativeElement.className = this.f;
      this.clearReport();
    }
  }

  onTurnRight() {
    if(this.validate()) {
      switch(this.f) {
        case this.DirectionEnum.N:
          this.f = this.DirectionEnum.E;
          break;
        case this.DirectionEnum.W:
          this.f = this.DirectionEnum.N;
          break;
        case this.DirectionEnum.S:
          this.f = this.DirectionEnum.W;
          break;
        case this.DirectionEnum.E:
          this.f = this.DirectionEnum.S;
          break;
        default:
          break;
      }
      this.robotElement.nativeElement.className = this.f;
      this.clearReport();
    }
  }

  onMove() {
    if(this.validate()) {
      switch(this.f) {
        case this.DirectionEnum.N:
          if(this.y < 4) {
            this.y++;
            this.robotElement.nativeElement.style.top = (this.total - this.y * this.scale) + '%';
          }
          break;
        case this.DirectionEnum.S:
          if(this.y > 0) {
            this.y--;
            this.robotElement.nativeElement.style.top = (this.total - this.y * this.scale) + '%';
          }
          break;
        case this.DirectionEnum.E:
          if(this.x < 4) {
            this.x++;
            this.robotElement.nativeElement.style.left = this.x * this.scale + '%';
          }
          break;
        case this.DirectionEnum.W:
          if(this.x > 0) {
            this.x--;
            this.robotElement.nativeElement.style.left = this.x * this.scale + '%';
          }
          break;
        default:
          break;
      }
      this.clearReport();
    }
  }

  validate() {
    if(this.dir.indexOf(this.f) === -1 || this.x < 0 || this.x > 4 || this.y < 0 || this.y > 4)
      return false;
    return true;
  }

  onReport() {
    this.reportLogElement.nativeElement.innerHTML = `Output: ${this.x}, ${this.y}, ${this.f}`;
  }

  clearReport() {
    this.reportLogElement.nativeElement.innerHTML = '';
  }
}
