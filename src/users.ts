export class User {

    constructor(
        public email: string,
        public name: string,
        private password: string
    ) { }

    matches(another: User): boolean {
        return another !== undefined && another.email === this.email && another.password === this.password;
    }

}

export const users: { [key: string]: User } = {
    'test@gmail.com': new User('test@gmail.com', 'Tester', '123456'),
    'admin@admin.com': new User('admin@admin.com', 'Admin', 'admin'),
}
