/**
 * Databases Interfaces
 * =====================
 *
 * Funny and Stupid Telegram bot of OpenSource Support Group
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */

/**
 * Telegram User Interface
 * =====================
 *
 * @Context: ctx.update.message.from
 *
 *
 * @param { number } id - telegram
 * @param { boolean } is_bot - is user a bot
 * @param { string } first_name - user name from telegram
 * @param { string } username - user username from telegram
 * @param { string } language_code - user code language from OS
 *
 */
export interface TelegramUserInterface {
	/**
	 * Telegram User Interface
	 * =====================
	 *
	 * @param { number } id - telegram
	 *
	 */
	id: number,
	/**
	 * User Interface
	 * =====================
	 *
	 * @param { boolean } is_bot - is user a bot
	 *
	 */
	is_bot?: boolean,
	/**
	 * User Interface
	 * =====================
	 *
	 * @param { string } first_name - user name from telegram
	 *
	 */
	first_name?: string,
	/**
	 * User Interface
	 * =====================
	 *
	 * @param { string } username - user username from telegram
	 *
	 */
	username?: string,
	/**
	 * User Interface
	 * =====================
	 *
	 * @param { string } language_code - user code language from OS
	 *
	 */
	language_code?: string,
	/**
	 * User Interface
	 * =====================
	 *
	 * @param { string } lastCommand - last user command
	 *
	 */
	lastCommand?: string
}

/**
 * Who User Interface
 *
 */
 export interface WhoUserInterface {
	/**
	 * Who User Interface
	 * =====================
	 *
	 * @param { number } id - telegram user id
	 *
	 */
	id: number,
	/**
	 * Who User Interface
	 * =====================
	 *
	 * @param { string } username - the telegram user username
	 *
	 */
	username?: string,
	/**
	 * Who User Interface
	 * =====================
	 *
	 * @param { string } description - the user description
	 *
	 */
	description: string,
	/**
	 * Who User Interface
	 * =====================
	 *
	 * @param { string } photoId - telegram user photo id
	 *
	 */
	photoId?: string
}
