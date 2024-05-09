import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeartbeat,
  faBolt,
  faShield,
  faFistRaised,
  faPlusCircle,
  faAmbulance,
  faHatWizard,
  faStar,
  faShieldAlt,
} from "@fortawesome/free-solid-svg-icons";

// Define a mapping of bot classes to their corresponding FontAwesome icons
const botTypeClasses = {
  Assault: <FontAwesomeIcon icon={faFistRaised} />,
  Defender: <FontAwesomeIcon icon={faShieldAlt} />,
  Support: <FontAwesomeIcon icon={faPlusCircle} />,
  Medic: <FontAwesomeIcon icon={faAmbulance} />,
  Witch: <FontAwesomeIcon icon={faHatWizard} />,
  Captain: <FontAwesomeIcon icon={faStar} />,
};

function BotCard({ bot, addToArmy, removeFromArmy }) {
  // A click handler function to add a bot to the army.
  const handleClick = () => {
    addToArmy(bot);
  };

  // A click handler function to remove a bot from the army.
  const handleRemove = () => {
    fetch(`https://bot-battlr-challenge-2.onrender.com/bots/${bot.id}`, {
      method: "DELETE",
    })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to delete bot from backend");
      }
      // Call removeFromArmy if deletion is successful
      removeFromArmy(bot.id);
    })
    .catch((error) => {
      console.error("Error deleting bot from backend:", error);
      // Optionally handle error by alerting user or logging
    });
  };

  return (
    <div className="bot-card">
      <div className="ui card">
        <div className="image" onClick={handleClick}>
          <Link to={`/bot/${bot.id}`}>
            <img alt="Bot" src={bot.avatar_url} />
          </Link>
        </div>
        <div className="content">
          <div className="header">
            {bot.name}
            {botTypeClasses[bot.bot_class]}
          </div>
          <div className="meta text-wrap">
            <small>{bot.catchphrase}</small>
          </div>
        </div>
        <div className="extra content">
          <span>
            <FontAwesomeIcon icon={faHeartbeat} />
            {bot.health}
          </span>
          <span>
            <FontAwesomeIcon icon={faBolt} />
            {bot.damage}
          </span>
          <span>
            <FontAwesomeIcon icon={faShield} />
            {bot.armor}
          </span>
          <div className="ui center aligned segment basic">
            <button className="ui mini red button" onClick={handleRemove}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BotCard;
