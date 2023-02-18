import './productList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProduct, getProducts } from '../../redux/apiCallsAdmin';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { FormGroup } from '@mui/material';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { userRequest } from '../../requestMethods';
import { async } from '@firebase/util';
import { toast } from 'react-toastify';

export default function ProductListAdmin() {
  const [products, setProduct] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const productlist = async () => {
      const res = await userRequest.get('/catalog/products', { params: { size: 10000000 } });
      setProduct(res.data.products);
    };
    productlist();
  }, []);
  const handleOpen = async (code) => {
    await userRequest.post(`/catalog/products/delete/${code}`);

    toast.success('xóa thành công');
    navigate('/admin/products');
  };
  const columns = [
    {
      field: 'imgUrl',
      headerName: '  ',
      width: 160,
      renderCell: (params) => {
        return <img src={params?.row.imgUrl} alt="" className="productInfoImg" />;
      }
    },
    { field: 'code', headerName: 'Mã sản phẩm', width: 220 },
    { field: 'name', headerName: 'Tên', width: 220 },
    {
      field: 'price',
      headerName: 'giá',
      width: 160
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <Link to={'' + params.row.code}>
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline className="productListDelete" onClick={() => handleOpen(params.row.code)} />
          </>
        );
      }
    }
  ];

  return (
    <div className="productList">
      <div className="productTitleContainer">
        <h1 className="productTitle">Danh sách sản phẩm</h1>
        <Link to="/admin/newproduct">
          <button className="productAddButton">Thêm mới</button>
        </Link>
      </div>
      <DataGrid
        rows={products}
        disableSelectionOnClick
        columns={columns}
        getRowId={(row) => row.code}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
};

const style2 = {
  display: 'flex',
  justifyContent: 'center'
};
