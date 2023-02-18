import React, { useEffect, useState } from 'react';
import './orderDetail.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

export default function OrderDetailAdmin() {
  const location = useLocation();
  const orderId = location.pathname.split('/')[3];
  const [orderDetail, setOrderDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const order = async () => {
      const data = await userRequest.get(`/order/order/code/${orderId}`);
      setOrderDetail(data?.data);
    };
    order();
  }, []);

  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleClick = async (e) => {
    e.preventDefault();
    await userRequest.post(`/order/order/change-status/${orderId}`, {}, { params: { status: inputs?.status } });

    toast.success('cập nhât trạng thái thành công');
    navigate('/admin/orders');
  };
  const handleShowProduct = () => {
    return (
      <>
        {orderDetail?.cartItems.map((item, index) => (
          <>
            <div key={item.productDto.code}>
              <img src={item.productDto.imgUrl} alt="Product" />
              <span>{item.productDto.description}</span>
              <span>Giá {item.inventoryItem.retailPrice}</span>
            </div>
          </>
        ))}
      </>
    );
  };
  return (
    <div className="order">
      <h1 className="orderTitle">Chỉnh sửa đơn đặt hàng</h1>
      <div className="orderContainer">
        <div className="orderShow">
          <div className="orderShowTop">
            <div className="orderShowTopTitle">
              <span className="orderShowordername"></span>
            </div>
          </div>
          <div className="orderShowBottom">
            <span className="orderShowTitle">Chi tiết đơn hàng</span>

            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">{/* {`Id: `} {orderDetail.id} */}</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Khách hàng: `}
                {orderDetail?.name}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">Giá {orderDetail?.totals}VND</span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Trạng thái: `} {orderDetail?.status}
              </span>
            </div>
            <div className="orderShowInfo">
              <span className="orderShowInfoTitle">
                {`Địa chỉ: `} {orderDetail?.address}
              </span>
            </div>
            <div className="orderShowInfo confirmCartItemsContainer">{handleShowProduct()}</div>
          </div>
        </div>
        <div className="orderUpdate">
          <span className="orderUpdateTitle">Edit</span>
          {orderDetail?.status === 'pending' ? (
            <form className="orderUpdateForm">
              <div className="orderUpdateLeft">
                <div className="orderUpdateItem">
                  <label>trạng thái</label>
                  <select id="isAdmin" className="orderUpdateInput" onChange={handleChange} name="status">
                    <option name="status" value="pending">
                      Pending
                    </option>
                    <option name="status" value="approved">
                      Approved
                    </option>
                    <option name="status" value="delivery">
                      delivery
                    </option>
                    <option name="status" value="delivered">
                      delivered
                    </option>
                  </select>
                </div>
              </div>
              <div className="orderUpdateRight">
                <button className="orderUpdateButton" onClick={handleClick}>
                  Cập nhật
                </button>
              </div>
            </form>
          ) : (
            <form className="orderUpdateForm">
              <div className="orderUpdateLeft">
                <div className="orderUpdateItem">
                  <label>trạng thái</label>
                  <select id="isAdmin" className="orderUpdateInput" onChange={handleChange} name="status">
                    <option name="status" value="approved">
                      Approved
                    </option>
                    <option name="status" value="delivery">
                      delivery
                    </option>
                    <option name="status" value="delivered">
                      delivered
                    </option>
                  </select>
                </div>
              </div>
              <div className="orderUpdateRight">
                <button className="orderUpdateButton" onClick={handleClick}>
                  cập nhật
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
