import { Component, OnInit } from '@angular/core';
import { Message } from '../_model/message';
import { Pagination, PaginatedResult } from '../_model/Pagination';
import { UserService } from '../_services/User.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../_services/auth.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  messageContainer = 'Unread';

  constructor(private authService: AuthService, private userservice: UserService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    this.loadMessages();
  }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.messages = data['messages'].result;
      this.pagination = data['messages'].pagination;
    });
  }

  loadMessages() {
    this.userservice.
      getMessages(this.authService.decodedToken.nameid,
        this.pagination.currentPage,
        this.pagination.itemsPerPage, this.messageContainer).
      subscribe((response: PaginatedResult<Message[]>) => {
        this.messages = response.result;
        this.pagination = response.pagination;
      }, error => {
        this.alertify.error(error);
      });
  }

  deleteMessage(id: number) {
    this.alertify.confirm('are you sure you want to delete this message', () => {
      this.userservice.deleteMessage(id, this.authService.decodedToken.nameid)
        .subscribe(() => {
          this.messages.splice(this.messages.findIndex(m => m.id === id), 1);
          this.alertify.success('message has been deleted');
        }, error => {
          this.alertify.error('Failed to delete message');
        });
    });
  }
}
