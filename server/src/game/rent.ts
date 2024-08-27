import { Block, BlockType, Room } from "../types";

export function getRentForBlock(room: Room, blockIndex: number) {
  const block = room.map.blocks[blockIndex];
  let rent = block.payments[block.erections];
  return rent;
}

export function getProperySet(room: Room, block: Block) {
  const properties: Block[] = [];
  room.map.blocks.forEach((e) => {
    if (e.country.id === block.country.id) properties.push(e);
  });
  return properties;
}

export function canBeSoldOrMortgaged(room: Room, blockIndex: number) {
  const property = room.map.blocks[blockIndex];
  if (
    property.type === BlockType.Chance ||
    property.type === BlockType.Start ||
    property.type === BlockType.Jail ||
    property.type === BlockType.Tresure ||
    property.type === BlockType.GoToJail ||
    property.type === BlockType.Vacation
  )
    return false;
  // Get the set for the property and check for erections in anyone of them
  const propertySet = getProperySet(room, property);
  let canBeSold = true;
  propertySet.forEach((e) => {
    if (e.erections > 0) canBeSold = false;
  });
  return canBeSold;
}

export function canBeErected(room: Room, property: Block) {
  if (
    property.type === BlockType.Chance ||
    property.type === BlockType.Start ||
    property.type === BlockType.Jail ||
    property.type === BlockType.Tresure ||
    property.type === BlockType.GoToJail ||
    property.type === BlockType.Airport ||
    property.type === BlockType.Railway ||
    property.type === BlockType.Transport ||
    property.type === BlockType.Vacation
  )
    return false;
  if (property.erections === 5) return false;
  let yes = true;
  const propertySet = getProperySet(room, property);
  propertySet.forEach((e) => {
    if (e.owner !== property.owner) {
      yes = false;
    } else if (room.settings.evenBuild) {
      const diff = Math.abs(e.erections - property.erections);
      if (diff > 1) yes = false;
    }
  });
  return yes;
}

export function canDemoiish(room: Room, property: Block) {
  if (property.erections === 0) return false;
  let yes = true;
  const propertySet = getProperySet(room, property);
  propertySet.forEach((e) => {
    if (e.owner !== property.owner) {
      yes = false;
    } else if (room.settings.evenBuild) {
      const diff = Math.abs(e.erections - property.erections);
      if (diff > 1) yes = false;
    }
  });
}
