import axios from "axios";
import moment from "moment";
import config from "../config";
import LogHelper from "../helper/LogHelper";

export type StationMap = {
    frequency: string;
    id: string;
    callsignPrefix?: string;
};

let stationMapping: StationMap[] | null = null;
let lastPullDate: Date | null = null;

async function getStationIdFromFrequency(frequency: string, callsign: string) {
    const duration = moment.duration(moment().diff(lastPullDate)).asMinutes();

    // Check if the mapping file is not defined, or the last pull was more than 5 minutes ago
    if (stationMapping == null || lastPullDate == null || duration > config().mappingDownloadInterval) {
        try {
            const data = await axios.get(config().mappingUrl);
            stationMapping = data.data as StationMap[];
            lastPullDate = new Date();

            LogHelper.logMessage(`Updated station mapping file from ${config().mappingUrl}`);
        } catch (e: any) {
            LogHelper.logMessage(`Failed to retrieve updated mapping.json. ${e}`);
            return undefined;
        }
    }

    if (stationMapping == null) {
        return undefined;
    }

    const station = stationMapping.find(station => {
        let callsignPrefix = station.callsignPrefix;
        if (callsignPrefix == null) return station.frequency == frequency;
        else return station.frequency == frequency && callsign.toLowerCase().startsWith(callsignPrefix.toLowerCase());
    });

    return station?.id;
}

export default {
    getStationIdFromFrequency,
};
