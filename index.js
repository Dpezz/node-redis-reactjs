const express = require("express");
const session = require("express-session");
const redis = require("redis");
const redisClient = redis.createClient();
const redisStore = require("connect-redis")(session);
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const bcrypt = require("bcrypt");
const { default: Axios } = require("axios");

const app = express();

// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve the static files from the React app
app.use(express.static(path.join(__dirname, "./views/build")));

redisClient.on("error", (err) => {
	console.log("Redis error: ", err);
});

app.use(
	session({
		secret: "ThisIsHowYouUseRedisSessionStorage",
		name: "_redisPractice",
		resave: false,
		saveUninitialized: false,
		cookie: { maxAge: 1000 * 60 * 2, secure: false },
		store: new redisStore({
			host: "localhost",
			port: 6379,
			client: redisClient,
			ttl: 120,
		}),
	})
);

const auth = (req, res, next) => {
	if (req.session.key) {
		next();
	} else {
		res.status(403).send({
			message: "Not session provided.",
		});
	}
};

app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "views/build", "index.html"));
});

app.get("/api/", (req, res) => {
	res.send({ message: "welcome to API", data: req.session });
});

app.post("/api/login", (req, res) => {
	const userId = `user:${req.body.user}`;

	redisClient.hexists(userId, "password", (err, value) => {
		if (err) {
			res.send(err);
		} else {
			if (value) {
				redisClient.hget(userId, "password", (err, hash) => {
					if (err) {
						res.send(err);
					} else {
						if (bcrypt.compareSync(req.body.password, hash)) {
							req.session.key = req.body.user;
							res.send({
								message: "ok",
								session: req.session.id,
								date: Date.now(),
							});
						} else {
							res.status(400).send({
								message: "Authentication failed. Invalid credentials.",
							});
						}
					}
				});
			} else {
				res.status(400).send({
					message: "Authentication failed. User not found.",
				});
			}
		}
	});
});

app.post("/api/register", (req, res) => {
	const userId = `user:${req.body.user}`;
	const hash = bcrypt.hashSync(req.body.password.toString(), 10);
	const data = { user: req.body.user, password: hash };

	redisClient.hmset(userId, data, (err, response) => {
		if (err) {
			res.send(err);
		} else {
			res.send({
				message: response,
				userId,
			});
		}
	});
});

app.get("/api/characters", auth, (req, res) => {
	Axios.get("https://rickandmortyapi.com/api/character/")
		.then((response) => {
			res.send(response.data.results);
		})
		.catch((err) => res.send(err));
});

app.delete("/api/logout", auth, (req, res) => {
	req.session.destroy((err) => {
		if (err) {
			res.send(err);
		} else {
			res.send({ message: "ok", date: Date.now() });
		}
	});
});

app.get("/*", (req, res) => {
	res.sendFile(path.resolve(__dirname, "./views/build", "index.html"));
});

app.listen(8000, () => {
	console.log("App Started on http://localhost:8000");
});
