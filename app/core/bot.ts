import * as command from "@app/functions/commands";
import * as on from "@app/functions/on";

/**
 * Start bot
 * =====================
 *
 * @contributors: Patryk Rzucidło [@ptkdev] <support@ptkdev.io> (https://ptk.dev)
 *
 * @license: MIT License
 *
 */
(async () => {
	await command.quit();
	await command.start();
	await command.sendPhoto();
	await command.setUserInfo();
	await command.getUserInfo();
	await on.onText();
	await command.launch();
})();
