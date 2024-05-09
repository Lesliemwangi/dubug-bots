import React, { useState } from "react";
import SortBar from "./SortBar";
import BotCard from "./BotCard";

// Component for displaying a collection of bots
function BotCollection({ bots, addToArmy, removeFromArmy }) {
  // State to store the selected sort option
  const [sortOption, setSortOption] = useState(null);

  // Function to handle sort option changes
  const handleSort = (option) => {
    setSortOption(option);
  };

  // Sort bots based on the selected sort option
  let sortedBots = [...bots];
  if (sortOption) {
    sortedBots = sortedBots.sort((a, b) => {
      if (a[sortOption] < b[sortOption]) return -1;
      if (a[sortOption] > b[sortOption]) return 1;
      return 0;
    });
  }

   return (
    <div>
      <SortBar />
      <div className="ui four column grid">
        <div className="row">
          {bots.map((bot) => (
            <div key={bot.id} className="column">
              <BotCard
                bot={bot}
                addToArmy={addToArmy}
                removeFromArmy={removeFromArmy} // Ensure removeFromArmy prop is passed
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}



export default BotCollection;