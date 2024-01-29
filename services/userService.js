const { Op } = require("sequelize");
const { User } = require("../db");

const findUsers = async ({ lastName, userName, gender, age }) => {
    try {
        const filterConditions = {};
        if (lastName) {
            filterConditions.lastName = {
                [Op.iLike]: `${lastName}%`,
            };
        }
        if (userName) {
            filterConditions.userName = {
                [Op.iLike]: `${userName}%`,
            };
        }
        if (gender) {
            filterConditions.gender = gender;
        }
        if (age) {
            filterConditions.age = {
                [Op.lt]: age,
            };
        }
        return await User.findAll({
            where: filterConditions,
        });
    } catch (error) {
        console.error('Error fetching users with filters:', error);
        throw new Error('Internal Server Error');
    }
};




module.exports = {
    findUsers
};