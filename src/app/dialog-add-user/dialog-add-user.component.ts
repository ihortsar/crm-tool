import { Component, OnInit, inject } from '@angular/core';
import { Firestore, addDoc, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
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

  users
  user = new User()
  firestore = inject(Firestore)

  saveUser() {

    this.user.birthDate = this.user.birthDate.getDate().toString() + "." +
      + this.user.birthDate.getMonth().toString() + "." +
      + this.user.birthDate.getFullYear().toString()


    this.addDocumentToCollection()
      .then(result => { console.log(result); })
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
    await addDoc(this.getReferenceForCollection(),
      this.user.toJSON()
    );
    return this.user.toJSON()
  }


  readSingleDocumentFromFirestore(docId) {
    return onSnapshot(this.getSingleReferenceForDocument(docId), (document: any) => {
      {
        this.users.firstName = document.data().firstName;
        this.users.lastName = document.data().lastName;
        this.users.birthDate = document.data().birthDate;
        this.users.street = document.data().street;
        this.users.ZIP = document.data().ZIP;
        this.users.city = document.data().city;

      }
    }
    )
  }


}

