const { validationResult } = require("express-validator");
const UserModel = require("../models/user");
const RoleModel = require("../models/role");
const bcrypt = require("bcryptjs");
const uuid = require("uuid");
const mailService = require("../service/mail-service");
const tokenService = require("../service/token-service");
const UserDto = require("../dtos/user-dto");
const ApiError = require("../exceptions/api-error");

class AuthService {
	async registration(username, email, password) {
		const candidate = await UserModel.findOne({
			$or: [{ username: username }, { email: email }],
		});

		if (candidate) {
			throw ApiError.BadRequest("User with same email or username already exists");
		}

		const newUserRole = await RoleModel.findOne({ value: "USER" });
		const hashPassword = bcrypt.hashSync(password, 3);
		const activationLink = uuid.v4();

		const newUser = await UserModel.create({
			username,
			email,
			password: hashPassword,
			roles: [newUserRole.value],
			activationLink,
		});

		await mailService.sendActivationEmail(email, `${process.env.CLIENT_URL}/auth/activate/${activationLink}`);

		// const userDto = new UserDto(newUser); // id, email, isActivated
		// const tokens = tokenService.generateTokens({ ...userDto });
		// await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			message: "Success",
		};
	}

	async activate(activationLink) {
		const user = await UserModel.findOne({ activationLink });

		if (!user) {
			throw new Error("Uncorrect activation link");
		}

		user.isActivated = true;
		await user.save();
	}

	async login(username, password) {
		const user = await UserModel.findOne({ username });

		if (!user) {
			throw ApiError.BadRequest("User with this name not found");
		}

		const isPassEquals = await bcrypt.compareSync(password, user.password);
		if (!isPassEquals) {
			throw ApiError.BadRequest("Password is incorrect");
		}

		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async logout(refreshToken) {
		const token = await tokenService.removeToken(refreshToken);
		return token;
	}

	async refresh(refreshToken) {
		if (!refreshToken) {
			throw ApiError.UnauthorizedError();
		}

		const userData = tokenService.validateRefreshToken(refreshToken);
		const tokenFromDb = await tokenService.findToken(refreshToken);
		if (!userData || !tokenFromDb) {
			throw ApiError.UnauthorizedError();
		}

		const user = await UserModel.findById(userData.id);
		const userDto = new UserDto(user);
		const tokens = tokenService.generateTokens({ ...userDto });

		await tokenService.saveToken(userDto.id, tokens.refreshToken);

		return {
			...tokens,
			user: userDto,
		};
	}

	async getAllUsers() {
		const users = await UserModel.find();
		return users;
	}
}

module.exports = new AuthService();
