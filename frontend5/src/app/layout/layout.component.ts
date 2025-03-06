import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { IUser } from '../shared/constants/user.constants';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  user: IUser | null = null;
  destroy$: Subject<boolean> = new Subject();

  constructor(private auth: AuthService) { }

  ngOnInit(): void {
    this.auth.user$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((user: IUser | null) => this.user = user);
  }

  onLogout() {
    this.auth.logout();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.complete();
  }

}
