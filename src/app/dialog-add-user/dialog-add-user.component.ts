import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-dialog-add-user',
  templateUrl: './dialog-add-user.component.html',
  styleUrls: ['./dialog-add-user.component.scss']
})
export class DialogAddUserComponent implements OnInit {
  ngOnInit(): void {
    this.getReferenceForCollection()
  }
  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }
  users
  user = new User()
  firestore = inject(Firestore)
  loading = false

  saveUser() {

    this.user.birthDate = this.user.birthDate.getDate().toString() + "." +
      + this.user.birthDate.getMonth().toString() + "." +
      + this.user.birthDate.getFullYear().toString()

    this.addDocumentToCollection()
      .then(() => {
        setTimeout(() => {
          this.dialogRef.close();
        }, 1000);
        
      })
      .catch(error => {
        console.error(error);
      });
  }

  getReferenceForCollection() {
    return collection(this.firestore, 'users');
  }


  getSingleReferenceForDocument(docId) {
    return doc(this.getReferenceForCollection(), docId)
  }


  async addDocumentToCollection() {
    this.loading = true
    await addDoc(this.getReferenceForCollection(),
      this.user.toJSON()
    );
    this.loading = true
  }

}

