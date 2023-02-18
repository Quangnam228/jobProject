import './categoryList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import { toast } from 'react-toastify';

export default function Category() {
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const categoryList = async () => {
      const res = await userRequest.get('catalog/categories/all-category');
      setCategory(res.data);
    };
    categoryList();
  }, []);
  const handleOpen = async (code) => {
    await userRequest.post(`/catalog/categories/delete/${code}`);
    toast.success('xóa thành công');
    window.location.reload(false);
  };
  const columns = [
    {
      field: 'imgUrl',
      headerName: 'Ảnh',
      width: 160,
      renderCell: (params) => {
        return <img src={params?.row.imgUrl} alt="" className="categoryInfoImg" />;
      }
    },
    { field: 'code', headerName: 'Mã sản phẩm', width: 220 },
    { field: 'name', headerName: 'Tên', width: 220 },
    { field: 'isActive', headerName: 'Trạng thái', width: 220 },
    {
      field: 'action',
      headerName: 'Action',
      width: 160,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline className="categoryListDelete" onClick={() => handleOpen(params.row.code)} />
          </>
        );
      }
    }
  ];

  return (
    <div className="categoryList">
      <div className="categoryTitleContainer">
        <h1 className="categoryTitle">Danh sách loại sản phẩm</h1>
        <Link to="/admin/newCategory">
          <button className="categoryAddButton">Thêm mới</button>
        </Link>
      </div>
      <DataGrid
        rows={category}
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
