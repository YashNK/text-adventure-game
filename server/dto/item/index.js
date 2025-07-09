export const CreateAndUpdateItem = (item) => {
  return {
    itemId: item.itemId,
    itemName: item.itemName,
    itemDescription: item.itemDescription,
    itemType: item.healing,
    strength: item.strength,
    magic: item.magic,
    sellingCost: item.sellingCost,
  };
};
