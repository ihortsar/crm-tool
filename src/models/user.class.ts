
export class User {

    firstName: string;
    lastName: string;
    birthDate;
    street;
    ZIP;
    city

    toJSON() {
        return {
            firstName: this.firstName,
            lastName: this.lastName,
            birthDate: this.birthDate,
            street: this.street,
            ZIP: this.ZIP,
            city: this.city
        }
    }
}