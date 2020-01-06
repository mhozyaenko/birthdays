import {Component, Input} from '@angular/core';
import {MonthModel} from '@models/month.model';
import {UserModel} from '@models/user.model';

/**
 * users list component
 */
@Component({
  selector: 'app-users-list',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  @Input()
  public currentMonth: MonthModel;

  /**
   * get sorted by date of birth users list
   */
  get sortedUsers(): UserModel[] {
    return this.currentMonth.users.sort((a: UserModel, b: UserModel) => {
      return new Date(a.dob).getTime() - new Date(b.dob).getTime();
    });
  }
}
