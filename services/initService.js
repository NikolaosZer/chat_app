const { Op } = require("sequelize");
const { sequelize, User, Message, Chat, UserConversation } = require("../db");
const xlsx = require('xlsx');

async function seedUsers(userRows) {
    try {
        for (const row of userRows) {
            const [id, firstName, lastName, dateOfBirth, gender, userName] = row;
            await User.create({
                id: parseInt(id),
                firstName: firstName,
                lastName: lastName,
                dateOfBirth: new Date(dateOfBirth),
                gender,
                userName,
            });
        }
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function seedMessages(messageRows) {
    try {
        for (const row of messageRows) {
            const [id, content, senderId, receiverId, seen, timestampSent] = row;
            const chatName = `user${Math.min(senderId, receiverId)}_user${Math.max(senderId, receiverId)}`;
            // Using async/await
            try {
                const [chat] = await Chat.findOrCreate({
                    where: { name: chatName }
                });

                if (chat) {
                    const message = await Message.create({
                        id: parseInt(id),
                        content,
                        senderId: parseInt(senderId),
                        receiverId: parseInt(receiverId),
                        seen: seen === 'TRUE',
                        timestampSent: timestampSent,
                        chatId: chat.id
                    });
                    if (message) {
                        const [userConversation, created] = await UserConversation.findOrCreate({
                            where: {
                                [Op.or]: [
                                    {
                                        userId: message.senderId,
                                        friendId: message.receiverId,
                                    },
                                    {
                                        userId: message.receiverId,
                                        friendId: message.senderId,
                                    },
                                ],
                            },
                            defaults: {
                                lastMessageId: message.id,
                                chatId: chat.id,
                                userId: message.senderId,
                                friendId: message.receiverId
                            },
                        });

                        if (!created) {
                            const existingMessage = await Message.findByPk(userConversation.lastMessageId);
                            if (existingMessage && existingMessage.timestampSent < message.timestampSent) {
                                await userConversation.update({
                                    lastMessageId: message.id,
                                    chatId: chat.id,
                                });
                            }
                        }
                    }
                }

            } catch (error) {
                console.error('Error inserting or finding chat:', error);
            }
        }
    } catch (error) {
        console.error('Error seeding messages:', error);
        throw error;
    }
}

async function parseExcelData(filePath) {
    try {
        const workbook = xlsx.readFile(filePath);
        const userSheet = workbook.Sheets['users'];
        const messageSheet = workbook.Sheets['messages'];
        const userData = xlsx.utils.sheet_to_json(userSheet, { header: 1, raw: false });
        const messageData = xlsx.utils.sheet_to_json(messageSheet, { header: 1, raw: false });

        const filteredUserRows = userData
            .filter(row =>
                row[0] !== undefined &&
                row[1] !== undefined &&
                row[2] !== undefined &&
                row[3] !== undefined &&
                row[4] !== undefined &&
                row[5] !== undefined
            );

        const filteredMessageRows = messageData
            .filter(row =>
                row[0] !== undefined &&
                row[1] !== undefined &&
                row[2] !== undefined &&
                row[3] !== undefined &&
                row[4] !== undefined &&
                row[5] !== undefined
            );

        await seedUsers(filteredUserRows);
        await seedMessages(filteredMessageRows);

    } catch (error) {
        console.log(error);
        throw new Error('Cannot read excel file');
    }

}

const feedDataFromExcel = async () => {
    try {
        await sequelize.sync({ force: true });
        await parseExcelData('./seeds.xlsx');
    } catch (error) {
        console.log(error);
        throw new Error('Cannot read excel file');
    }
}

module.exports = {
    feedDataFromExcel
}

