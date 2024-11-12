import {UserInterface} from "./UserInterface";

export class UserModel implements UserInterface{

    constructor( name: string = '', email: string = '', id: number = null) {
        this.name = name;
        this.email = email;
        this.id = id;
    }

    readonly id: number;
    name: string;
    email: string;

    public setName(name: string) {
        this.name = name;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getName() {
        return this.name;
    }

    public getEmail() {
        return this.email;
    }

    public getId() {
        return this.id;
    }
}