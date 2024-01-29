const { DataTypes } = require('sequelize');


module.exports = (sequelize) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: DataTypes.TEXT,
        },
        senderId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'sender_id'
        },
        receiverId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'receiver_id'
        },
        seen: {
            type: DataTypes.BOOLEAN,
        },
        timestampSent: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            field: 'timestamp_sent'
        },
        chatId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: 'chat_id'
        },
    }, {
        underscored: true,
        timestamps: false
    });

    return Message
}
