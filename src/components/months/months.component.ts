import {Component, OnInit} from '@angular/core';
import {UserModel} from '@models/user.model';
import {MonthModel} from '@models/month.model';
import {UserService} from '@services/user.service';
import * as moment from 'moment';

/**
 * numbers of users
 */
enum ENDPOINTS {
  zero = 0,
  firstPoint = 3,
  secondPoint = 7,
  thirdPoint = 11
}

/**
 * months list component
 */
@Component({
  selector: 'app-months-list',
  templateUrl: './months.component.html',
  styleUrls: ['./months.component.scss']
})
export class MonthsComponent implements OnInit {
  /**
   * months list
   */
  public monthsList: MonthModel[] = [];

  /**
   * show/hide users list
   */
  public showUsers: boolean;

  /**
   * current month to show
   */
  public currentMonth: MonthModel = null;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.createMonthsList();
    this.getUsers();
  }

  /**
   * get users list request, create months list
   */
  private getUsers(): void {
    this.userService.getUsers().subscribe(response => {
      response.body.map((item: UserModel) => {
        this.monthsList[moment(item.dob).month()].users.push(item);
      });
    });
  }

  /**
   * get list of months from moment.js library
   */
  private createMonthsList(): void {
    moment.months().map(item => {
      this.monthsList.push({
        name: item,
        users: []
      });
    });
  }

  /**
   * get classname for month tile background
   * @param count - number of users
   */
  public getCountStyle(count: number): string {
    if (count >= ENDPOINTS.zero && count < ENDPOINTS.firstPoint) {
      return 'level-0';
    }
    if (count >= ENDPOINTS.firstPoint && count < ENDPOINTS.secondPoint) {
      return 'level-1';
    }
    if (count >= ENDPOINTS.secondPoint && count < ENDPOINTS.thirdPoint) {
      return 'level-2';
    }

    return 'level-3';
  }

  /**
   * show users list
   * @param index - index of selected month
   */
  public showUsersList(index: number): void {
    this.showUsers = true;
    this.currentMonth = this.monthsList[index];
  }

  /**
   * hide users list
   */
  public hideUsersList(): void {
    this.showUsers = false;
    this.currentMonth = null;
  }
}
