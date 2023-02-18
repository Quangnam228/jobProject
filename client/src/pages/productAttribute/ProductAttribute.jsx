import './productAttribute.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

export default function ProductAttribute() {
  const [productAttribute, setProductAttribute] = useState([]);

  useEffect(() => {
    const productAttributeList = async () => {
      const res = await userRequest.get('/inventories/product-attributes');
      setProductAttribute(res.data);
    };
    productAttributeList();
  }, []);
  const handleOpen = async (code) => {
    console.log(1);
    await userRequest.post(`/inventories/product-attributes/delete/${code}`);
    toast.success('xóa thành công');
    window.location.reload(false);
  };
  console.log(productAttribute);
  const columns = [
    { field: 'code', headerName: 'Mã sản phẩm', width: 220 },
    { field: 'name', headerName: 'Tên', width: 180 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 160 },
    { field: 'isActive', headerName: 'Trạng Thái', width: 160 },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline className="productAttributeListDelete" onClick={() => handleOpen(params.row.code)} />
          </>
        );
      }
    }
  ];

  return (
    <div className="productAttributeList">
      <div className="productAttributeTitleContainer">
        <h1 className="productAttributeTitle">Danh sách thuộc tính</h1>
        <Link to="/admin/newProductAttribute">
          <button className="productAttributeAddButton">Thêm mới</button>
        </Link>
      </div>
      <DataGrid
        rows={productAttribute}
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
