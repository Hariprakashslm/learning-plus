const db = require("mongoose");

// db.connect(
//   `mongodb://${process.env.MONGO_DB_USER_NAME}:${process.env.MONGO_DB_PASSWORD}@localhost:${process.env.MONGO_DB_PORT}/`
// )
//   .then(() => console.log(`MongoDB connected successfully.`))
//   .catch(() => console.error(`Error in mongodb connection`));

db.connect(`mongodb://localhost:27017/data`)
  .then(() => console.log(`MongoDB connected successfully.`))
  .catch(() => console.error(`Error in mongodb connection`));
