const axios = require("axios");
const User = require("../models/userModel");
const { sleep } = require("../utils/queue");
const config = require("../config/config");

const fetchUsersInBatches = async () => {
    const { size, requestsPerSecond, sleepTime } = config.batch;
    const { url, params } = config.api;
    const totalUsers = 5000;
    const requestsPerBatch = size / params.results;

    for (let i = 0; i < Math.ceil(totalUsers / size); i++) {
        const batchPromises = Array.from({ length: requestsPerBatch }).map(async () => {
            try {
                const response = await axios.get(url, { params });
                const users = response.data.results.map((user) => ({
                    id: user.login.uuid,
                    gender: user.gender,
                    name: { first: user.name.first, last: user.name.last },
                    address: {
                        city: user.location.city,
                        state: user.location.state,
                        country: user.location.country,
                        street: `${user.location.street.number} ${user.location.street.name}`,
                    },
                    email: user.email,
                    age: user.dob.age,
                    picture: user.picture.large,
                }));
                await User.insertMany(users, { ordered: false });
            } catch (err) {
                console.error("Error in batch processing:", err.message);
            }
        });

        await Promise.all(batchPromises);
        console.log(`Batch ${i + 1} processed`);
        if (i < Math.ceil(totalUsers / size) - 1) {
            await sleep(sleepTime);
        }
    }

    console.log("All users fetched and stored.");
};

module.exports = { fetchUsersInBatches };
