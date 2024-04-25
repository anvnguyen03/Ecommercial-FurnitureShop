export class User {
    id: number;
    fullname: string;
    email: string;
    password: string;

    constructor(id: number, fullname: string, email: string, password: string){
        this.id = id
        this.fullname = fullname
        this.email = email
        this.password = password
    }
}
