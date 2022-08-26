import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increaseItem, decreaseItem, offer } from "../../actions";
import data from "../../data";

const Basket = () => {
  // console.log(cart);
  const cart = useSelector((state) => state);

  const dispatch = useDispatch();
  const [itemSubtotal, setItemSubtotal] = useState({});
  const [savings, setSavings] = useState({});
  const [savingsArr, setSavingsArr] = useState([]);

  useEffect(() => {
    cart?.forEach((item) => {
      offer(
        dispatch({
          type: "OFFER",
          payload: {
            cart,
            item,
            setSavings,
            setItemSubtotal,
          },
        })
      );
    });
    itemsNotInCart.forEach((item) => {
      defaultSavings(item);
    });
    // eslint-disable-next-line
  }, [cart]);

  let itemNameInCart = [];
  cart?.forEach((item) => {
    if (!itemNameInCart.includes(item.id)) {
      itemNameInCart.push(item.id);
    }
  });
  let itemsNotInCart = [];

  data.forEach((item) => {
    if (!itemNameInCart.includes(item.id)) {
      itemsNotInCart.push(item);
    }
  });
  const defaultSavings = (item) => {
    setSavings((prev) => ({
      ...prev,
      [item.id]: 0,
    }));
  };

  useEffect(() => {
    setSavingsArr(Object.values(savings));
  }, [savings]);

  // let savingsArr = Object.values(savings);
  const addition = (acc, currentValue) => {
    return acc + currentValue.price * currentValue.count;
  };
  const total = cart?.reduce(addition, 0);
  const addition2 = (acc, currentValue) => {
    return acc + currentValue;
  };
  const totalSavings = savingsArr?.reduce(addition2, 0);

  const handleIncrease = (item) => {
    increaseItem(dispatch({ type: "INCREASE_ITEM", payload: item }));
  };
  // console.log("itemSubtotal: " + itemSubtotal + " saving : " + savings);
  const handleDecrease = (item) => {
    decreaseItem(dispatch({ type: "DECREASE_ITEM", payload: item }));
  };
  // console.log(itemSubtotal, savings);

  return (
    <div className="app__basket bg-white p-8  mt-9 w-auto space-y-3 m-2 md:w-[45rem] text-xl md:text-2xl md:mt-2">
      <h2 className="text-4xl md:text-6xl">Basket</h2>
      <hr />
      {cart?.map((item) => {
        return (
          <div className="cartItem flex flex-col pt-2 space-y-2" key={item.id}>
            <div className="cartItem__count flex flex-row justify-between">
              <p className="font-medium text-2xl">{item.name}</p>
              <p className="text-left   ">
                <span className="text-gray-500   pr-1"> &#163;</span>
                {item.price}
              </p>
              <div className="count-btns w-40 flex flex-row justify-between">
                <button
                  className="text-lg px-4 bg-blue-400 text-white rounded-md hover:bg-blue-500"
                  onClick={() => handleIncrease(item)}
                >
                  +
                </button>
                <p>{item.count}</p>
                <button
                  className="text-lg px-4 bg-white text-black rounded-md border-0 border-blue-400 outline outline-1 outline-blue-500 hover:bg-blue-50"
                  onClick={() => {
                    if (item.count > 1) {
                      handleDecrease(item);
                    } else {
                      dispatch({ type: "REMOVE_ITEM", payload: item });
                    }
                  }}
                >
                  -
                </button>
              </div>
            </div>
            <p className="text-right text-sm text-gray-500">
              Item price: <span className=" pr-1"> &#163;</span>
              {item.price} * {item.count} ={" "}
              <span className="text-gray-500 pr-1"> &#163;</span>
              {item.price * item.count}
            </p>
            <hr />
            <p className="text-right text-xl text-red-500">
              Savings: {savings[item.id]}
            </p>
            <hr />
            <p className="text-right text-gray-800">
              Item cost <span className="text-gray-500   pr-1"> &#163;</span>
              {itemSubtotal[item.id]}
            </p>
            <hr className="border-gray-400" />
          </div>
        );
      })}

      <div className="app__basket-total flex-col ">
        <div className="subTotal flex flex-row justify-between my-4 ">
          <p className="font-semibold">Sub Total : </p>
          <p className="text-left">
            <span className="text-gray-500   pr-1"> &#163;</span>
            {total + totalSavings ? total + totalSavings : 0}
          </p>
        </div>
        <div className="subTotal  flex flex-row justify-between my-4">
          <p className="font-semibold">Savings : </p>
          <p className="text-left   ">
            <span className="text-gray-500   pr-1"> &#163;</span>
            {totalSavings}
          </p>
        </div>
        <div className="subTotal flex flex-row justify-between my-4 ">
          <p className="font-semibold">Total : </p>
          <p className="text-left   ">
            <span className="text-gray-500   pr-1"> &#163;</span>
            {total ? total : 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Basket;
