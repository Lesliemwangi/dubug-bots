// SortBar.jsx
import React from "react";

function SortBar({ handleSort }) {
  return (
    <div>
      Sort by:
      <button className="ui button" onClick={() => handleSort("health")}>
        Health
      </button>
      <button className="ui button" onClick={() => handleSort("damage")}>
        Damage
      </button>
      <button className="ui button" onClick={() => handleSort("armor")}>
        Armor
      </button>
    </div>
  );
}

export default SortBar;