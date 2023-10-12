const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const authService = require("../service/auth-service");
const ApiError = require("../exceptions/api-error");

const { SECRET } = require("../config");

class AuthController {
	async registration(req, res, next) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return next(ApiError.BadRequest("User validation error", errors.array()));
			}

			const { username, email, password } = req.body;
			const registratonResult = await authService.registration(username, email, password);
			// res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
			return res.json(registratonResult);
		} catch (e) {
			console.log(e);
			next(e);
		}
	}

	async activate(req, res, next) {
		try {
			const activationLink = req.params.link;
			await authService.activate(activationLink);
			return res.redirect(process.env.CLIENT_URL);
		} catch (e) {
			next(e);
		}
	}

	async login(req, res, next) {
		try {
			const { username, password } = req.body;
			const userData = await authService.login(username, password);
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
			return res.json({ accessToken: userData.accessToken, user: userData.user });
		} catch (e) {
			next(e);
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const token = await authService.logout(refreshToken);
			res.clearCookie("refreshToken");
			return res.json(token);
		} catch (e) {
			next(e);
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies;
			const userData = await authService.refresh(refreshToken);
			res.cookie("refreshToken", userData.refreshToken, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
			return res.json({ accessToken: userData.accessToken, user: userData.user });
		} catch (e) {
			next(e);
		}
	}

	async getUsers(req, res) {
		try {
			const users = await authService.getAllUsers();
			res.json(users);
		} catch (e) {
			next(e);
		}
	}
}

module.exports = new AuthController();
