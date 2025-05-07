const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT

app.listen(PORT, () => console.log(`Server listening at Port: ${PORT}`));
