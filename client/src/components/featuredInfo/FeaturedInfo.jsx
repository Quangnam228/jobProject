import './featuredInfo.css';
import { ArrowDownward, ArrowUpward } from '@material-ui/icons';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userRequest, publicRequest } from '../../requestMethods';
import { Link } from 'react-router-dom';

export default function FeaturedInfo() {
  const [income, setIncome] = useState([]);
  const [perc, setPerc] = useState(0);
  const [total, setTotal] = useState(0);
  const [users, setUsers] = useState();
  const [products, setProduct] = useState();
  // const dispatch = useDispatch();

  useEffect(() => {
    const callApi = async () => {
      const user = await userRequest.get('/user');
      setUsers(user);
      const total = await userRequest.get('/order/order/totalIncome');
      console.log(total.data);
      setTotal(total.data);
      const product = await userRequest.get('/catalog/products');
      console.log(product.data);
      setProduct(product.data);
    };
    callApi();
  }, []);

  // const order = order.filter((od) => {
  //   return od.status === "approved";
  // });
  useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await publicRequest.get('order/order/income');
        console.log(res.data[0]);
        setIncome(res.data);
        setPerc((res.data[1] * 100) / res.data[0] - 100);
      } catch {}
    };

    getIncome();
  }, []);

  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${income[0]?.total}</span>
          <span className="featuredMoneyRate">
            {Math.floor(perc)}%{' '}
            {perc < 0 ? <ArrowDownward className="featuredIcon negative" /> : <ArrowUpward className="featuredIcon" />}
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>

      <div className="featuredItem">
        <span className="featuredTitle">User</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{users?.data?.length}</span>
          <span className="featuredMoneyRate"></span>
        </div>

        <a href="/admin/users" className="featuredSub">
          see all user
        </a>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Product</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{products?.totalItems}</span>
          <span className="featuredMoneyRate"></span>
        </div>

        <a href="/admin/products" className="featuredSub">
          see all product
        </a>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Total Revenue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{total}VND</span>
        </div>
      </div>
    </div>
  );
}
