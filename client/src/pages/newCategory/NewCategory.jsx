import './newProduct.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { userRequest } from '../../requestMethods';

export default function newCategory() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState();
  useEffect(() => {
    const callApi = async () => {
      const codeParent = await userRequest('/catalog/categories/all-category');
      setCategory(codeParent.data.map((item) => ({ label: item.name, value: item.code })));
    };
    callApi();
  }, []);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const categoryForm = {
      name: inputs.name,
      parentCode: inputs.parentCode
    };
    let bodyFormData = new FormData();
    bodyFormData.set('category-form', JSON.stringify(categoryForm));
    bodyFormData.set('image', file[0]);
    console.log(bodyFormData);
    await userRequest.post('/catalog/categories/add', bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });

    if (product.status === 200) {
      toast.success('thêm danh mục thành công');
      navigate('/admin/newCategory');
    } else {
      toast.warning('thêm danh mục thất bại');
    }
  };
  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">Thêm Loại Sản Phẩm</h1>
        <form className="addProductForm">
          <div className="addProductContainer1">
            <div className="addProductItem">
              <label>Ảnh</label>
              <input
                type="file"
                id="file"
                onChange={(e) => {
                  return setFile(e.target.files);
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Tên</label>
              <input type="text" name="name" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Danh mục cha</label>
              <select onChange={handleChange} name="parentCode">
                <option>option</option>
                {category?.map((cat) => {
                  return <option value={cat.value}>{cat.label}</option>;
                })}
              </select>
            </div>
            <button className="addProductButton" onClick={handleClick}>
              Thêm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
