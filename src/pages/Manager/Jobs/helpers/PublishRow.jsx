import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import React from "react";
import { Button } from "../../../../Global";
import { TileHeading } from "../../Manager.elements";

const PublishRow = ({
  isSelected,
  setSelected,
  boardName,
  pricing,
  candidatesApplied,
  isPublished,
}) => {
  return (
    <tr>
      <td>
        <TileHeading>{boardName}</TileHeading>
      </td>
      <td>
        <TileHeading>{pricing}</TileHeading>
      </td>
      <td>
        <TileHeading>{candidatesApplied}</TileHeading>
      </td>
      <td>
        {isPublished ? (
          <Button btnColor="#96000d">Unpublish</Button>
        ) : (
          <Button btnColor="#007d11">Publish</Button>
        )}
      </td>
    </tr>
  );
};

export default PublishRow;
