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

  // Variants for parent to scale up slightly when a new child is added
  const parentVariants = {
    initial: { scale: 1 },
    animate: { scale: 1.05 },
    transition: { duration: 0.2, type: "spring", stiffness: 300 },
  };

  return (
    <motion.div
      className="flex flex-col self-start bg-gray-900 rounded-lg w-full p-3 gap-2 overflow-hidden"
      initial="initial"
      animate="animate"
      variants={parentVariants}
    >
      {room.players.length === 0 && (
        <span className="opacity-70 text-center">Waiting for players</span>
      )}
      <AnimatePresence>
        {room.players.map((player) => (
          <motion.div
            className="p-4 rounded shadow-md bg-slate-950 relative"
            initial="hidden"
            animate="visible"
            exit={{ x: "100%", opacity: 0 }} // Animation on exit
            variants={slideInVariants}
            transition={{ duration: 0.2 }}
            key={player.id}
          >
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
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default PlayerDisplay;
