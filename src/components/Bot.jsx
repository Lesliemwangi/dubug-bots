import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

// This function takes in four props: botArmy, bots, addToArmy, and removeFromArmy
function Bot({ botArmy, bots, addToArmy, removeFromArmy }) {
  // It returns a div that contains two components: YourBotArmy and BotCollection
  return (
    <div>
      {/* The YourBotArmy component is passed the botArmy prop */}
      <YourBotArmy bots={botArmy} />
      {/* The BotCollection component is passed the bots, addToArmy, and removeFromArmy props */}
      <BotCollection
        bots={bots}
        addToArmy={() => addToArmy}
        removeFromArmy={removeFromArmy}
      />
    </div>
  );
}

export default Bot;