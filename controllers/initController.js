const { feedDataFromExcel } = require("../services/initService");



const feedTables = async (req, res) => {
    try {
        await feedDataFromExcel();
        res.status(201).json({ success: true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send();
    }
}

module.exports = {
    feedTables
}