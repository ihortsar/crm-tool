
export class User {

    firstName: string;
    lastName: string;
    birthDate;
    email;
    street;
    ZIP;
    city;


    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            email:this.email,
            street: this.street,
            ZIP: this.ZIP,
            city: this.city
        }
    }
}