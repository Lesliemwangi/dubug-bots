import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Bot from "../src/components/Bot";
import BotSpecs from "../src/components/BotSpecs";
import "./App.css";
import "./index.css"

//The main App component.
function App() {
  //State to store an array of bots.
  const [bots, setBots] = useState([]);
  //State to store an array of bots in the army.
  const [botArmy, setBotArmy] = useState([]);

  /**
   * Function to handle adding a bot to the army.
   * It checks if the bot is not already in the army before adding it.
   * @param {object} bot The bot to be added to the army.
   */
  const addToArmy = (bot) => {
    if (!botArmy.some((armyBot) => armyBot.id === bot.id)) {
      setBotArmy([...botArmy, bot]);
    }
  };

  /**
   * Function to handle removing a bot from the army.
   * It filters out the bot with the given id from the army.
   * @param {number} botId The id of the bot to be removed from the army.
   */
  const removeFromArmy = (botId) => {
    const updatedBotArmy = botArmy.filter((bot) => bot.id !== botId);
    setBotArmy(updatedBotArmy);
  };

  /**
   * useEffect hook to fetch bots data from the API when the component mounts.
   * The dependency array includes botArmy, so the effect will re-run when botArmy changes.
   */
  useEffect(() => {
    fetch("https://bot-battlr-challenge-2.onrender.com/bots")
      .then((response) => response.json())
      .then((data) => setBots(data));
  }, [botArmy]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            //The root route, renders the Bot component with props.
            <Bot
              bots={bots}
              botArmy={botArmy}
              addToArmy={addToArmy}
              removeFromArmy={removeFromArmy}
            />
          }
        />
        <Route
          path="/bot/:id"
          element={
            //The route for a specific bot, renders the BotSpecs component with props.
            <BotSpecs addToArmy={addToArmy} />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;