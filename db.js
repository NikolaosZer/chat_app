const { Sequelize } = require('sequelize');
const config = require('./config');

const sequelize = new Sequelize(config.development);

const userModel = require('./models/user')(sequelize);
const chatModel = require('./models/chat')(sequelize);
const messageModel = require('./models/message')(sequelize);
const userConversationModel = require('./models/userConversation')(sequelize);

messageModel.belongsTo(userModel, { as: 'sender', foreignKey: 'sender_id' });
messageModel.belongsTo(userModel, { as: 'receiver', foreignKey: 'receiver_id' });
messageModel.belongsTo(chatModel, { foreignKey: 'chat_id', as: 'chat' });
userConversationModel.belongsTo(userModel, { as: 'user', foreignKey: 'user_id' });
userConversationModel.belongsTo(userModel, { as: 'friend', foreignKey: 'friend_id' });
userConversationModel.belongsTo(messageModel, { as: 'lastMessage', foreignKey: 'last_message_id' });
userConversationModel.belongsTo(chatModel, { foreignKey: 'chat_id' });

module.exports = {
    sequelize,
    User: userModel,
    Chat: chatModel,
    Message: messageModel,
    UserConversation: userConversationModel,
};
