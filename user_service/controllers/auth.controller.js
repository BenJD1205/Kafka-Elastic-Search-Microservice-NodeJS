const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");
const generateToken = require("../utils/generateToken");

const register = async (req, res, next) => {
	const { username, email, password } = req.body;
	try {
		const userExits = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (userExits.rows.length > 0) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await bcrypt.hash(password, 10);
		const newUser = await db.query(
			"INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING username, email",
			[username, email, hashedPassword]
		);
		return res
			.status(200)
			.json({ message: "User created successfully", user: newUser.rows[0] });
	} catch (err) {
		next(err);
	}
};

const login = async (req, res, next) => {
	const { email, password } = req.body;
	try {
		const user = await db.query("SELECT * FROM users WHERE email = $1", [
			email,
		]);
		if (!user.rows.length) {
			return res.status(404).json({ message: "User not found" });
		}
		const validPassword = await bcrypt.compare(password, user.rows[0].password);
		if (!validPassword) {
			return res.status(400).json({ message: "Invalid password" });
		}
		const token = generateToken({
			id: user.rows[0].id,
			email: user.rows[0].email,
		});
		return res.status(200).json({ message: "Login successful", token });
	} catch (err) {
		next(err);
	}
};

const validate = async (req, res, next) => {
	const token = req.headers["authorization"];
	try {
		if (!token) {
			return res.status(401).json({ message: "Invalid token" });
		}
		const tokenData = token.split(" ")[1];
		const user = jwt.verify(tokenData, process.env.JWT_SECRET);
		return res.status(200).json({ ...user });
	} catch (err) {
		next(err);
	}
};

module.exports = {
	register,
	login,
	validate,
};
