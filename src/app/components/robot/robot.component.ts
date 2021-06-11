import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-robot',
  templateUrl: './robot.component.html',
  styleUrls: ['./robot.component.scss'],
})
export class RobotComponent implements OnInit {
  @ViewChild('robot', {static: true}) robotElement: ElementRef;
  @ViewChild('reportLog', {static: true}) reportLogElement: ElementRef;
  public x: number = 0;
  public y: number = 0;
  public f: string = 'north';
  public placed: boolean = false;
  private scale: number = 20;
  private total: number = this.scale * 4;
  private dir: string[] = ['north', 'west', 'east', 'south'];

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
    if(this.Board()) {
      switch(this.f) {
        case 'north':
          this.f = 'west';
          break;
        case 'west':
          this.f = 'south';
          break;
        case 'south':
          this.f = 'east';
          break;
        case 'east':
          this.f = 'north';
          break;
        default:
          break;
      }
      this.robotElement.nativeElement.className = this.f;
      this.clearReport();
    }
  }

  onTurnRight() {
    if(this.Board()) {
      switch(this.f) {
        case 'north':
          this.f = 'east';
          break;
        case 'west':
          this.f = 'north';
          break;
        case 'south':
          this.f = 'west';
          break;
        case 'east':
          this.f = 'south';
          break;
        default:
          break;
      }
      this.robotElement.nativeElement.className = this.f;
      this.clearReport();
    }
  }

  onMove() {
    if(this.Board()) {
      switch(this.f) {
        case 'north':
          if(this.y < 4) {
            this.y++;
            this.robotElement.nativeElement.style.top = (this.total - this.y * this.scale) + '%';
          }
          break;
        case 'south':
          if(this.y > 0) {
            this.y--;
            this.robotElement.nativeElement.style.top = (this.total - this.y * this.scale) + '%';
          }
          break;
        case 'east':
          if(this.x < 4) {
            this.x++;
            this.robotElement.nativeElement.style.left = this.x * this.scale + '%';
          }
          break;
        case 'west':
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

  Board() {
    if(this.dir.indexOf(this.f) === -1 || this.x < 0 || this.x > 4 || this.y < 0 || this.y > 4)
        return false;
    return true;
  }

  onReport() {
    this.reportLogElement.nativeElement.innerHTML = `Output: ${this.x}, ${this.y}, ${this.f.charAt(0).toUpperCase() + this.f.slice(1)}`;
  }

  clearReport() {
    this.reportLogElement.nativeElement.innerHTML = '';
  }
}
