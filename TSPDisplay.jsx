import React, { useCallback, useState } from "react";
import DisplayOption0 from "./parts/DisplayOption0";
import DisplayOption1 from "./parts/DisplayOption1";
import DisplayOption2 from "./parts/DisplayOption2";
import DisplayOption3 from "./parts/DisplayOption3";

export default function TSPDisplay() {
  const [selectedOption, setSelectedOption] = useState("DisplayOption0");
  return (
    <section id="tsp-display">
      <p>Vælg Vis bruger kort type:</p>
      <button onClick={() => setSelectedOption("DisplayOption1")}>
        Display type LiveCard
      </button>
      <button onClick={() => setSelectedOption("DisplayOption2")}>
        Display type Custom card
      </button>
      <button onClick={() => setSelectedOption("DisplayOption3")}>
        Display type andet
      </button>
      <div id="tsp-display-output">
        {selectedOption === "DisplayOption0" && <DisplayOption0 />}
        {selectedOption === "DisplayOption1" && <DisplayOption1 />}
        {selectedOption === "DisplayOption2" && <DisplayOption2 />}
        {selectedOption === "DisplayOption3" && <DisplayOption3 />}
      </div>
    </section>
  );
}
