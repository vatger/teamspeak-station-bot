import axios from "axios";
import { DatafeedController } from "../models/datafeedModel";
import config from "../config";
import LogHelper from "../helper/LogHelper";

async function getControllersFromDatafeed() {
    const res = await axios.get(config().vatsimDatafeedUrl);
    const datafeed = res.data as {data: DatafeedController[]; length: number; failed: boolean} | undefined | null;

    if (datafeed == null || datafeed.failed) {
        throw new Error("Datafeed is down, thanks vatsim");
    }

    LogHelper.logMessage(`Received datafeed update with ${datafeed.length} controllers`);
    
    // The cached datafeed has an extra nested "data" object (see https://github.com/vatger/datafeed-cache/wiki/Datafeed-API-(VATGER)#datafeedcontrollersger)
    let controllers = datafeed?.data ?? [];

    controllers = controllers.filter((controller: DatafeedController) => {
        return (controller.facility != 0);
    });

    return controllers;
}

export default {
    getControllersFromDatafeed,
};
