import './orderList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, deleteOrder } from '../../redux/apiCallsAdmin';
import { format } from 'timeago.js';

export default function Approved() {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.orderAdmin.orders);
  const [orderStatus, setOrderStatus] = useState([]);
  const users = useSelector((state) => state.usersAdmin.users);

  let orders = JSON.parse(JSON.stringify(order));

  let orderS = [];

  useEffect(() => {
    orders.map((item) => {
      if (item.status !== 'pending') {
        orderS.push(item);
      }
    });
    setOrderStatus(orderS);
  }, [order]);

  useEffect(() => {
    getOrders(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteOrder(id, dispatch);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'userName',
      headerName: 'Name customer',
      width: 160
    },
    { field: 'amount', headerName: 'amount', width: 130 },
    {
      field: 'status',
      headerName: 'status',
      width: 130
    },
    {
      field: 'createdAt',
      headerName: 'date',
      width: 130,
      renderCell: (params) => {
        return <>{format(params.row.createdAt)}</>;
      }
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 130,
      renderCell: (params) => {
        return (
          <>
            <Link to={'/admin/order/' + params.row.id}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline className="productListDelete" onClick={() => handleDelete(params.row.id)} />
          </>
        );
      }
    }
  ];
  const rows = orderStatus;

  // orderStatus &&
  //   orderStatus.forEach((item) => {
  //     users.forEach((user) => {
  //       item.userId === user.id &&
  //         rows.push({
  //           id: item.id,
  //           userName: user.username,
  //           amount: item.amount,
  //           status: item.status,
  //           createdAt: item.createdAt,
  //         });
  //     });
  //   });

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Delivery</h1>
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
