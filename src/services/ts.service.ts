import {TeamSpeakServerGroup} from "ts3-nodejs-library";
import { teamspeak } from "../app";
import config from "../config";
import LogHelper from "../helper/LogHelper";

const excludedServerGroupIds: number[] = config().excludedServerGroupIds;

async function getCurrentServerGroups() {
    let serverGroups: TeamSpeakServerGroup[] = await teamspeak.serverGroupList();

    serverGroups = serverGroups.filter((group: TeamSpeakServerGroup) => {
        return excludedServerGroupIds.indexOf(Number(group.sgid)) == -1;
    });

    return serverGroups;
}

async function getClientsInServerGroup(group: TeamSpeakServerGroup) {
    return group.clientList();
}

async function isUserMemberOfServerGroup(client_db_id: string, serverGroup: TeamSpeakServerGroup)
{
    const clients = await getClientsInServerGroup(serverGroup);

    const isMember = clients.find(client => {
        return client.cldbid === client_db_id
    });

    return isMember != null;
}

async function addClientToServerGroup(client_db_id: string, serverGroup: TeamSpeakServerGroup | undefined)
{
    if (serverGroup == null)
        return;

    if (!await isUserMemberOfServerGroup(client_db_id, serverGroup))
    {
        try {
            await serverGroup.addClient(client_db_id);
            LogHelper.logMessage(`Added client ${client_db_id} to server group: ${serverGroup.name}`);
        } catch (e: any)
        {
            console.error('Failed to add client:', e.msg);
        }
    }
}

async function removeClientFromServerGroup(client_db_id: string, serverGroup: TeamSpeakServerGroup | undefined)
{
    if (serverGroup == null)
        return;

    if (await isUserMemberOfServerGroup(client_db_id, serverGroup))
    {
        try {
            await serverGroup.delClient(client_db_id);
            LogHelper.logMessage(`Removed client ${client_db_id} from server group: ${serverGroup.name}`);
        } catch (e: any)
        {
            console.error('Failed to remove client:', e.msg);
        }
    }
}

async function checkServerLoadAndUpdateTimeout()
{
    const serverInfo = await teamspeak.serverInfo();
    const load = serverInfo.virtualserverClientsonline / serverInfo.virtualserverMaxclients;
    let serverGroup: TeamSpeakServerGroup | undefined = await teamspeak.getServerGroupById(config().registeredServerGroupId);

    if (!serverGroup)
    {
        return;
    }

    if(load > config().maxServerLoad)
    {
        await teamspeak.serverGroupAddPerm(serverGroup, {
            permname: "i_client_max_idletime",
            permvalue: 1800,
        })
    }
    else{
        await teamspeak.serverGroupAddPerm(serverGroup, {
            permname: "i_client_max_idletime",
            permvalue: 18000,
        })
    }
}

export default {
    getCurrentServerGroups,
    getClientsInServerGroup,
    addClientToServerGroup,
    removeClientFromServerGroup,
    checkServerLoadAndUpdateTimeout,
};
