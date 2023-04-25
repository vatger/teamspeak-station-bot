# TS3 Station Bot
This project polls the VATSIM Datafeed and assigns Teamspeak server roles based on the current ATC Position 
on the VATSIM network. The mapping can be defined in the `atc_station_mappings.json` File located in the `data` directory. 

## Contributing
If you wish to contribute to this project and/or change the station mappings, please create a pull request containing your changes. These
will be reviewed as soon as possible and merged into the project. 

## atc_station_mappings.json
The mapping can be defined in the `atc_station_mappings.json` File located in the `data` directory.
The following naming scheme must be adhered to when submitting changes to the ATC-Station-Mapping file - this requirement is valid for VATGER
however can be adapted by any other vACC wishing to use this tool.

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
