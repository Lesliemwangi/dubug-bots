import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFistRaised,
  faPlusCircle,
  faAmbulance,
  faHatWizard,
  faStar,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

// Define a mapping of bot classes to their corresponding FontAwesome icon classes
const botTypeClasses = {
  Assault: "fas fa-fist-raised",
  Defender: "fas fa-shield-alt",
  Support: "fas fa-plus-circle",
  Medic: "fas fa-ambulance",
  Witch: "fas fa-hat-wizard",
  Captain: "fas fa-star",
};

function BotSpecs({ addToArmy: addToArmyprops }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const [bot, setBot] = useState(null);
  const [botArmy, setBotArmy] = useState([]);

  useEffect(() => {
    // Fetch bot data based on the ID from the URL
    fetch(`https://bot-battlr-challenge-2.onrender.com/bots/${id}`)
     .then((response) => response.json())
     .then((data) => setBot(data))
     .catch((error) => console.error("Error fetching bot:", error));
  }, [id]);

  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

  const handleEnlist = () => {
    addToArmyprops(bot);
    navigate(-1);
  };

  const addToArmy = (bot) => {
    if (!botArmy.some((armyBot) => armyBot.id === bot.id)) {
      setBotArmy([...botArmy, bot]);
    }
  };

  if (!bot) {
    // Render loading state or error message while fetching bot data
    return <div>Loading...</div>;
  }

  return (
    <div className="ui segment">
      <div className="ui two column centered grid">
        <div className="row">
          <div className="four wide column">
            <img
              alt="oh no!"
              className="ui medium circular image bordered"
              src={bot.avatar_url}
            />
          </div>
          <div className="four wide column">
            <h2>Name: {bot.name}</h2>
            <p>
              <strong>Catchphrase: </strong>
              {bot.catchphrase}
            </p>
            <strong>
              Class: {bot.bot_class}
              <FontAwesomeIcon icon={botTypeClasses[bot.bot_class]} />
            </strong>
            <br />
            <div className="ui segment">
              <div className="row">
                <div className="column">
                  <strong> Health: {bot.health}</strong>
                </div>
                <div className="column">
                  <strong> Damage: {bot.damage}</strong>
                </div>
                <div className="column">
                  <strong> Armor: {bot.armor}</strong>
                </div>
              </div>
            </div>
          </div>
          <button className="ui button fluid" onClick={handleGoBack}>
            Go Back
          </button>
          <button className="ui button fluid" onClick={handleEnlist}>
            Enlist
          </button>
        </div>
      </div>
    </div>
  );
}

export default BotSpecs;