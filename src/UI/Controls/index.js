import Box from "@material-ui/core/Box";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import React from "react";
import Select from "@material-ui/core/Select";
import Switch from "@material-ui/core/Switch";

const Controls = ({
  layouts,
  selectedLayout,
  showCoordinates,
  onLayoutChange,
  onCoordiateVisibilityChange,
}) => {
  return (
    <Box display="flex" justifyContent="space-between" alignItems="flex-start">
      <FormControl>
        <InputLabel id="app-scenrio-controls-scenrio-label">Scenrio</InputLabel>
        <Select
          labelId="app-scenrio-controls-scenrio-label"
          id="app-scenrio-controls-scenrio"
          value={selectedLayout}
          onChange={onLayoutChange}
        >
          {layouts.map((layout, index) => (
            <MenuItem key={index} value={index}>
              {layout.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControlLabel
        control={
          <Switch
            size="small"
            checked={showCoordinates}
            onChange={onCoordiateVisibilityChange}
            name="app-scenrio-controls-showCoordinates"
          />
        }
        label="Hex Coordinates"
      />
    </Box>
  );
};

export default Controls;
