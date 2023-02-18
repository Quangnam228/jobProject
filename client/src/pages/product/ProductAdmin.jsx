import { useState, useEffect, useRef } from 'react';
import { useMemo } from 'react';
import { userRequest } from '../../requestMethods';

export default function NewProductAdmin() {
  const [inputs, setInputs] = useState({});
  const [brands, setBrands] = useState();
  const [category, setCategory] = useState();
  const [attribute, setAttribute] = useState();
  const [productDetail, setProductDetail] = useState();
  const productId = location.pathname.split('/')[3];
  const [productInventories, setProductInventories] = useState([
    {
      attributeValues: [{ productAttribute: '', value: '' }],
      retailPrice: null,
      units: null
    }
  ]);
  useEffect(() => {
    const callApi = async () => {
      const brand = await userRequest.get('catalog/brands');
      setBrands(brand.data.map((item) => ({ label: item.name, value: item.id })));
      const category = await userRequest.get('catalog/categories');
      setCategory(category.data.map((item) => ({ label: item.name, value: item.code })));
      const att = await userRequest.get('/inventories/product-attributes');
      setAttribute(att.data.map((item) => ({ label: item.name, value: item.id })));
      const productDetail = await userRequest.get(`/catalog/products/product/${productId}`);
      setProductDetail(productDetail.data)
    };
    callApi();
  }, []);

  useEffect(() => {
    if (brands?.length) {
      setInputs(prevInputs => ({ ...prevInputs, brandId: productDetail?.brand?.id }))
    }
    if (category?.length) {
      category.map(cat => {
        if(cat.label === productDetail?.categories[0].name){
          setInputs(prevInputs => ({ ...prevInputs, categoryCode: cat.value}))
        }
      })
      console.log(inputs);
    }
  }, [brands, category, productDetail])

  const productInventory = useMemo(() => JSON.parse(JSON.stringify(productInventories)), [productInventories]);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleChangeProductInventories = (e, index, indexAttr) => {
    const newData = [...productInventory];
    if (e.target.name === 'productAttribute') {
      newData[index].attributeValues[indexAttr].productAttribute = e.target.value;
    }
    if (e.target.name === 'value') {
      newData[index].attributeValues[indexAttr].value = e.target.value;
    }
    setProductInventories(newData);
  };

  const handleChangeProductInven = (e, index) => {
    const newData = [...productInventory];
    if (e.target.name === 'retailPrice') {
      newData[index].retailPrice = e.target.value;
    }
    if (e.target.name === 'units') {
      newData[index].units = e.target.value;
    }
    setProductInventories(newData);
  };

  const handleAdd = (e, index, indexAttr) => {
    e.preventDefault();
    const newData = { productAttribute: '', value: '' };
    productInventory[index].attributeValues.push(newData);
    setProductInventories(productInventory);
  };
  const handleAddProductInventories = (e) => {
    e.preventDefault();
    const newData = {
      attributeValues: [{ productAttribute: '', value: '' }],
      retailPrice: null,
      units: null
    };
    setProductInventories([...productInventories, newData]);
  };
  const handleDeleteProductInventories = (e, index) => {
    e.preventDefault();
    JSON.parse(JSON.stringify(productInventory.splice(index, 1)));
    setProductInventories(productInventory);
  };

  const handleDelete = (e, index, indexAttr) => {
    e.preventDefault();
    productInventory[index].attributeValues.splice(indexAttr, 1);
    setProductInventories(productInventory);
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const _productInventories = productInventories.map((item) => {
      const attributeValues = item.attributeValues.reduce((total, property) => {
        return {
          ...total,
          [property.productAttribute]: property.value
        };
      }, {});
      return {
        ...item,
        attributeValues: attributeValues
      };
    });
    const data = {
      ...inputs,
      productInventoryPojos: [_productInventories]
    };
    await userRequest.post('/catalog/products/add', data);
  };
  return (
    <div className="newProduct">
      <div className="newProductContainer">
        <h1 className="addProductTitle">Cập nhật sản phẩm</h1>
        <form className="addProductForm">
          <div className="addProductContainer1">
            <div className="addProductItem">
              <label>Name</label>
              <input type="text" name="name" defaultValue={productDetail?.name} onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Description</label>
              <input type="text" name="description" defaultValue={productDetail?.description} onChange={handleChange} />
            </div>
            <div className="addProductItem">
              <label>Category</label>
              <select onChange={handleChange} value={inputs.categoryCode} name="categoryCode">
                {category?.map((cat) => {
                  return <option value={cat.value}>{cat.label}</option>;
                })}
              </select>
            </div>
            <div className="addProductItem">
              <label>Brand</label>
              <select onChange={handleChange} value={inputs.brandId} name="brandId">
                {brands?.map((brand) => {
                  return <option value={brand.value}>{brand.label}</option>;
                })}
              </select>
            </div>
            <div className="addProductItem">
              <div className="inventory">
                {productInventories?.map((productInvent, index) => {
                  return (
                    <>
                      <div>
                        <label>productInventories {index + 1}</label>{' '}
                        {index >= 1 && (
                          <button
                            className="buttonAdd"
                            onClick={(e) => {
                              handleDeleteProductInventories(e, index);
                            }}
                          >
                            - productInventories
                          </button>
                        )}
                        {productInvent.attributeValues.map((attributes, indexAttr) => {
                          return (
                            <>
                              <div className="RetailPriceUnits">
                                <select
                                  onChange={(e) => {
                                    handleChangeProductInventories(e, index, indexAttr);
                                  }}
                                  name="productAttribute"
                                  className="inventoryProduct"
                                >
                                  <option>productAttribute</option>
                                  {attribute?.map((att) => {
                                    return <option value={att.value}>{att.label}</option>;
                                  })}
                                </select>
                                <div>
                                  <input
                                    type="text"
                                    placeholder="value"
                                    name={`value`}
                                    className="inventoryProduct"
                                    onChange={(e) => {
                                      handleChangeProductInventories(e, index, indexAttr);
                                    }}
                                  />
                                </div>
                                {indexAttr >= 1 && (
                                  <button
                                    className="buttonSubProductInventories"
                                    onClick={(e) => {
                                      handleDelete(e, index, indexAttr);
                                    }}
                                  >
                                    -
                                  </button>
                                )}
                              </div>
                              <button
                                onClick={(e) => {
                                  handleAdd(e, index, indexAttr);
                                }}
                                className="buttonAddProductInventories"
                              >
                                +
                              </button>
                            </>
                          );
                        })}
                        <div className="RetailPriceUnits">
                          <div className="retailPrice">
                            <label>RetailPrice</label>
                            <input
                              type="Number"
                              name="retailPrice"
                              defaultValue={productDetail?.price}
                              onChange={(e) => {
                                handleChangeProductInven(e, index);
                              }}
                            />
                          </div>
                          <div className="units">
                            <label>Units</label>
                            <input
                              type="Number"
                              name="units"
                              defaultValue={productDetail?.totalUnitSold}

                              onChange={(e) => {
                                handleChangeProductInven(e, index);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
                <button onClick={handleAddProductInventories} className="buttonAdd">
                  + ProductInventories
                </button>
              </div>
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
