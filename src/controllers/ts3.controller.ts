import { teamspeak } from "../app";
import { TeamSpeakServerGroup } from "ts3-nodejs-library";
import { DatafeedController } from "../models/datafeedModel";
import dataFeedService from "../services/dataFeed.service";
import ts3Service from "../services/ts.service";
import vatgerService from "../services/vatger.service";
import atcStationController from "./atcStation.controller";
import { ServerGroupClientEntry } from "ts3-nodejs-library/lib/types/ResponseTypes";
import LogHelper from "../helper/LogHelper";

/*
    Hello Future user,
    this is where the magic happens. 

    - MfG Girly
*/

const teamspeakDbIdMap = new Map<number, number[]>();

async function forceRemoveAllGroups() {
    const serverGroups = await ts3Service.getCurrentServerGroups();
    for (const group of serverGroups) {
        await teamspeak.serverGroupDel(group, true);
    }
}

async function updatePrefixes() {
    LogHelper.logMessage("Updating Prefixes...");

    let controllers: DatafeedController[] = [];
    let serverGroups: TeamSpeakServerGroup[] = [];
    try {
        controllers = await dataFeedService.getControllersFromDatafeed();
        serverGroups = await ts3Service.getCurrentServerGroups();
    } catch (e: any)
    {
        console.error(e.message);
        console.error("Not updating teamspeak roles!");
        return;
    }

    await cleanupServerGroups(serverGroups, controllers);

    for (const controller of controllers) {
        const serverGroupName: string =
            (await atcStationController.getStationIdFromFrequency(controller.frequency, controller.callsign)) ?? controller.callsign;
        const controllerTeamspeakIds: number[] = await getControllerDbIds(controller.cid);

        if (!(await checkServerGroupExists(serverGroups, serverGroupName))) {
            const createdGroup: TeamSpeakServerGroup = await teamspeak.serverGroupCreate(serverGroupName);
            serverGroups.push(createdGroup);

            await createdGroup.addPerm({
                permname: "i_group_show_name_in_tree",
                permvalue: 1,
            });

            LogHelper.logMessage(`Group created: ${serverGroupName}`);

            for (const tsDbId of controllerTeamspeakIds) {
                await ts3Service.addClientToServerGroup(tsDbId.toString(), createdGroup);
            }
        } else {
            const serverGroup: TeamSpeakServerGroup | undefined = await teamspeak.getServerGroupByName(serverGroupName);
            for (const tsDbId of controllerTeamspeakIds) {
                await ts3Service.addClientToServerGroup(tsDbId.toString(), serverGroup);
            }
        }
    }
}

/**
 * Gets the controller's teamspeak database ids from the homepage API
 * CID => TS DBID
 */
async function getControllerDbIds(cid: number): Promise<number[]> {
    let controllerDbIds = teamspeakDbIdMap.get(cid);
    if (controllerDbIds == null) {
        try {
            let tsDbIds = await vatgerService.getTeamspeakDbIdFromCID(cid);
            controllerDbIds = (tsDbIds?.data as number[]) ?? [];
            teamspeakDbIdMap.set(cid, controllerDbIds);
        } catch (e: any) {
            console.error("Failed to fetch controller's teamspeak ID for user", cid, e);
        }
    }

    return controllerDbIds ?? [];
}

/**
 * Checks if the serverGroup with the given name already exists
 */
async function checkServerGroupExists(serverGroups: TeamSpeakServerGroup[], groupName: string): Promise<boolean> {
    const group = serverGroups.find((group: TeamSpeakServerGroup) => {
        return group.name.toLowerCase() === groupName.toLowerCase();
    });

    LogHelper.logMessage(`Checking Server group ${groupName} exists: ${groupName != null}`);

    return group != null;
}

/**
 * Cleans up the server groups removing users that are no longer logged in.
 * @param serverGroups
 * @param controllers
 */
async function cleanupServerGroups(serverGroups: TeamSpeakServerGroup[], controllers: DatafeedController[]) {
    for (const serverGroup of serverGroups) {
        const clientsInServergroup: ServerGroupClientEntry[] = await ts3Service.getClientsInServerGroup(serverGroup);
        LogHelper.logMessage(`Cleaning up server group: ${serverGroup.name}`);

        clientsLoop: for (const client of clientsInServergroup) {
            const clientDbId: number = Number(client.cldbid);

            LogHelper.logMessage(`Checking client ${clientDbId} in server group ${serverGroup.name}`);

            for (const controller of controllers) {
                const controllerDbIds: number[] = await getControllerDbIds(controller.cid).catch(e => {
                    LogHelper.logMessage(`[ERROR] Failed to get controller DB IDs for ${controller.cid}. Error: ${e.message}`);
                    return [];
                });
                const stationId: string | undefined = await atcStationController.getStationIdFromFrequency(controller.frequency, controller.callsign) ?? controller.callsign;

                LogHelper.logMessage(`Controller: ${controller.cid} | TS IDs: ${controllerDbIds} | StationID: ${stationId}`);

                if (controllerDbIds.indexOf(clientDbId) !== -1 && stationId.toLowerCase() === serverGroup.name.toLowerCase()) {
                    continue clientsLoop;
                }
            }
            await ts3Service.removeClientFromServerGroup(client.cldbid, serverGroup);
            LogHelper.logMessage(`Removed ${client.clientNickname} from server group: ${serverGroup.name}`);
        }
    }
}

async function removeEmptyServerGroups() {
    LogHelper.logMessage("Removing unused (empty) server groups and resetting stored Teamspeak DBIDs");
    teamspeakDbIdMap.clear();

    const serverGroups = await ts3Service.getCurrentServerGroups();

    for (const group of serverGroups) {
        const clientsInGroups = await ts3Service.getClientsInServerGroup(group);
        if (clientsInGroups.length == 0) {
            LogHelper.logMessage("Deleting unused group: ", group.name);

            await teamspeak.serverGroupDel(group.sgid);
        }
    }
}

export default {
    updatePrefixes,
    forceRemoveAllGroups,
    removeEmptyServerGroups,
};
