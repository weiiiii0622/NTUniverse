const makeName = (user1: string, user2: string) => (
	user1 < user2
		? `${user1}_${user2}`
		: `${user2}_${user1}`
);

export default makeName;