import axios from "axios";
import { DatafeedController } from "../models/datafeedModel";
import config from "../config";
import LogHelper from "../helper/LogHelper";

async function getControllersFromDatafeed() {
    const res = await axios.get(config().vatsimDatafeedUrl).catch(e => {
        throw new Error(`Failed Datafeed Request: ${e.message}`);
    });
    const datafeed = res.data as {data: DatafeedController[]; length: number; failed: boolean} | undefined | null;

    if (datafeed == null || datafeed.data == null || datafeed.failed) {
        throw new Error("Datafeed is down. Not updating prefixes.");
    }

    LogHelper.logMessage(`Received datafeed update with ${datafeed.length} controllers`);
    
    // The cached datafeed has an extra nested "data" object (see https://github.com/vatger/datafeed-cache/wiki/Datafeed-API-(VATGER)#datafeedcontrollersger)
    return datafeed?.data;
}

export default {
    getControllersFromDatafeed,
};
