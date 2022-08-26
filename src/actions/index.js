const addItem = (item) => {
  return {
    type: "ADD_ITEM",
    payload: item.payload,
  };
};

const removeItem = (item) => {
  return {
    type: "REMOVE_ITEM",
    payload: item.payload,
  };
};

const increaseItem = (item) => {
  return {
    type: "INCREASE_ITEM",
    payload: item.payload,
  };
};
const decreaseItem = (item) => {
  return {
    type: "DECREASE_ITEM",
    payload: item.payload,
  };
};

const offer = (
  item,
  cart,
  setItemSubtotal,
  isSoupInCart,
  soupCount,
  setSavings
) => {
  return {
    type: "OFFER",
    payload: {
      item,
      cart,
      setItemSubtotal,
      isSoupInCart,
      soupCount,
      setSavings,
    },
  };
};
export { addItem, removeItem, increaseItem, decreaseItem, offer };
