import React, { useContext } from "react";
import { Button, List, Modal } from "antd";
import AllContextAPI from "./AllContextAPI";
import CartProduct from "./CartProduct";
import { useNavigate } from "react-router";

const CartModal = ({ showModal, closeModal }) => {
  const addProduct = useContext(AllContextAPI);

  const navigate = useNavigate();

  return (
    <>
      <Modal
        title="Your Cart"
        centered
        className="flex"
        open={showModal}
        footer={null}
        okText={"Checkout"}
        onOk={closeModal}
        onCancel={closeModal}
      >
        <div className="border-2 border-black rounded-xl my-8 p-7">
          <List
            size="large"
            bordered
            dataSource={addProduct.products}
            renderItem={(item) => {
              return <CartProduct prod={item.prod} count={item.quantity} />;
            }}
          />

          <div className="flex mt-4 justify-end">
            <Button
              className="bg-red-400 mx-7 hover:bg-red-300 "
              onClick={() => {
                if (addProduct.products.length > 1) {
                  navigate("/profile");
                } else {
                  closeModal();
                  navigate("/");
                }
              }}
            >
              {addProduct.products.length > 1 ? "Checkout" : "Add to Cart"}
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CartModal;
