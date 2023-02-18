import './newBrand.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { userRequest } from '../../requestMethods';

export default function newBrand() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const brand = {
      name: inputs.name
    };
    const brands = await userRequest.post('/catalog/brands/add', brand);
    if (brands.status === 200) {
      toast.success('Thêm hãng sản xuất thành công');
      navigate('/admin/brand');
    } else {
      toast.warning('Thêm hãng sản xuất thất bại');
    }
  };
  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">Thêm hãng sản xuất</h1>
        <form className="addProductForm">
          <div className="addProductContainer1">
            <div className="addProductItem">
              <label>Tên</label>
              <input type="text" name="name" onChange={handleChange} />
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
