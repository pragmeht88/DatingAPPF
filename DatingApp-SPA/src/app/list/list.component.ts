import { Component, OnInit } from '@angular/core';
import { Pagination, PaginatedResult } from '../_model/Pagination';
import { User } from '../_model/user';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  pagination: Pagination;
  users: User[];
  likesParam: string;

  constructor(private authService: AuthService,
              private userService: UserService,
              private alertifyService: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'].result;
      this.pagination = data['users'].pagination;
    });

    this.likesParam = 'Likers';
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadUsers();
  }

  loadUsers() {
    this.userService.
      getUsers(this.pagination.currentPage, this.pagination.itemsPerPage, null, this.likesParam).
      subscribe((response: PaginatedResult<User[]>) => {
        this.users = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertifyService.error(error);
      });
  }

}
