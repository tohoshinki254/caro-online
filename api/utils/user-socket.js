const moment = require('moment');

const users = [];

const userJoin = (id, username, room) => {
    const user = { id, username, room };
    users.push(user);
    return user;
};

const getCurrentUser = (id) => {
    return users.find(user => user.id === id);
};

const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const formatMessage = (username, text) => {
    return {
        username,
        text,
        time: moment().format('h:mm a')
    };
};

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    formatMessage
};