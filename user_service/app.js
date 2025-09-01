require("dotenv").config();
const express = require("express");
const routes = require("./routes");

const app = express();

const PORT = process.env.PORT || 9000;

app.use(express.json());

app.use("/api/v1", routes);

app.listen(PORT, () => {
	console.log(`Server listening on ${PORT}`);
});
