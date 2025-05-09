const connectDB = require("./config/dbConfig");
const app = require("./app");
require("dotenv").config();

const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));
