import { convertBoard } from "../lib/utils";
import { BlockType } from "../types";
import Block from "./Blocks/block";
import GoToJail from "./Blocks/GoToJail";
import Jail from "./Blocks/Jail";
import Start from "./Blocks/Start";
import Vacation from "./Blocks/Vacation";

const cityData = [
  {
    name: "Go",
    type: BlockType.Property,
    price: 0,
    owner: null,
    isMortgaged: false,
    country: "USA",
    playersInJail: [],
  },
  {
    name: "New York",
    type: BlockType.Property,
    price: 200,
    owner: null,
    isMortgaged: false,
    country: "USA",
    level: 0,
    housePrice: 100,
    hotelPrice: 200,
    playersInJail: [],
  },
  {
    name: "Chance Card",
    type: BlockType.Chance,
    isMortgaged: false,
    country: "USA",
    playersInJail: [],
  },
  {
    name: "Los Angeles",
    type: BlockType.Property,
    price: 180,
    owner: null,
    isMortgaged: false,
    country: "USA",
    level: 0,
    housePrice: 90,
    hotelPrice: 180,
    playersInJail: [],
  },
  {
    name: "Treasure Chest",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "UK",
    playersInJail: [],
  },
  {
    name: "London",
    type: BlockType.Property,
    price: 220,
    owner: null,
    isMortgaged: false,
    country: "UK",
    level: 0,
    housePrice: 110,
    hotelPrice: 220,
    playersInJail: [],
  },
  {
    name: "Income Tax",
    type: BlockType.IncomeTax,
    isMortgaged: false,
    country: "UK",
    playersInJail: [],
    blockType: 1,
  },
  {
    name: "Paris",
    type: BlockType.Property,
    price: 250,
    owner: null,
    isMortgaged: false,
    country: "France",
    level: 0,
    housePrice: 125,
    hotelPrice: 250,
    playersInJail: [],
  },
  {
    name: "Chance Card",
    type: BlockType.Chance,
    isMortgaged: false,
    country: "France",
    playersInJail: [],
  },
  {
    name: "Berlin",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
  {
    name: "Jail",
    type: BlockType.Jail,
    isMortgaged: false,
    country: "Germany",
    playersInJail: [],
    jailAmount: 50,
  },
  {
    name: "Munich",
    type: BlockType.Property,
    price: 280,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 140,
    hotelPrice: 280,
    playersInJail: [],
  },
  {
    name: "Treasure Chest",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "Germany",
    playersInJail: [],
  },
  {
    name: "Tokyo",
    type: BlockType.Property,
    price: 320,
    owner: null,
    isMortgaged: false,
    country: "France",
    level: 0,
    housePrice: 160,
    hotelPrice: 320,
    playersInJail: [],
  },
  {
    name: "Luxury Tax",
    type: BlockType.LuxuryTax,
    isMortgaged: false,
    country: "France",
    playersInJail: [],
    blockType: 2,
  },
  {
    name: "Beijing",
    type: BlockType.Property,
    price: 350,
    owner: null,
    isMortgaged: false,
    country: "France",
    level: 0,
    housePrice: 175,
    hotelPrice: 350,
    playersInJail: [],
  },
  {
    name: "Chicago",
    type: BlockType.Property,
    price: 210,
    owner: null,
    isMortgaged: false,
    country: "USA",
    level: 0,
    housePrice: 105,
    hotelPrice: 210,
    playersInJail: [],
  },
  {
    name: "Treasure Chest",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "USA",
    playersInJail: [],
  },
  {
    name: "Houston",
    type: BlockType.Property,
    price: 230,
    owner: null,
    isMortgaged: false,
    country: "USA",
    level: 0,
    housePrice: 115,
    hotelPrice: 230,
    playersInJail: [],
  },
  {
    name: "Chance Card",
    type: BlockType.Chance,
    isMortgaged: false,
    country: "USA",
    playersInJail: [],
  },
  {
    name: "Go to Jail",
    type: BlockType.GoToJail,
    isMortgaged: false,
    country: "USA",
    playersInJail: [],
    jailAmount: 0,
  },
  {
    name: "San Francisco",
    type: BlockType.Property,
    price: 260,
    owner: null,
    isMortgaged: false,
    country: "USA",
    level: 0,
    housePrice: 130,
    hotelPrice: 260,
    playersInJail: [],
  },

  {
    name: "Tokyo",
    type: BlockType.Property,
    price: 320,
    owner: null,
    isMortgaged: false,
    country: "Japan",
    level: 0,
    housePrice: 160,
    hotelPrice: 320,
    playersInJail: [],
  },
  {
    name: "Seoul",
    type: BlockType.Property,
    price: 340,
    owner: null,
    isMortgaged: false,
    country: "South Korea",
    level: 0,
    housePrice: 170,
    hotelPrice: 340,
    playersInJail: [],
  },
  {
    name: "Treasure Chest",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "South Korea",
    playersInJail: [],
  },
  {
    name: "Beijing",
    type: BlockType.Property,
    price: 350,
    owner: null,
    isMortgaged: false,
    country: "China",
    level: 0,
    housePrice: 175,
    hotelPrice: 350,
    playersInJail: [],
  },
  {
    name: "Sydney",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Australia",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
  {
    name: "Melbourne",
    type: BlockType.Property,
    price: 280,
    owner: null,
    isMortgaged: false,
    country: "Australia",
    level: 0,
    housePrice: 140,
    hotelPrice: 280,
    playersInJail: [],
  },

  {
    name: "Berlin",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
  {
    name: "Munich",
    type: BlockType.Property,
    price: 280,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 140,
    hotelPrice: 280,
    playersInJail: [],
  },
  {
    name: "Vacation",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "Australia",
    playersInJail: [],
  },
  {
    name: "Paris",
    type: BlockType.Property,
    price: 250,
    owner: null,
    isMortgaged: false,
    country: "France",
    level: 0,
    housePrice: 125,
    hotelPrice: 250,
    playersInJail: [],
  },
  {
    name: "Rome",
    type: BlockType.Property,
    price: 270,
    owner: null,
    isMortgaged: false,
    country: "Italy",
    level: 0,
    housePrice: 135,
    hotelPrice: 270,
    playersInJail: [],
  },
  {
    name: "Athens",
    type: BlockType.Property,
    price: 230,
    owner: null,
    isMortgaged: false,
    country: "Greece",
    level: 0,
    housePrice: 115,
    hotelPrice: 230,
    playersInJail: [],
  },
  {
    name: "Treasure Chest",
    type: BlockType.Tresure,
    isMortgaged: false,
    country: "Greece",
    playersInJail: [],
  },
  {
    name: "Lisbon",
    type: BlockType.Property,
    price: 210,
    owner: null,
    isMortgaged: false,
    country: "Portugal",
    level: 0,
    housePrice: 105,
    hotelPrice: 210,
    playersInJail: [],
  },
  {
    name: "Madrid",
    type: BlockType.Property,
    price: 250,
    owner: null,
    isMortgaged: false,
    country: "Spain",
    level: 0,
    housePrice: 125,
    hotelPrice: 250,
    playersInJail: [],
  },
  {
    name: "Berlin",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
  {
    name: "Barcelona",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
  {
    name: "Hamburg",
    type: BlockType.Property,
    price: 300,
    owner: null,
    isMortgaged: false,
    country: "Germany",
    level: 0,
    housePrice: 150,
    hotelPrice: 300,
    playersInJail: [],
  },
];

export default function Board() {
  return (
    <div className="flex justify-center w-full h-full scale-70">
      <div className="board">
        <div className="center w-full h-full flex items-center justify-center">
          CENTER
        </div>
        <Start />
        <Jail />
        <GoToJail />
        <Vacation />
        {convertBoard(cityData).map((e, i) => {
          let side = "top";
          switch (i) {
            case 1:
              side = "right";
              break;
            case 2:
              side = "bottom";
              break;
            case 3:
              side = "left";
              break;
          }
          return (
            <div className={`${side} flex justify-evenly`} key={i}>
              {e.map((e, i) => (
                <Block
                  key={i}
                  blockData={e}
                  orientation={side as "left" | "right" | "top" | "bottom"}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
