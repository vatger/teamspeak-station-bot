# Teamspeak3 Station Bot
This project polls the VATSIM Datafeed and assigns Teamspeak server roles based on the current ATC Position on the VATSIM network. 
It checks a predefined mapping file and creates teamspeak server roles from this. These mappings are defined in `/data/atc_station_mappings.json`. 
Should a controller not exist, the bot will automatically assign the currently used callsign on VATSIM for this use-case. 

If you wish to contribute and/or make changes (especially regarding the aforementioned mapping file), please check out our contribution guide [here](CONTRIBUTING.md).

## Contact

|    Name    | Responsible for |               Contact               |
|:----------:|:---------------:|:-----------------------------------:|
| Nikolas G. |        *        | `nikolas.goerlitz[at]vatger.de` (1) |
| Moritz F.  |        *        |                - (1)                |

(1) Also available through the VATSIM Germany Forum

## Running the Application
Running this application in a local environment is a little more challenging, since it requires the use of a local teamspeak3 server. 
The downloads for teamspeak-server can be found [here](https://www.teamspeak.com/de/downloads/#server). 
Documentation is included in the downloaded .zip archive. 

1. Install **node.js** (https://nodejs.org/en)
2. Run `npm install typescript -g`. 
   - This installs the `tsc` command globally! If you wish to change this, you can read more on the supported installation paths [here](https://www.typescriptlang.org/download).
3. Copy the `.env.example` to `.env` and make appropriate changes to reflect your local development environment. 
4. Run `npm install` to install the required npm packages.
5. Run `npm run start` to start the application. 
    - Note: The first time launch can take a little longer than subsequent launches, as the entire source (although it's not very large) needs to be compiled first. Subsequent launches will be a lot quicker.

> **Warning** 
> 
> Please note that the bot will make HTTP calls to `http://hp.vatsim-germany.org/api/teamspeak/${cid}`. 
> This will not work on your local machine! 
> To fix this you will need to create a custom mapping between CID and Teamspeak Station IDs (the endpoint expects a response of type `number[]` containing all Teamspeak DBIDs of the requested user) and provide an API endpoint for this. 
> You could, for example, map all CIDs to your own local TeamSpeak DBID - be aware that you will receive all roles of all currently online controllers though. 