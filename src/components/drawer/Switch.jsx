import React from "react";
import { FormGroup, FormControlLabel, Switch } from "@material-ui/core";

export default function SwitchLabels() {
  return (
    <FormGroup>
      <FormControlLabel
        control={<Switch checked={{}} onChange={{}} name="checked" />}
      />
    </FormGroup>
  );
}
