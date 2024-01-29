const initUsersApi = async () => {
    try {
        const response = await fetch('http://localhost:3000/api/v1/init', {
            method: 'POST',
        });
        if (!response.ok) {
            throw new Error('Error loading users');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};


const getUsersApi = async ({ userName, lastName, gender, age }) => {
    const url = `http://localhost:3000/api/v1/users?userName=${userName}&lastName=${lastName}&gender=${gender}&age=${age}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching users');
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getUserChats = async (userId) => {
    const url = `http://localhost:3000/api/v1/messages/${userId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching user chats');
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};

const getMessages = async (userId, friendId) => {
    const url = `http://localhost:3000/api/v1/messages/${userId}/${friendId}`;
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching messaged between users');
        }
        return await response.json();
    } catch (error) {
        console.log(error);
        throw new Error(error.message);
    }
};



export const services = {
    initUsersApi,
    getUsersApi,
    getUserChats,
    getMessages
}