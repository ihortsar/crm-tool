import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Firestore, collection, doc, onSnapshot, updateDoc } from '@angular/fire/firestore';
import { EditNameComponent } from '../edit-name/edit-name.component';
import { MatDialog } from '@angular/material/dialog';
import { EditAdressComponent } from '../edit-adress/edit-adress.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { initializeApp } from '@angular/fire/app';
import { environment } from 'src/environments/environment';



@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {

  }
  public userId: string;
  currentUser;
  firestore = inject(Firestore)
  changePic = false
  profilePicSelected = false
  app = initializeApp(environment.firebase);
  storage = getStorage();
  selectedFile: any = null;
  imagesRef
  profilePic



  ngOnInit() {
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getCurrentUser()

  }

  getCurrentUser() {
    onSnapshot(doc(this.getReferenceForCollection(), this.userId), (doc) => {
      this.currentUser = doc.data()

    })
  }



  getSingleReferenceForDocument(docId) {
    return doc(this.getReferenceForCollection(), docId)

  }


  getReferenceForCollection() {
    return collection(this.firestore, 'users');
  }


  openEditName(enterAnimationDuration: string): void {
    this.dialog.open(EditNameComponent, {
      enterAnimationDuration,
    });
  }


  openEditAdress(enterAnimationDuration: string): void {
    const dialog = this.dialog.open(EditAdressComponent, {
      enterAnimationDuration,
    });
    dialog.componentInstance.user = this.currentUser
  }



  async onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] ?? null;
    console.log('this.selectedFile:', this.selectedFile);
    this.profilePicSelected = true;

    await this.saveProfilePic();
    await this.updatePic();
  }

  openAddPic() {
    this.changePic = true;
  }

  async saveProfilePic() {
    this.imagesRef = ref(this.storage, '/images/' + this.currentUser.email);
    await uploadBytes(this.imagesRef, this.selectedFile);
  }

  async retrieveImage() {
    let url = await getDownloadURL(this.imagesRef);
    return url
  }

  async updatePic() {
    this.profilePic = await this.retrieveImage();
    await updateDoc(this.getSingleReferenceForDocument(this.userId), {
      profilePic: this.profilePic
    });
  }


  removeProfilePic() {

  }

}
