/**
 * Telegraf on Events
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

const commandsToHandler = { 
	setwho: setWhoHandler
};

async function setWhoHandler(ctx) {
	const userId = ctx.message.from.id;
	const username = ctx.message.from.username;
	const description = ctx.message.text;

	const photoInfo = await ctx.telegram.getUserProfilePhotos(ctx.message.from.id);
	const photoId = photoInfo.photos[0]?.[0]?.file_id;

	if (!photoId) {
		ctx.reply("La tua foto profilo non è condivisa con tutti. Per salvarla sul bot, cambia le impostazioni della privacy");
	}

	await databases.setWho(userId, username, photoId, description);
	ctx.reply("Information updated");
}

/**
 * listen on every text
 * =====================
 * Send photo from meme_coding Instagram account to chat
 *
 */
const onText = async (): Promise<void> => {
	bot.on("text", async (ctx, next) => {
		const userId = ctx.message.from.id;
		const lastCommand = await databases.getUserCommand(userId);

		if (!lastCommand) {
			return next();
		}

		databases.writeUserCommand(userId, null);

		const handler = commandsToHandler[lastCommand];
		return handler(ctx);
	});
};

export { onText };
export default onText;
