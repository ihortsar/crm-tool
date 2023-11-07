import { Component } from '@angular/core';
import { User } from 'src/models/user.class';

@Component({
  selector: 'app-edit-adress',
  templateUrl: './edit-adress.component.html',
  styleUrls: ['./edit-adress.component.scss']
})
export class EditAdressComponent {
  user: User
  loading = false
  saveUser() {

  }
}
