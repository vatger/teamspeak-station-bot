import axios from "axios";
import { DatafeedController } from "../models/datafeedModel";
import config from "../config";

async function getControllersFromDatafeed() {
    const datafeed = await axios.get(config().vatsimDatafeedUrl);
    let controllers = datafeed.data?.controllers ?? [];

    controllers = controllers.filter((controller: DatafeedController) => {
        return (controller.facility != 0 && controller.frequency != "199.998" && (controller.callsign.startsWith("ED") || controller.callsign.startsWith("ET")));
    });

    if (datafeed.data == null || datafeed.data.length == 0 || datafeed.data == '')
        throw new Error("Datafeed is down, thanks vatsim");

    return controllers;
}

export default {
    getControllersFromDatafeed,
};
