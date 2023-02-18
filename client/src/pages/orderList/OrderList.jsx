import './orderList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/apiCallsAdmin';
import { format } from 'timeago.js';
import axios from 'axios';
import { userRequest } from '../../requestMethods';

export default function OrderList() {
  const dispatch = useDispatch();
  const [orders, setOrder] = useState([]);
  const [orderStatus, setOrderStatus] = useState([]);
  // const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      const order = await userRequest.get('/order/order', { params: { size: 10000 } });
      setOrder(order?.data?.content);
    };
    callApi();
  }, []);

  useEffect(() => {
    let orderS = [];

    console.log(orders);
    orders.map((item) => {
      orderS.push(item);
    });
    setOrderStatus(orderS);
  }, [orders]);

  const handleDelete = async (code) => {
    await userRequest.post(`/order/order/delete/${code}`);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'name',
      headerName: 'Tên người mua',
      width: 160
    },
    {
      field: 'email',
      headerName: 'email người mua',
      width: 160
    },
    {
      field: 'status',
      headerName: 'trạng thái',
      width: 130
    },
    {
      field: 'createdAt',
      headerName: 'ngày mua',
      width: 130,
      renderCell: (params) => {
        return <>{format(params.row.createdAt)}</>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 140,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/admin/order/' + params.row.code}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row.code)} />
          </>
        );
      }
    }
  ];
  const rows = orderStatus;

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Đặt hàng</h1>
      </div>
      <DataGrid
        rows={rows}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
