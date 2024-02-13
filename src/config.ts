import * as dotenv from 'dotenv';

dotenv.config();

interface PrefixBotConfig {
    ts3Host: string;
    ts3QueryPort: number;
    ts3Username: string;
    ts3Password: string;
    ts3Nickname: string;
    ts3Port: number;
    vatsimDatafeedUrl: string;
    excludedServerGroupIds: number[];
    apiToken: string,
    mappingUrl: string,
    mappingDownloadInterval: number,
    maxServerLoad: number,
    registeredServerGroupId: string,
    debug: boolean
  }

export default function config(): PrefixBotConfig {
 
    return {
        ts3Host: process.env.TS3_HOST ?? 'localhost',
        ts3QueryPort: Number(process.env.TS3_QUERYPORT) ?? 10011,
        ts3Username: process.env.TS3_USERNAME ?? '',
        ts3Password: process.env.TS3_PASSWORD ?? '',
        ts3Nickname: process.env.TS3_NICKNAME ?? '',
        ts3Port: Number(process.env.TS3_PORT) ?? 9987,
        vatsimDatafeedUrl: process.env.VATSIM_DATAFEED_URL ?? 'https://data.vatsim.net/v3/vatsim-data.json',
        excludedServerGroupIds: process.env.EXCLUDED_SERVER_GROUP_IDS?.split(',').map(Number) ?? [],
        apiToken: process.env.API_TOKEN ?? '',
        mappingUrl: process.env.MAPPING_URL ?? '',
        mappingDownloadInterval: Number(process.env.MAPPING_DOWNLOAD_INTERVAL) ?? 5,
        maxServerLoad: Number(process.env.MAX_SERVER_LOAD) ?? 0.8,
        registeredServerGroupId: process.env.REGISTERED_SERVER_GROUP ?? "10",
        debug: Boolean(process.env.DEBUG?.toLowerCase())

    };
  }