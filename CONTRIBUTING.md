# Contributing to Teamspeak3 Station Bot

Thank you for considering contributing to our Teamspeak3 Station Bot! We appreciate your time and effort to help make our project better.

The following is a set of guidelines for contributing to this repository. These are just guidelines, not rules, so use your best judgment and feel free to propose changes to this document in a pull request. Please note that contributions will be reviewed before being merged.

## How to Contribute

There are many ways to contribute to this project! Some suggestions include:

- Fixing a bug
- Implementing a new feature
- Discussing potential improvements
- Reporting a bug
- Submitting feedback

## Getting Started

### Development

To get started, [create an issue](https://github.com/vatger/teamspeak-station-bot/issues) to discuss the changes you would like to make. 
This will allow for feedback and suggestions before you spend time coding.

### Station Mapping File

No issue is required.

The ATC-station to teamspeak group name mapping can be defined in the `atc_station_mappings.json` file located in the `data` directory.
Note that the 'id' field is used by the bot to create server roles. This ends up being the name of the role assigned to the controller.
The following naming scheme must be adhered to when submitting changes to the ATC-Station-Mapping file - this requirement is valid for VATGER however can be adapted by any other vACC wishing to use this tool.

Ground Stations (DEL/GND/TWR)
[<span style="color:green">(last two letters of ICAO Code)</span><span style="color:lightblue">(T/G/C - for Tower/Ground/(Clearance) Delivery)</span><span style="color:red">(Station Identifier, e.g. EDDF_S_TWR)</span>]
- Example for `EDDF_S_TWR` -> <span style="color:green">DF</span><span style="color:lightblue">T</span><span style="color:red">S</span>
- Example for `EDDF_W_GND` -> <span style="color:green">DF</span><span style="color:lightblue">G</span><span style="color:red">W</span>
- Example for `EDDS_DEL` -> <span style="color:green">DS</span><span style="color:lightblue">C</span>

Arrival/Departure Stations (APP/DEP)
[<span style="color:green">(last two letters of ICAO Code)</span><span style="color:lightblue">(A/D - for Arrival/Departure)</span><span style="color:red">(Station Identifier, e.g. EDDF_N_APP)</span>]
- Example for `EDDF_N_APP` -> <span style="color:green">DF</span><span style="color:lightblue">A</span><span style="color:red">N</span>
- Example for `EDDF_N_DEP` -> <span style="color:green">DF</span><span style="color:lightblue">D</span><span style="color:red">N</span>
- Example for `EDDK_APP` -> <span style="color:green">DK</span><span style="color:lightblue">A</span>

Center Stations (CTR)
[<span style="color:green">(last two letters of FIR/UIR)</span><span style="color:lightblue">(0 or 3 letters that uniquely identify the sector - 0 in the case of 'complete' center stations (e.g. EDMM_CTR, EDGG_CTR, ...))</span>]
- Example for `EDGG_KTG_CTR` -> <span style="color:green">GG</span><span style="color:lightblue">KTG</span>
- Example for `EDUU_WUR_CTR` -> <span style="color:green">UU</span><span style="color:lightblue">WUR</span>
- Example for `EDGG_CTR` -> <span style="color:green">GG</span>

## Pull Request Process

1. [Fork](https://help.github.com/en/github/getting-started-with-github/fork-a-repo) the repository and create a new branch.
2. Make your changes to the codebase.
3. Test your changes thoroughly.
4. Submit a pull request.

We'll try to review your code as soon as possible and let you know if there's anything that requires changing. 

## License

By contributing to this repository, you agree that your contributions will be licensed under the license that this repository is published under.
This can be found on the right side of the GitHub application located under the "about" section.

Thank you for contributing to our Teamspeak3 Station Bot!