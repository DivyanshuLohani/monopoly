import { useState } from "react";

export default function Dice() {
  const [text, setText] = useState("Rolling Dice...");

  function rollDice() {
    setText("Rolling Dice....");
    setTimeout(() => {
      const n1 = Math.floor(Math.random() * 6);
      const n2 = Math.floor(Math.random() * 6);

      setText(n1.toString() + ", " + n2.toString());
    }, 2000);
  }

  return (
    <div className="flex gap-10 flex-col">
      <span>{text}</span>

      <button
        className="bg-purple-600 hover:bg-purple-700 px-5 py-2 text-white rounded-full transition-colors duration-100 cursor-pointer"
        onClick={rollDice}
      >
        Roll Dice
      </button>
    </div>
  );
}
