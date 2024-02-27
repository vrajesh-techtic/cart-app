import React, { useContext, useState } from "react";
import { PlusCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { List } from "antd";
import AllContextAPI from "./AllContextAPI";

const CartProduct = ({ prod, count }) => {
  const [prodCount, setProdCount] = useState(count);
  const addProduct = useContext(AllContextAPI);
  const [inx, setinx] = useState(
    addProduct.products.findIndex((i) => i.prod === prod)
  );

  const temp = addProduct.products;

  if (inx) {
    if (temp[inx]?.quantity === 0) {
      temp.splice(inx, 1);
    }
  }

  return (
    <>
      {prodCount > 0 && inx > 0 && temp.length > 1 ? (
        <List.Item className="flex text-lg">
          <p>{prod}</p>
          <div className="flex">
            <PlusCircleOutlined
              className="mx-2 text-xl"
              onClick={() => {
                setProdCount((j) => {
                  j = j + 1;

                  if (inx) {
                    temp[inx].quantity = j;
                  }
                  return j;
                });
              }}
            />
            <p className="w-[50px] p-1 text-center text-lg">{prodCount}</p>
            <MinusCircleOutlined
              className="mx-2 text-xl"
              onClick={() => {
                setProdCount((j) => {
                  if (j > 0 && inx > 0 && temp[inx]) {
                    j = j - 1;
                    temp[inx].quantity = j;
                  } else {
                    j = 0;
                  }

                  return j;
                });
              }}
            />
          </div>
        </List.Item>
      ) : null}
    </>
  );
};

export default CartProduct;
