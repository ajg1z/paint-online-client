import { makeAutoObservable } from 'mobx';
import { User } from './User.types';

export class UserStore {
    user: User | null = null;

    constructor() {
        makeAutoObservable(this);
    }

    setUser(user: User) {
        this.user = user;
    }
}
