import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GameState } from "../../types";
import { useGame } from "../../context/GameContext";
import { Crown } from "lucide-react";

const PlayerDisplay: React.FC = () => {
  const { room } = useGame();

  // Variants for child elements to slide in
  const slideInVariants = {
    hidden: { x: "-100%", opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="flex flex-col self-start bg-gray-900 rounded-lg w-full p-3 gap-2 overflow-hidden relative"
      layout // Add the layout prop to animate layout changes smoothly
    >
      {room.players.length === 0 && (
        <span className="opacity-70 text-center">Waiting for players</span>
      )}
      <AnimatePresence>
        {room.players.map((player) => (
          <motion.div
            className="relative flex items-center"
            initial="hidden"
            animate="visible"
            exit={{ x: "100%", opacity: 0 }}
            variants={slideInVariants}
            transition={{ duration: 0.2 }}
            key={player.id}
            layout
          >
            {/* Indicator bar */}
            {room.state !== GameState.Lobby &&
              room.currentPlayer.id === player.id && (
                <motion.div
                  className="absolute left-0 w-1 h-full transition-colors duration-150"
                  layoutId="indicator" // This ID will allow the bar to smoothly move between players
                  initial={false} // Prevent initial animation on mount
                  animate={{ x: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ backgroundColor: player.appearance }}
                />
              )}

            {/* Player details */}
            <motion.div className="flex-grow p-4 rounded shadow-md bg-slate-950">
              <div className="flex items-center gap-2">
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: player.appearance }}
                ></div>
                <h2 className="text-xl font-bold">{player.name}</h2>
                {room.host?.id === player.id && (
                  <span>
                    <Crown />
                  </span>
                )}
              </div>
              {room.state !== GameState.Lobby && (
                <p className="">
                  <span className="opacity-70">$ </span>
                  <span
                    className={`text-lg font-semibold ${
                      player.money < 0 ? "text-red-600" : "text-white"
                    }`}
                  >
                    {player.money}
                  </span>
                </p>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayerDisplay;
