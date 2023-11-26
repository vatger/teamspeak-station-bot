import { TeamSpeak } from "ts3-nodejs-library";
import ts3Controller from "./controllers/ts3.controller";
import config from "./config";

console.log("Starting Application...");

export const teamspeak = new TeamSpeak({
    host: config().ts3Host,
    queryport: config().ts3QueryPort,
    username: config().ts3Username,
    password: config().ts3Password,
    nickname: config().ts3Nickname,
    keepAlive: true,
});

teamspeak.on("ready", async () => {
    console.log("Teamspeak instance ready");
    console.log(`Updating mapping File from: ${config().mappingUrl}`);

    await teamspeak.useBySid("1");

    // Remove groups and update the prefixes once. Then we use the intervals.
    await ts3Controller.forceRemoveAllGroups();
    await ts3Controller.updatePrefixes();

    setInterval(async () => {
        try {
            await ts3Controller.updatePrefixes();
        } catch (error: any) {
            console.error(error);
        }
    }, 1000 * 30); // 30 Seconds

    setInterval(async () => {
        try {
            await ts3Controller.removeEmptyServerGroups();
        } catch (error: any) {
            console.error(error);
        }
    }, 1000 * 60 * 60); // 60 Minutes
});

teamspeak.on("error", () => {
    console.error(`Error creating Teamspeak instance!`);
});
