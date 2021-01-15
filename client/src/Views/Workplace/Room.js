export default class Room {
    constructor(users = []) {
        this.users = users;
    }

    join(user) {
        this.users.push(user);
    }

    leave(user) {
        const index = this.users.indexOf(user);
        if (index === -1) return;
        this.users.splice(index, 1);
    }

    find(id) {
        return this.users.filter((user) => user.id === id);
    }
}