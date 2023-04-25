import axios from "axios";
import config from "../config";

async function getTeamspeakDbIdFromCID(cid: number) {
    return axios.get(`http://172.16.0.111/api/teamspeak/${cid}`, {
        headers: {
            Authorization: `Token ${config().apiToken}`,
        },
    });
}

export default {
    getTeamspeakDbIdFromCID,
};
