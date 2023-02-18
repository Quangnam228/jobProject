import './newProductAttribute.css';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMemo } from 'react';
import { userRequest } from '../../requestMethods';

export default function NewProductAttribute() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const productAttribute = {
      name: inputs.name
    };
    const productAttributes = await userRequest.post('/inventories/product-attributes/add', productAttribute);

    if (productAttributes.status === 200) {
      toast.success('thêm thuộc tính thành công');
      navigate('/admin/productAttribute');
    } else {
      toast.warning('thêm thuộc tính thất bại');
    }
  };
  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">Thêm thuộc tính</h1>
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
