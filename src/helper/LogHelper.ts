import moment from "moment";
import config from "../config";

function logMessage(...message: (string | number)[]) {
    config().debug && console.log(`[${moment()}]`, message);
}

export default {
    logMessage,
};
