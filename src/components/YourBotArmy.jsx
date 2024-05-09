import React, { useState, useEffect } from "react";
import BotCard from "./BotCard";

function YourBotArmy({ bots, removeFromArmy, enlistBot }) {
  const [botArmy, setBotArmy] = useState(bots);

  useEffect(() => {
    setBotArmy(bots);
  }, [bots]);

  const releaseBot = (botId) => {
    const updatedBotArmy = botArmy.filter((bot) => bot.id !== botId);
    setBotArmy(updatedBotArmy);
    removeFromArmy(botId);
  };

  console.log("Rendering YourBotArmy:", botArmy);

  const handleEnlist = (bot) => {
    enlistBot(bot); // Call enlistBot to add the bot to the main army
  };

  return (
    <div className="enlisted-bot">
      <div className="ui segment inverted olive bot-army">
        <div className="ui five row grid">
          <div className="row bot-army-row">
            <h1 className="title">
              <u>Your Bot Army</u>
            </h1>
            {botArmy &&
              botArmy.map((bot) => (
                <div className="column" key={bot.id}>
                  <BotCard
                    bot={bot}
                    onRelease={() => releaseBot(bot.id)}
                    onEnlist={() => handleEnlist(bot)}
                  />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default YourBotArmy;