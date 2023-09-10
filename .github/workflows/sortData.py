import json
import os

# Define the file path for the input JSON
input_file_path = os.path.join("data", "atc_station_mappings.json")

# Check if the input file exists
if os.path.exists(input_file_path):
    # Read the JSON data from the input file
    with open(input_file_path, "r") as input_file:
        data = json.load(input_file)

    # Sort the data first by 'callsignPrefix' and then by 'id'
    data.sort(key=lambda x: (x['callsignPrefix'], x['id']))

    # Create a list to hold the sorted data with empty lines and commas
    sorted_data_with_empty_lines = []
    current_callsign_prefix = None
    for i, entry in enumerate(data):
        if entry['callsignPrefix'] != current_callsign_prefix:
            if i >= 1:
                sorted_data_with_empty_lines.append("")  # Add an empty line
            current_callsign_prefix = entry['callsignPrefix']
        sorted_data_with_empty_lines.append(entry)

    # Define the output file path with a different name
    output_file_path = os.path.join("data", "atc_station_mappings.json")

    # Write the sorted data with empty lines and commas to the output file
    with open(output_file_path, "w") as output_file:
        output_file.write("[\n")
        for i, line in enumerate(sorted_data_with_empty_lines):
            output_file.write("  ")
            if isinstance(line, dict):
                json.dump(line, output_file, separators=(', ', ': '))
                if i < len(sorted_data_with_empty_lines) - 1:
                    output_file.write(",\n")  # Add a comma and newline after each entry except the last one
            elif line == "":
                output_file.write("\n")  # Add a comma and newline for empty lines
        output_file.write("\n]\n")  # Add a newline before closing the JSON array

    print(f"The data has been sorted by 'callsignPrefix' and 'id', with empty lines and saved to '{output_file_path}'")
else:
    print(f"The input file '{input_file_path}' does not exist.")
