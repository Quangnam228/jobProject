import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import { useState, useMemo, useEffect } from 'react';
import { userRequest } from '../../requestMethods';

export default function HomeAdmin() {
  const [userStats, setUserStats] = useState([]);
  const [orderMonths, setOrderMonths] = useState([]);
  const MONTHS = useMemo(
    () => ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Agu', 'Sep', 'Oct', 'Nov', 'Dec'],
    []
  );
  function compare(a, b) {
    if (a.id > b.id) {
      return 1;
    } else {
      return -1;
    }
  }

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get('/user/stats');
        for (const item in res.data) {
          setUserStats((prev) => [...prev, { name: MONTHS[item - 1], 'new User': res.data[item] }]);
        }
      } catch (error) {}
    };
    getStats();
    const getOrder = async () => {
      try {
        const res = await userRequest.get('/order/order/stats');
        for (const property in res.data) {
          setOrderMonths((prev) => [...prev, { name: MONTHS[property - 1], Revenue: res.data[property] }]);
        }
      } catch (error) {}
    };
    getOrder();
  }, [MONTHS]);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStats} title="Biểu đồ người dùng" grid dataKey="new User" />
      <Chart data={orderMonths} title="Buổi đồ doanh thu" grid dataKey="Revenue" />

      {/* <div className="homeWidgets">
        <WidgetLg />
      </div> */}
    </div>
  );
}
