import React, { useState } from "react";
import { Block, BlockType } from "../types";

const generateRandomPrices = (
  price: number
): { housePrice: number; hotelPrice: number; rents: number[] } => {
  const housePrice = Math.round(price * 0.25); // 25%
  const hotelPrice = Math.round(price * 0.35); // 35%

  // Calculate rents
  const baseRent = Math.round(price * 0.4); // 40%
  const rent1 = baseRent * 2; // Rent for the 1st house
  const rent2 = baseRent * 3; // Rent for the 2nd house
  const rent3 = baseRent * 4; // Rent for the 3rd house
  const rent4 = baseRent * 5; // Rent for the 4th house
  const hotelRent = baseRent * 8; // Rent for hotel
  const rents = [baseRent, rent1, rent2, rent3, rent4, hotelRent];

  return { housePrice, hotelPrice, rents };
};

const countriesData: [string, string[], string][] = [
  [
    "United States",
    [
      "New York",
      "Los Angeles",
      "Chicago",
      "Houston",
      "Phoenix",
      "Philadelphia",
      "San Antonio",
      "San Diego",
      "Dallas",
      "San Jose",
      "Austin",
      "Jacksonville",
      "San Francisco",
      "Columbus",
      "Indianapolis",
      "Fort Worth",
      "Charlotte",
      "Detroit",
      "El Paso",
    ],
    "US",
  ],
  [
    "Canada",
    [
      "Toronto",
      "Vancouver",
      "Montreal",
      "Calgary",
      "Ottawa",
      "Edmonton",
      "Winnipeg",
      "Quebec City",
      "Hamilton",
      "Kitchener",
      "London",
      "Victoria",
      "Halifax",
      "Richmond",
      "Surrey",
      "Burnaby",
      "Mississauga",
      "Markham",
      "Brampton",
    ],
    "CA",
  ],
  [
    "United Kingdom",
    [
      "London",
      "Birmingham",
      "Manchester",
      "Glasgow",
      "Liverpool",
      "Newcastle",
      "Sheffield",
      "Leeds",
      "Edinburgh",
      "Bristol",
      "Cardiff",
      "Nottingham",
      "Southampton",
      "Leicester",
      "Coventry",
      "Bradford",
      "Hull",
      "Stoke-on-Trent",
      "Middlesbrough",
    ],
    "GB",
  ],
  [
    "Australia",
    [
      "Sydney",
      "Melbourne",
      "Brisbane",
      "Perth",
      "Adelaide",
      "Gold Coast",
      "Canberra",
      "Hobart",
      "Darwin",
      "Newcastle",
      "Central Coast",
      "Sunshine Coast",
      "Wollongong",
      "Coffs Harbour",
      "Geelong",
      "Toowoomba",
      "Maitland",
      "Orange",
      "Ballarat",
    ],
    "AU",
  ],
  [
    "Germany",
    [
      "Berlin",
      "Hamburg",
      "Munich",
      "Cologne",
      "Frankfurt",
      "Stuttgart",
      "Düsseldorf",
      "Dortmund",
      "Essen",
      "Leipzig",
      "Bremen",
      "Dresden",
      "Hannover",
      "Nuremberg",
      "Duisburg",
      "Bochum",
      "Wuppertal",
      "Bonn",
      "Mönchengladbach",
    ],
    "DE",
  ],
  [
    "France",
    [
      "Paris",
      "Marseille",
      "Lyon",
      "Toulouse",
      "Nice",
      "Nantes",
      "Montpellier",
      "Strasbourg",
      "Bordeaux",
      "Lille",
      "Rennes",
      "Reims",
      "Le Havre",
      "Saint-Étienne",
      "Toulon",
      "Angers",
      "Grenoble",
      "Dijon",
      "Le Mans",
    ],
    "FR",
  ],
  [
    "Italy",
    [
      "Rome",
      "Milan",
      "Naples",
      "Turin",
      "Palermo",
      "Genoa",
      "Bologna",
      "Florence",
      "Catania",
      "Venice",
      "Verona",
      "Messina",
      "Padua",
      "Trieste",
      "Bari",
      "Parma",
      "Modena",
      "Prato",
      "Reggio Emilia",
    ],
    "IT",
  ],
  [
    "Spain",
    [
      "Madrid",
      "Barcelona",
      "Valencia",
      "Seville",
      "Zaragoza",
      "Malaga",
      "Murcia",
      "Palma de Mallorca",
      "Las Palmas",
      "Bilbao",
      "Alicante",
      "Córdoba",
      "Valladolid",
      "Granada",
      "Oviedo",
      "San Sebastián",
      "Salamanca",
      "Logroño",
      "Toledo",
    ],
    "ES",
  ],
  [
    "Brazil",
    [
      "São Paulo",
      "Rio de Janeiro",
      "Salvador",
      "Fortaleza",
      "Belo Horizonte",
      "Brasília",
      "Curitiba",
      "Recife",
      "Porto Alegre",
      "Manaus",
      "Belém",
      "Goiânia",
      "São Luís",
      "Maceió",
      "Natal",
      "João Pessoa",
      "Teresina",
      "Aracaju",
      "Vitória",
    ],
    "BR",
  ],
  [
    "Mexico",
    [
      "Mexico City",
      "Guadalajara",
      "Monterrey",
      "Puebla",
      "Cancun",
      "Mérida",
      "Tijuana",
      "León",
      "Ciudad Juárez",
      "San Luis Potosí",
      "Querétaro",
      "Culiacán",
      "Aguascalientes",
      "Hermosillo",
      "Saltillo",
      "Torreón",
      "Chihuahua",
      "Morelia",
      "Zacatecas",
    ],
    "MX",
  ],
  [
    "China",
    [
      "Beijing",
      "Shanghai",
      "Guangzhou",
      "Shenzhen",
      "Chengdu",
      "Hangzhou",
      "Wuhan",
      "Xi'an",
      "Suzhou",
      "Nanjing",
      "Tianjin",
      "Dongguan",
      "Foshan",
      "Shijiazhuang",
      "Jinan",
      "Zhengzhou",
      "Chongqing",
      "Kunming",
      "Qingdao",
    ],
    "CN",
  ],
  [
    "Japan",
    [
      "Tokyo",
      "Osaka",
      "Nagoya",
      "Yokohama",
      "Kobe",
      "Fukuoka",
      "Kawasaki",
      "Sapporo",
      "Hiroshima",
      "Sendai",
      "Kyoto",
      "Saitama",
      "Chiba",
      "Shizuoka",
      "Hamamatsu",
      "Nagasaki",
      "Okayama",
      "Kumamoto",
      "Oita",
    ],
    "JP",
  ],
  [
    "India",
    [
      "Mumbai",
      "Delhi",
      "Bangalore",
      "Hyderabad",
      "Chennai",
      "Kolkata",
      "Ahmedabad",
      "Pune",
      "Jaipur",
      "Surat",
      "Lucknow",
      "Kanpur",
      "Nagpur",
      "Indore",
      "Thane",
      "Bhopal",
      "Visakhapatnam",
      "Vadodara",
      "Coimbatore",
    ],
    "IN",
  ],
  [
    "South Korea",
    [
      "Seoul",
      "Busan",
      "Incheon",
      "Daegu",
      "Daejeon",
      "Gwangju",
      "Suwon",
      "Ulsan",
      "Jeonju",
      "Jeju",
      "Gumi",
      "Chuncheon",
      "Wonju",
      "Pohang",
      "Andong",
      "Changwon",
      "Jeonju",
      "Jinju",
      "Gyeongju",
    ],
    "KR",
  ],
  [
    "Russia",
    [
      "Moscow",
      "Saint Petersburg",
      "Novosibirsk",
      "Yekaterinburg",
      "Nizhny Novgorod",
      "Kazan",
      "Omsk",
      "Samara",
      "Rostov-on-Don",
      "Ufa",
      "Volgograd",
      "Krasnoyarsk",
      "Perm",
      "Voronezh",
      "Saratov",
      "Krasnodar",
      "Tolyatti",
      "Izhevsk",
      "Ulyanovsk",
    ],
    "RU",
  ],
  [
    "Turkey",
    [
      "Istanbul",
      "Ankara",
      "Izmir",
      "Bursa",
      "Antalya",
      "Adana",
      "Konya",
      "Gaziantep",
      "Mersin",
      "Kayseri",
      "Eskisehir",
      "Denizli",
      "Diyarbakir",
      "Samsun",
      "Trabzon",
      "Sanliurfa",
      "Kocaeli",
      "Manisa",
      "Balikesir",
    ],
    "TR",
  ],
  [
    "South Africa",
    [
      "Johannesburg",
      "Cape Town",
      "Durban",
      "Pretoria",
      "Port Elizabeth",
      "East London",
      "Bloemfontein",
      "Polokwane",
      "Nelspruit",
      "Pietermaritzburg",
      "Kimberley",
      "Kuruman",
      "Mthatha",
      "Vereeniging",
      "George",
      "Welkom",
      "Randburg",
      "Roodepoort",
      "Benoni",
    ],
    "ZA",
  ],
  [
    "Argentina",
    [
      "Buenos Aires",
      "Córdoba",
      "Rosario",
      "Mendoza",
      "La Plata",
      "San Miguel de Tucumán",
      "Salta",
      "Santa Fe",
      "San Juan",
      "Neuquén",
      "Posadas",
      "Bahía Blanca",
      "San Salvador de Jujuy",
      "Mar del Plata",
      "Formosa",
      "Río Cuarto",
      "Zárate",
      "Villa María",
      "San Fernando del Valle de Catamarca",
    ],
    "AR",
  ],
  [
    "Colombia",
    [
      "Bogotá",
      "Medellín",
      "Cali",
      "Barranquilla",
      "Cartagena",
      "Bucaramanga",
      "Santa Marta",
      "Cúcuta",
      "Pereira",
      "Ibagué",
      "Manizales",
      "Neiva",
      "Villavicencio",
      "Montería",
      "Sincelejo",
      "Armenia",
      "Tunja",
      "Pasto",
      "Popayán",
    ],
    "CO",
  ],
  [
    "Chile",
    [
      "Santiago",
      "Valparaíso",
      "Concepción",
      "La Serena",
      "Antofagasta",
      "Temuco",
      "Rancagua",
      "Iquique",
      "Puerto Montt",
      "Calama",
      "Arica",
      "Osorno",
      "Copiapó",
      "Talca",
      "Los Andes",
      "Punta Arenas",
      "Viña del Mar",
      "Chillán",
      "Curicó",
    ],
    "CL",
  ],
  [
    "Peru",
    [
      "Lima",
      "Arequipa",
      "Trujillo",
      "Chiclayo",
      "Piura",
      "Iquitos",
      "Cusco",
      "Puno",
      "Huancayo",
      "Chimbote",
      "Tacna",
      "Juliaca",
      "Jauja",
      "Pucallpa",
      "Sullana",
      "Nazca",
      "Ayacucho",
      "Huaraz",
      "Tarapoto",
    ],
    "PE",
  ],
  [
    "Venezuela",
    [
      "Caracas",
      "Maracaibo",
      "Valencia",
      "Barquisimeto",
      "Ciudad Guayana",
      "Mérida",
      "San Cristóbal",
      "Puerto Ordaz",
      "Cumaná",
      "Maturín",
      "Lechería",
      "Los Teques",
      "Pto. La Cruz",
      "Guatire",
      "Guarenas",
      "El Tigre",
      "Tinaquillo",
      "Cagua",
      "Acarigua",
    ],
    "VE",
  ],
  [
    "Uruguay",
    [
      "Montevideo",
      "Salto",
      "Paysandú",
      "Rivera",
      "Tacuarembó",
      "Melo",
      "Durazno",
      "Canelones",
      "San José de Mayo",
      "Young",
      "Florida",
      "Treinta y Tres",
      "Artigas",
      "Progreso",
      "Nueva Helvecia",
      "Colonia del Sacramento",
      "La Paz",
      "Tarariras",
      "Rosario",
    ],
    "UY",
  ],
  [
    "Paraguay",
    [
      "Asunción",
      "Ciudad del Este",
      "San Lorenzo",
      "Luque",
      "Encarnación",
      "Pedro Juan Caballero",
      "Coronel Oviedo",
      "Hernandarias",
      "Alto Paraná",
      "Caaguazú",
      "Villarrica",
      "Itauguá",
      "Caacupé",
      "San Pedro",
      "Ñemby",
      "Concepción",
      "Avellaneda",
      "San Juan Bautista",
      "Itapúa",
    ],
    "PY",
  ],
  [
    "Bolivia",
    [
      "La Paz",
      "Santa Cruz de la Sierra",
      "Cochabamba",
      "Oruro",
      "Sucre",
      "Tarija",
      "Potosí",
      "El Alto",
      "Yacuiba",
      "Beni",
      "Trinidad",
      "Riberalta",
      "Pailón",
      "Villazón",
      "San Ignacio de Velasco",
      "Cuba",
      "Tiquipaya",
      "Montero",
      "Carmelo",
    ],
    "BO",
  ],
  [
    "Ecuador",
    [
      "Quito",
      "Guayaquil",
      "Cuenca",
      "Machala",
      "Loja",
      "Ambato",
      "Esmeraldas",
      "Ibarra",
      "Durán",
      "Manta",
      "Riobamba",
      "Santo Domingo",
      "Latacunga",
      "El Coca",
      "Baba",
      "Jipijapa",
      "Cayambe",
      "Salinas",
      "Mochala",
    ],
    "EC",
  ],
  [
    "Bolivia",
    [
      "La Paz",
      "Santa Cruz de la Sierra",
      "Cochabamba",
      "Oruro",
      "Sucre",
      "Tarija",
      "Potosí",
      "El Alto",
      "Yacuiba",
      "Beni",
      "Trinidad",
      "Riberalta",
      "Pailón",
      "Villazón",
      "San Ignacio de Velasco",
      "Cuba",
      "Tiquipaya",
      "Montero",
      "Carmelo",
    ],
    "BO",
  ],
  [
    "Peru",
    [
      "Lima",
      "Arequipa",
      "Trujillo",
      "Chiclayo",
      "Piura",
      "Iquitos",
      "Cusco",
      "Puno",
      "Huancayo",
      "Chimbote",
      "Tacna",
      "Juliaca",
      "Jauja",
      "Pucallpa",
      "Sullana",
      "Nazca",
      "Ayacucho",
      "Huaraz",
      "Tarapoto",
    ],
    "PE",
  ],
  [
    "Venezuela",
    [
      "Caracas",
      "Maracaibo",
      "Valencia",
      "Barquisimeto",
      "Ciudad Guayana",
      "Mérida",
      "San Cristóbal",
      "Puerto Ordaz",
      "Cumaná",
      "Maturín",
      "Lechería",
      "Los Teques",
      "Pto. La Cruz",
      "Guatire",
      "Guarenas",
      "El Tigre",
      "Tinaquillo",
      "Cagua",
      "Acarigua",
    ],
    "VE",
  ],
  [
    "Uruguay",
    [
      "Montevideo",
      "Salto",
      "Paysandú",
      "Rivera",
      "Tacuarembó",
      "Melo",
      "Durazno",
      "Canelones",
      "San José de Mayo",
      "Young",
      "Florida",
      "Treinta y Tres",
      "Artigas",
      "Progreso",
      "Nueva Helvecia",
      "Colonia del Sacramento",
      "La Paz",
      "Tarariras",
      "Rosario",
    ],
    "UY",
  ],
  [
    "Paraguay",
    [
      "Asunción",
      "Ciudad del Este",
      "San Lorenzo",
      "Luque",
      "Encarnación",
      "Pedro Juan Caballero",
      "Coronel Oviedo",
      "Hernandarias",
      "Alto Paraná",
      "Caaguazú",
      "Villarrica",
      "Itauguá",
      "Caacupé",
      "San Pedro",
      "Ñemby",
      "Concepción",
      "Avellaneda",
      "San Juan Bautista",
      "Itapúa",
    ],
    "PY",
  ],
  [
    "Bolivia",
    [
      "La Paz",
      "Santa Cruz de la Sierra",
      "Cochabamba",
      "Oruro",
      "Sucre",
      "Tarija",
      "Potosí",
      "El Alto",
      "Yacuiba",
      "Beni",
      "Trinidad",
      "Riberalta",
      "Pailón",
      "Villazón",
      "San Ignacio de Velasco",
      "Cuba",
      "Tiquipaya",
      "Montero",
      "Carmelo",
    ],
    "BO",
  ],
  [
    "Ecuador",
    [
      "Quito",
      "Guayaquil",
      "Cuenca",
      "Machala",
      "Loja",
      "Ambato",
      "Esmeraldas",
      "Ibarra",
      "Durán",
      "Manta",
      "Riobamba",
      "Santo Domingo",
      "Latacunga",
      "El Coca",
      "Baba",
      "Jipijapa",
      "Cayambe",
      "Salinas",
      "Mochala",
    ],
    "EC",
  ],
];
const MapGenerator: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      name: "Go",
      type: BlockType.Start,
      isMortgaged: false,
      country: { id: "", name: "" },
      payments: [],
      erections: 0,
    },
    ...Array(9).fill(null),
    {
      name: "Jail",
      type: BlockType.Jail,
      isMortgaged: false,
      country: { id: "", name: "" },
      payments: [],
      erections: 0,
      playersInJail: [],
    },
    ...Array(9).fill(null),
    {
      name: "Vacation",
      type: BlockType.Vacation,
      isMortgaged: false,
      country: { id: "", name: "" },
      payments: [],
      erections: 0,
    },
    ...Array(9).fill(null),
    {
      name: "Go To Jail",
      type: BlockType.GoToJail,
      isMortgaged: false,
      country: { id: "", name: "" },
      payments: [],
      erections: 0,
    },
    ...Array(9).fill(null),
  ]);

  const [selectedBlockType, setSelectedBlockType] = useState<BlockType>(
    BlockType.Start
  );
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [selectedBlockIdx, setSelectedBlockIdx] = useState<number>(1);

  // Additional state for Property specific fields
  const [price, setPrice] = useState<number | undefined>(undefined);
  const [housePrice, setHousePrice] = useState<number | undefined>(undefined);
  const [hotelPrice, setHotelPrice] = useState<number | undefined>(undefined);
  const [payments, setPayments] = useState<number[]>(Array(6).fill(0));

  const handleAddBlock = () => {
    const countryData = countriesData.find(
      ([country]) => country === selectedCountry
    );
    if (BlockType.Property === selectedBlockType && !countryData)
      return alert("Please select country and city");
    const countryId = countryData ? countryData[2] : "";
    let name = selectedCity;
    switch (selectedBlockType) {
      case BlockType.Airport:
        name = "Airport";
        break;
      case BlockType.Railway:
        name = "Railway";
        break;
      case BlockType.Transport:
        name = "Transport";
        break;
      case BlockType.Chance:
        name = "Chance";
        break;
      case BlockType.Tresure:
        name = "Tresure";
        break;
      case BlockType.IncomeTax:
        name = "Income Tax";
        break;
      case BlockType.LuxuryTax:
        name = "Luxury Tax";
        break;
      default:
        break;
    }

    const newBlock: Block = {
      name: name,
      type: selectedBlockType,
      isMortgaged: false,
      country: { id: countryId, name: selectedCountry },
      erections: 0,
      playersInJail: [],
      price: price || 0,
      housePrice: housePrice || 0,
      hotelPrice: hotelPrice || 0,
      payments: payments,
    };

    setBlocks(
      blocks.map((block, index) =>
        index === selectedBlockIdx ? newBlock : block
      )
    );
  };

  const exportToJson = () => {
    const jsonStr = JSON.stringify(blocks, null, 4);
    if (jsonStr.includes("null")) return alert("Please add all blocks.");
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "monopoly_board.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="container mx-auto p-4 text-black">
      <div className="grid grid-cols-10 gap-2 text-white">
        {blocks.map((block, index) => (
          <div
            key={index}
            className={`border border-gray-400 p-2 flex flex-col items-center justify-center ${
              index % 10 !== 0 && "cursor-pointer"
            } 
            ${blocks[index] === null ? "bg-red-950" : ""}
            ${selectedBlockIdx === index ? "!bg-green-900" : ""}
            `}
            onClick={() => {
              if (index % 10 !== 0) setSelectedBlockIdx(index);
            }}
          >
            {block?.name || "Empty"}
            <span className="text-xs">{block?.country.name || "Empty"}</span>
            <span className="text-xs">{block?.price || ""}</span>
          </div>
        ))}
      </div>
      <div className="flex flex-col space-y-5 items-center text-black">
        <div className="flex gap-5 mt-5">
          <div className="flex flex-col">
            <label className="block text-white">Block Type</label>
            <select
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
              value={selectedBlockType}
              onChange={(e) => {
                setSelectedBlockType(parseInt(e.target.value));
                setPrice(undefined);
                setHousePrice(undefined);
                setHotelPrice(undefined);
              }}
            >
              {Object.entries(BlockType).map((type) => {
                const key = parseInt(type[0]);
                if (Number.isNaN(key)) return;
                return (
                  <option key={key} value={key}>
                    {type[1]}
                  </option>
                );
              })}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-white">Country</label>
            <select
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
              value={selectedCountry}
              onChange={(e) => {
                setSelectedCountry(e.target.value);
                setSelectedCity(""); // Reset city when country changes
              }}
            >
              <option value="">Select Country</option>
              {countriesData.map(([country], i) => (
                <option key={i} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="block text-white">City</label>
            <select
              className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              disabled={!selectedCountry}
            >
              <option value="">Select City</option>
              {selectedCountry &&
                countriesData
                  .find(([country]) => country === selectedCountry)?.[1]
                  .map((city, i) => (
                    <option key={i} value={city}>
                      {city}
                    </option>
                  ))}
            </select>
          </div>
        </div>

        {/* Additional fields for Property, Railway, Transport, Airport, Chance */}
        {(selectedBlockType === BlockType.Property ||
          selectedBlockType === BlockType.Airport ||
          selectedBlockType === BlockType.Railway ||
          selectedBlockType === BlockType.Transport) && (
          <>
            <div className="flex gap-5 flex-wrap">
              <div className="flex flex-col">
                <label className="block text-white">Price</label>
                <input
                  type="number"
                  className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
                  value={price || ""}
                  onChange={(e) => {
                    const basePrice = Number(e.target.value);
                    const { housePrice, hotelPrice, rents } =
                      generateRandomPrices(basePrice);
                    setPrice(basePrice);
                    setHousePrice(housePrice);
                    setHotelPrice(hotelPrice);
                    setPayments(rents);
                  }}
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-white">House Price</label>
                <input
                  type="number"
                  className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
                  value={housePrice || ""}
                  onChange={(e) => setHousePrice(Number(e.target.value))}
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-white">Hotel Price</label>
                <input
                  type="number"
                  className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
                  value={hotelPrice || ""}
                  onChange={(e) => setHotelPrice(Number(e.target.value))}
                />
              </div>
            </div>
            <div className="flex gap-5 flex-wrap">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <div className="flex flex-col" key={i}>
                  <label className="block text-white">
                    {i === 0
                      ? "Base Rent"
                      : i >= 1 && i <= 4
                      ? `${i} house rent`
                      : "Hotel Rent"}
                  </label>
                  <input
                    type="number"
                    className="mt-1 px-4 py-2 block w-full border border-gray-300 rounded-md"
                    value={payments[i] ?? ""}
                    onChange={(e) => {
                      console.log(e.target.value, i);
                      setPayments(
                        payments.map((p, j) =>
                          j === i ? parseInt(e.target.value) : p
                        )
                      );
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        <div className="flex gap-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={handleAddBlock}
          >
            Add Block
          </button>
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-md"
            onClick={exportToJson}
          >
            Export to JSON
          </button>
        </div>
      </div>
    </div>
  );
};

export default MapGenerator;
