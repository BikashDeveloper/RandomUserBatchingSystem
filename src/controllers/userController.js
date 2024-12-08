const User = require("../models/userModel");

const getUsers = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort = "createdAt", search = "{}" } = req.query;
        const searchCriteria = JSON.parse(search);
        const total = await User.countDocuments(searchCriteria);
        const users = await User.find(searchCriteria)
            .sort({ [sort]: 1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        res.json({
            total,
            limit: parseInt(limit),
            page: parseInt(page),
            sortBy: sort,
            items: users,
        });
    } catch (err) {
        res.status(500).json({ error: "Internal server error", details: err.message });
    }
};

module.exports = { getUsers };
