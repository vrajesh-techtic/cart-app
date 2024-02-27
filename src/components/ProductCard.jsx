import React, { useContext, useState } from "react";
import { Button, notification, Card } from "antd";
import productData from "../data/product-data";
import AllContextAPI from "./AllContextAPI";

const { Meta } = Card;

const ProductCard = () => {
  const [productAdded, setProductAdded] = useState(false);

  const addProduct = useContext(AllContextAPI);

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: "Product added successfully!",
    });
  };

  function indexOfProd(prodName) {
    const inx = addProduct.products.findIndex((i) => i.prod === prodName);
    return inx;
  }

  return (
    <div className="flex justify-between  my-5">
      {contextHolder}
      {productData.map((i, key) => {
        return (
          <Card
            bordered
            key={key}
            className="p-2"
            hoverable
            style={{
              width: 240,
              border: "solid 2px black",
            }}
          >
            <div className="h-[200px] flex items-center my-2">
              <img className="h-fit" alt="example" src={i["image-url"]} />
            </div>
            <div className="h-[100px]">
              <Meta title={i.title} description={i.desc} />
            </div>
            <div>
              <p className="my-4 text-xl">Rs. {i.price}/-</p>
              <div className="flex justify-center">
                <Button
                  onClick={() => {
                    let inx = indexOfProd(i.title);
                    if (inx > 0) {
                      addProduct.products[inx].quantity =
                        addProduct.products[inx].quantity + 1;
                    } else {
                      let newProd = {
                        quantity: 1,
                        prod: i.title,
                        price: i.price,
                      };

                      addProduct.products.push(newProd);
                    }

                    setProductAdded((prev) => {
                      openNotificationWithIcon("success");
                      return !prev;
                    });
                  }}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default ProductCard;
