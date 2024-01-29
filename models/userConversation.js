const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const UserConversation = sequelize.define('UserConversation', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'user_id',
        },
        friendId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'friend_id',

        },
        lastMessageId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'last_message_id',
        },
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'chat_id',
        },
    }, {
        underscored: true,
        timestamps: false
    });

    return UserConversation;
};