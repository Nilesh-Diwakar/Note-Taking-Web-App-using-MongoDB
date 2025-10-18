
const mongoose = require("mongoose");

require("dotenv").config();

const connectWithDb = () => {
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser : true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connection Successfull."))
    .catch((err) => {
        console.log("DB facing connnection issues.");
        console.error(err);
        process.exit(1);
    })
}

module.exports = connectWithDb;

