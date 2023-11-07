import { Component, Inject, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { Firestore, collection, doc, getDocs, onSnapshot, query } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  dialogOpen = false
  filteredUsers
  searchText
  constructor(public dialog: MatDialog) { this.updateUsers() }

  ngOnInit(): void {

  }

  searchUser(searchText) {
    this.allUsers.filter(user => {
      if (user.lastName.toLowerCase().includes(searchText)) {
        console.log('user is:', user);
      }


    })
  }



  firestore = inject(Firestore)

  public allUsers = [];


  /**name of component as parameter in dialog.open */
  openDialog(enterAnimationDuration: string): void {
    this.dialog.open(DialogAddUserComponent, {
      enterAnimationDuration,
    });
  }


  getSingleReferenceForDocument(docId) {
    return doc(this.getReferenceForCollection(), docId)
  }


  getReferenceForCollection() {
    return collection(this.firestore, 'users');
  }


  async getAllDocsOfCollection() {
    let users = await getDocs(collection(this.firestore, "users"));
    this.addUserToAllUsers(users)
  }


  updateUsers() {
    const unsubscribe = onSnapshot(this.getReferenceForCollection(), (snapshot) => {
      snapshot.docChanges().forEach((user) => {
        let userData = user.doc.data()
        userData['id'] = user.doc.id
        if (user.type === "added") {
          this.allUsers.push(userData);
        } else if (user.type === "removed") {
          this.allUsers.splice(1, +user.doc.id);
        }
      });
    })
  }


  addUserToAllUsers(users) {
    return users.forEach((user) => {
      this.allUsers.push(user.data())
    })
  }



}


