require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const postRoutes = require("./routes/post-routes");
const authRoutes = require("./routes/auth-routes");
const genreRoutes = require("./routes/genre-routes");
const errorMiddleware = require("./middleware/error-middleware");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({ origin: ["http://localhost:3000", "http://localhost:3001"], credentials: true }));

app.use("/api/posts", postRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/genres", genreRoutes);

app.use(errorMiddleware); //должен быть в самом конце цепочки мидлваров

const startServer = (app, PORT) => {
	app.listen(PORT, err => {
		err ? console.log(err) : console.log(`Listening port ${PORT}`);
	});
};

//192.168.100.18

const start = (app, PORT, dbURL) => {
	mongoose
		.connect(dbURL)
		.then(() => {
			console.log("Connected to MongoDB");
			startServer(app, PORT);
		})
		.catch(error => {
			console.log(`DB connetction error: ${error}`);
		});
};

start(app, process.env.PORT, process.env.API_URL);
