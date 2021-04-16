/**
 * Database: lowdb
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
import lowdb from "lowdb";
import lowdbFileSync from "lowdb/adapters/FileSync";
import configs from "@configs/config";

import type { TelegramUserInterface } from "@app/types/databases.type";

const databases = { users: null, who: null };

databases.users = lowdb(new lowdbFileSync(configs.databases.users));
databases.users.defaults({ users: [] }).write();

databases.who = lowdb(new lowdbFileSync(configs.databases.who));
databases.who.defaults({ who: [] }).write();

/**
 * writeUser()
 * =====================
 * Write user information from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/community-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { TelegramUserInterface } json - telegram user object
 *
 */
const writeUser = async (json: TelegramUserInterface): Promise<void> => {

	const user_id = databases.users.get("users").find({ id: json.id }).value();

	if (user_id) {
		databases.users.get("users").find({ id: user_id.id }).assign(json).write();
	} else {
		databases.users.get("users").push(json).write();
	}

};

/**
 * writeUserCommand()
 * =====================
 * Write last user command from telegram context to user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/community-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { number } id - telegram user id
 * @param { string } cmd - telegram command
 *
 */
const writeUserCommand = async (id: number, cmd: string): Promise<void> => {

	const user = databases.users.get("users").find({ id }).value();

	if (!user) {
		throw new Error("");
	}

	user.lastCommand = cmd;

	databases.users.get("users").find({ id }).assign(user).write();
};

/**
 * getUserCommand()
 * =====================
 * Return last user command from user database
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/community-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 *
 * @param { number } id - telegram user id
 * @param { string } cmd - telegram command
 *
 */
const getUserCommand = async (id: number): Promise<string | null> => {

	const user = databases.users.get("users").find({ id }).value();

	if (!user) {
		throw new Error("");
	}

	return user.lastCommand;
};

/**
 * setWho()
 * =====================
 * Save Who Information
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/community-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 * @param username
 * @param photoId
 * @param description
 *
 * @param { number } id - telegram user id
 * @param { string } cmd - telegram command
 *
 */
const setWho = async (id: number, username: string, photoId: string, description: string): Promise<void> => {
	const user = databases.who.get("who").find({ id }).value();

	const record = { id, username, description, photoId };

	if (user) {
		databases.who.get("who").find({ id }).assign(record).write();
	} else {
		databases.who.get("who").push(record).write();
	}
};

/**
 * setWho()
 * =====================
 * Save Who Information
 *
 * @Context: ctx.update.message.from
 *
 * @interface [TelegramUserInterface](https://github.com/ptkdev/community-telegram-bot/blob/main/app/webcomponent/types/databases.type.ts)
 * @param username
 *
 * @param { number } id - telegram user id
 * @param { string } cmd - telegram command
 *
 */
const getWho = async (username: string): Promise<any> => {
	const user = databases.who.get("who").find({ username }).value();

	if (!user) {
		throw new Error("Unknow user");
	}

	return user;
};

export { databases, writeUser, writeUserCommand, getUserCommand, setWho, getWho };
export default databases;
