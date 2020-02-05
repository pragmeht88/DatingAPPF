import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_model/message';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/User.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css']
})
export class MemberMessagesComponent implements OnInit {
  @Input() recipientId: number;
  messages: Message[];
  newMessage: any = {};

  constructor(private authService: AuthService, private userservice: UserService,
              private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMessages();
  }

  loadMessages() {
    // const currentuserid = +this.authService.decodedToken.nameid;
    this.userservice.
      getMessageThread(this.authService.decodedToken.nameid, this.recipientId)
      // .pipe(tap(messages => {
      //   for (let i = 0; messages.length; i++) {
      //     if (messages[i].isRead === false && messages[i].recipientId === currentuserid) {
      //       this.userservice.markAsRead(currentuserid, messages[i].id);
      //     }
      //   }
      // }))
      .subscribe(messages => {
        this.messages = messages;
      }, error => {
        this.alertify.error(error);
      });
  }

  sendMessage() {
    this.newMessage.recipientId = this.recipientId;
    this.userservice.sendMessage(this.authService.decodedToken.nameid,
      this.newMessage).subscribe((message: Message) => {
        this.messages.unshift(message);
        this.newMessage.content = '';
      }, error => {
        this.alertify.error(error);
      });
  }

}
