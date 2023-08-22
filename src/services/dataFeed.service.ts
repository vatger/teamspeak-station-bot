import axios from "axios";
import { DatafeedController } from "../models/datafeedModel";
import config from "../config";

async function getControllersFromDatafeed() {
    const res = await axios.get(config().vatsimDatafeedUrl);
    const datafeed = res.data;

    if (datafeed == null || datafeed.data?.failed == false) {
        throw new Error("Datafeed is down, thanks vatsim");
    }
    
    // The cached datafeed has an extra nested "data" object (see https://github.com/vatger/datafeed-cache/wiki)
    let controllers = datafeed?.data?.controllers ?? [];

    controllers = controllers.filter((controller: DatafeedController) => {
        return (controller.facility != 0 && controller.frequency != "199.998" && (controller.callsign.startsWith("ED") || controller.callsign.startsWith("ET")));
    });

    return controllers;
}

export default {
    getControllersFromDatafeed,
};
