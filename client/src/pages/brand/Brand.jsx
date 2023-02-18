import './brandList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

export default function Brand() {
  const [brand, setBrand] = useState([]);

  useEffect(() => {
    const brandList = async () => {
      const res = await userRequest.get('catalog/brands');
      setBrand(res.data);
    };
    brandList();
  }, []);
  const handleOpen = async (code) => {
    await userRequest.post(`/catalog/brands/delete/${code}`);
    toast.success('xóa thành công');
    window.location.reload(false);
  };
  const columns = [
    { field: 'code', headerName: 'Mã sản phẩm', width: 220 },
    { field: 'name', headerName: 'Tên', width: 220 },
    { field: 'createdAt', headerName: 'Ngày tạo', width: 220 },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline className="brandListDelete" onClick={() => handleOpen(params.row.code)} />
          </>
        );
      }
    }
  ];

  return (
    <div className="brandList">
      <div className="brandTitleContainer">
        <h1 className="brandTitle">Danh sách hãng sản xuất</h1>
        <Link to="/admin/newBrand">
          <button className="brandAddButton">Thêm mới</button>
        </Link>
      </div>
      <DataGrid
        rows={brand}
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
