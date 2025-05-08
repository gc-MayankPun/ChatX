const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConfig");
dotenv.config();

const PORT = process.env.PORT;

connectDB();
app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));
