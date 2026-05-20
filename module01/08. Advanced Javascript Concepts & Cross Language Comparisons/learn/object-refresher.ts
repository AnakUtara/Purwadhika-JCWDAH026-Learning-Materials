interface IUser {
	id: number;
	email: string;
	password: string;
}

const user1: IUser = {
	id: 1,
	email: "user1@example.com",
	password: "password123",
};

type UserTable = {
	data: IUser[];
};

const userTable: UserTable = {
	data: [],
};

function register(user: IUser): void {
	userTable.data = [...userTable.data, user];
}

console.log("Before registration:", userTable.data);
register(user1);
register({
	id: 2,
	email: "yulius@mail.com",
	password: "yulius123",
});
console.log("After registration:", userTable.data);
