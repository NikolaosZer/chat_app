
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const calculateAge = (dateOfBirth) => {
        if (!dateOfBirth) return null;

        const today = new Date();
        const dateOfBirthDate = new Date(dateOfBirth);
        const age = today.getFullYear() - dateOfBirthDate.getFullYear();
        const isBirthdayPassed = today.getMonth() > dateOfBirthDate.getMonth() ||
            (today.getMonth() === dateOfBirthDate.getMonth() && today.getDate() >= dateOfBirthDate.getDate());

        return isBirthdayPassed ? age : age - 1;
    };

    const User = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'first_name'
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'last_name'
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            field: 'date_of_birth'
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            field: 'user_name'
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        underscored: true,
        timestamps: false,
        hooks: {
            beforeCreate: (user) => {
                user.age = calculateAge(user.dateOfBirth);
            }

        }, indexes: [
            {
                fields: ['user_name', 'last_name'],
            },
        ],

    });

    return User;
};