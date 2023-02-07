import './newProduct.css';
import { useState, useEffect } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import app from '../../firebase';
import { addProduct } from '../../redux/apiCallsAdmin';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function NewProductAdmin() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [stock, setStock] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { error } = useSelector((state) => state.productAdmin);
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    const inventory = [];

    if (
      file === null ||
      // size.length < 1 ||
      stock.length < 1 ||
      inputs.title === '' ||
      inputs.decs === ''
    ) {
      toast.warning('You need to enter all the information');
      return;
    }

    const fileName = new Date().getTime() + file?.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {},
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product = {
            ...inputs,
            image: downloadURL,
            inventory: inventory
          };
          console.log(product);
          addProduct(product, dispatch);
          if (!error) {
            navigate('/admin/products');
          }
        });
      }
    );
  };

  const [inventories, setInventories] = useState([{}]);
  const handleAdd = (e) => {
    e.preventDefault();
    const newData = {};
    setInventories([...inventories, newData]);
  };
  console.log(inventories);
  const handleDelete = (e) => {
    e.preventDefault();
  };

  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">New Product</h1>
        <form className="addProductForm">
          <div className="addProductContainer1">
            <div className="addProductItem">
              <label>Image</label>
              <input
                type="file"
                id="file"
                multiple
                onChange={(e) => {
                  console.log(e.target.files);
                  // return setFile(e.target.files[0])
                }}
              />
            </div>
            <div className="addProductItem">
              <label>Name</label>
              <input type="text" name="name" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input type="text" name="description" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Category</label>
              <select />
            </div>
            <div className="addProductItem">
              <label>Brand</label>
              <select />
            </div>
            <div className="addProductItem">
              <label>ProductInventories</label>
              <div className="inventory">
                {inventories.map((item, index) => {
                  return (
                    <div>
                      <span>productAttribute: </span>
                      <input
                        type="text"
                        name="productAttribute"
                        className="inventoryProduct"
                        onChange={handleChange}
                      ></input>{' '}
                      <br />
                      <span>value: </span>
                      <input type="text" name="value" className="inventoryProduct" onChange={handleChange}></input>
                      {index !== 0 && <button onClick={handleDelete}>-</button>}
                    </div>
                  );
                })}
              </div>
              <button onClick={handleAdd}>+</button>
            </div>
            <div className="addProductItem">
              <label>RetailPrice</label>
              <input type="Number" name="retailPrice" onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Units</label>
              <input type="text" name="units" onChange={handleChange} />
            </div>
            <button className="addProductButton" onClick={handleClick}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
