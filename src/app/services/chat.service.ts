import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../services/auth.service';
import * as firebase from 'firebase/app';

import { ChatMessage } from '../models/chat-message.model';

@Injectable()
export class ChatService {
  user: firebase.User;
  chatMessages: AngularFireList<ChatMessage>;
  chatMessage: ChatMessage;
  userName: string;

  constructor(
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth
    ) {
        // this.afAuth.authState.subscribe(auth => {
        //   if (auth !== undefined && auth !== null) {
        //     this.user = auth;
        //   }

        //   this.getUser().valueChanges().subscribe((a: any) => {
        //     this.userName = a.displayName;
        //   });
        // });
    }

  // getUser() {
  //   const userId = this.user.uid;
  //   const path = `/users/${userId}`;
  //   return this.db.object(path);
  // }

  // getUsers() {
  //   const path = '/users';
  //   return this.db.list(path);
  // }

  sendMessage(msg: string) {
    const timestamp = this.getTimeStamp();
    // const email = this.user.email;
    const email = "AVS";
    this.chatMessages = this.getMessages();
    this.chatMessages.push({
      message: msg,
      timeSent: timestamp,
      // userName: this.userName,
      userName: "Hello",
      email: email });
      console.log('GEt Send message');
  }

  getMessages():AngularFireList<ChatMessage> {
    console.log('Calling get messages');
    return this.db.list('messages', ref => {
      return ref.limitToLast(25).orderByKey();
    });
 }

  getTimeStamp(): Date {
    const now = new Date();
    const date = now.getUTCFullYear() + '/' +
                 (now.getUTCMonth() + 1) + '/' +
                 now.getUTCDate();
    const time = now.getUTCHours() + ':' +
                 now.getUTCMinutes() + ':' +
                 now.getUTCSeconds();

    return now;
  }
}
