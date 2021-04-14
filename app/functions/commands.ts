/**
 * Telegraf Commands
 * =====================
 *
 * @contributors: Patryk Rzucidło  [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 * @contributors: Pasquale Carbone [@KiraPC] <pasqualecarmine.carbone@gmail.com>
 *
 * @license: MIT License
 *
 */
import bot from "@app/functions/telegraf";
import * as databases from "@app/functions/databases";
import Instagram from "instagram-web-api";

const client = new Instagram({});

/**
 * command: /quit
 * =====================
 * If user exit from bot
 *
 */
const quit = async (): Promise<void> => {
	bot.command("quit", (ctx) => {
		ctx.telegram.leaveChat(ctx.message.chat.id);
		ctx.leaveChat();
	});
};

/**
 * command: /memecoding
 * =====================
 * Send photo from meme_coding Instagram account to chat
 *
 */
const sendPhoto = async (): Promise<void> => {
	bot.command("memecoding", async (ctx) => {
		const photos = await client.getPhotosByUsername({ username: "meme_coding", first: 5000 });
		const memes = photos.user.edge_owner_to_timeline_media.edges.map(edge => edge.node.display_url);

		const randomMeme = memes[Math.floor(Math.random() * memes.length)];
		ctx.telegram.sendPhoto(ctx.chat.id, randomMeme);
	});
};

/**
 * command: /start
 * =====================
 * Send welcome message
 *
 */
const start = async (): Promise<void> => {
	bot.start((ctx) => {
		databases.writeUser(ctx.update.message.from);

		ctx.telegram.sendMessage(ctx.message.chat.id, `Welcome! Try send /memecoding command`);
	});
};

/**
 * Run bot
 * =====================
 * Send welcome message
 *
 */
const launch = async (): Promise<void> => {
	bot.launch();
};

export { launch, quit, sendPhoto, start };
export default launch;
