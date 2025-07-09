import { CreateAndUpdateItem } from "../dto/item/index.js";
import Item from "../model/Item.js";
import sendResponse from "../utility/utility.js";

export const CreateItem = async (req, res) => {
  try {
    const {
      itemName,
      itemDescription,
      itemType,
      healing,
      strength,
      magic,
      sellingCost,
    } = req.body;
    if (!itemName) {
      return sendResponse(res, 404, "Item Name is required");
    }
    if (!itemDescription) {
      return sendResponse(res, 404, "Item Description is required");
    }
    if (!itemType) {
      return sendResponse(res, 404, "Item Type is required");
    }
    if (!sellingCost) {
      return sendResponse(res, 404, "Selling Cost is required");
    }
    const item = await Item.findOne({ itemName });
    if (item) {
      return sendResponse(res, 400, "Item title already exists");
    }
    const newItem = await Item.create({
      itemName,
      itemDescription,
      itemType,
      healing,
      strength,
      magic,
      sellingCost,
    });
    const response = CreateAndUpdateItem(newItem);
    return sendResponse(res, 200, "Item Created Successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create Item",
      null,
      1,
      error.message
    );
  }
};

export const UpdateItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const {
      itemName,
      itemDescription,
      itemType,
      healing,
      strength,
      magic,
      sellingCost,
    } = req.body;
    if (!itemId) {
      sendResponse(res, 404, "Please Enter the Item Id");
    }
    const item = await Item.findOne({ itemId });
    if (!item) {
      sendResponse(res, 404, `Item with ID: ${itemId} Not found`);
    }
    if (!itemName) {
      return sendResponse(res, 404, "Item Name is required");
    }
    if (!itemDescription) {
      return sendResponse(res, 404, "Item Description is required");
    }
    if (!itemType) {
      return sendResponse(res, 404, "Item Type is required");
    }
    if (!sellingCost) {
      return sendResponse(res, 404, "Selling Cost is required");
    }
    item.itemName = itemName;
    item.itemDescription = itemDescription;
    item.itemType = itemType;
    item.healing = healing;
    item.strength = strength;
    item.magic = magic;
    item.sellingCost = sellingCost;
    await item.save();
    const response = CreateAndUpdateItem(item);
    return sendResponse(res, 200, "Item Updated Successfully", response);
  } catch (error) {
    return sendResponse(
      res,
      400,
      "Failed to create Item",
      null,
      1,
      error.message
    );
  }
};
