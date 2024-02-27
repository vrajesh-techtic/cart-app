import React, { useContext, useState } from "react";
import AllContextAPI from "./AllContextAPI";
import { Card } from "antd";
import productData from "../data/product-data";
import Meta from "antd/es/card/Meta";
import CustomSideBar from "./CustomSidebar";

const Profile = () => {
  const addProduct = useContext(AllContextAPI);

  const [totalAmount, setTotalAmount] = useState(() => {
    let total = 0;
    if (addProduct.products.length > 1) {
      addProduct.products.map((i) =>
        i.quantity !== null
          ? (total += parseFloat(+i.quantity * +i.price))
          : null
      );
    }

    return total;
  });

  return (
    <CustomSideBar>
      <div className="flex flex-col items-center">
        <div className="border-2 flex  border-black rounded-xl mt-2 p-5">
          {addProduct.products.map((item, key) => {
            if (item.quantity !== null) {
              let prodObj = productData.find((i) => i.title === item.prod);

              return (
                <Card
                  bordered
                  key={key}
                  className="p-2 mx-2"
                  hoverable
                  style={{
                    width: 240,
                    border: "solid 2px black",
                  }}
                >
                  <div className="h-[200px] flex items-center my-2">
                    <img
                      className="h-fit"
                      alt="example"
                      src={prodObj["image-url"]}
                    />
                  </div>
                  <div className="h-[100px]">
                    <Meta title={prodObj.title} description={prodObj.desc} />
                  </div>
                  <div>
                    <p className="my-4 text-xl">Rs. {prodObj.price}/-</p>
                  </div>
                  <div>
                    <p className="my-4 text-md">
                      Quantity Purchased: {item.quantity}
                    </p>
                  </div>
                </Card>
              );
            }
          })}
        </div>
        <div className="border-2 text-3xl mt-5 w-fit">
          <p>Total Amount : Rs. {totalAmount} /-</p>
        </div>
      </div>
    </CustomSideBar>
  );
};

export default Profile;
