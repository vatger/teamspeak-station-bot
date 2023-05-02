import axios from "axios";
import config from "../config";

async function getTeamspeakDbIdFromCID(cid: number) {
    return axios.get(`http://hp.vatsim-germany.org/api/teamspeak/${cid}`, {
        headers: {
            Authorization: `Token ${config().apiToken}`,
        },
    });
}

export default {
    getTeamspeakDbIdFromCID,
};
