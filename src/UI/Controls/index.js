import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";
import { useUserSettings } from "ui/contexts/UserSettingsContext";

const Controls = ({ layouts }) => {
  const { isVisibleCoords, setIsVisibleCoords, scenrioIndex, setScenrioIndex } =
    useUserSettings();

  const handleCoordiateVisibilityChange = (e) =>
    setIsVisibleCoords(e.target.checked);

  const handleScenrioChange = (e) => setScenrioIndex(e.target.value);

  // TODO: not fixed; from scenrio
  const attackValues = [1];
  const targetValues = [1];
  const moveValues = [2];

  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <FormControl>
        <InputLabel id="app-scenrio-controls-scenrio-label">Scenrio</InputLabel>
        <Select
          labelId="app-scenrio-controls-scenrio-label"
          id="app-scenrio-controls-scenrio"
          value={scenrioIndex}
          onChange={handleScenrioChange}
        >
          {layouts.map((layout, index) => (
            <MenuItem key={layout.title} value={index}>
              {layout.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* TODO: hook up controls */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Box pr={1}>
          <FormControl>
            <InputLabel id="app-scenrio-controls-moveValues-label">
              Move
            </InputLabel>
            <Select
              labelId="app-scenrio-controls-moveValues-label"
              id="app-scenrio-controls-moveValues"
              value={moveValues[0]}
              onChange={console.log}
            >
              {moveValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box pr={1}>
          <FormControl>
            <InputLabel id="app-scenrio-controls-attackValue-label">
              Attack
            </InputLabel>
            <Select
              labelId="app-scenrio-controls-attackValue-label"
              id="app-scenrio-controls-attackValue"
              value={attackValues[0]}
              onChange={console.log}
            >
              {attackValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box>
          <FormControl>
            <InputLabel id="app-scenrio-controls-targetValue-label">
              Target
            </InputLabel>
            <Select
              labelId="app-scenrio-controls-targetValue-label"
              id="app-scenrio-controls-targetValue"
              value={targetValues[0]}
              onChange={console.log}
            >
              {targetValues.map((value) => (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      </Box>

      <FormControlLabel
        label="Hex Coordinates"
        control={
          <Switch
            size="small"
            checked={isVisibleCoords}
            onChange={handleCoordiateVisibilityChange}
            name="app-scenrio-controls-showCoordinates"
          />
        }
      />
    </Box>
  );
};

export default Controls;
