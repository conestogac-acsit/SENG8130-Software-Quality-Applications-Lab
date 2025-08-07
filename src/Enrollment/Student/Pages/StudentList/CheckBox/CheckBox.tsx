import React, { useState } from "react";
import "./CheckBox.css";

const CheckBox = () => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  return (
    <label style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        data-testid="reusable-checkbox"
      />
      <span style={{ marginLeft: "8px" }}>{checked ? "Yes" : "No"}</span>
    </label>
  );
};

export default CheckBox;