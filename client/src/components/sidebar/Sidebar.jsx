import './sidebar.css';
import {
  LineStyle,
  PermIdentity,
  Storefront,
  AttachMoney,
  DynamicFeed,
  ChatBubbleOutline,
  DeleteSweep
} from '@material-ui/icons';
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/admin/home" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Trang chủ
              </li>
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Menu</h3>
          <ul className="sidebarList">
            <Link to="/admin/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Người dùng
              </li>
            </Link>
            <Link to="/admin/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Sản phẩm
              </li>
            </Link>
            <Link to="/admin/category" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Danh mục
              </li>
            </Link>
            <Link to="/admin/brand" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Hãng sản xuất
              </li>
            </Link>
            <Link to="/admin/productAttribute" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                Thuộc tính
              </li>
            </Link>
            <Link to="/admin/orders" className="link">
              <li className="sidebarListItem">
                <AttachMoney className="sidebarIcon" />
                Đơn hàng
              </li>
            </Link>
            {/* <Link to="/admin/reviewProduct" className="link">
              <li className="sidebarListItem">
                <DynamicFeed className="sidebarIcon" />
                Review
              </li>
            </Link> */}
            {/* <Link to="/trash" className="link">
              <li className="sidebarListItem">
                <DeleteSweep className="sidebarIcon" />
                trash
              </li>
            </Link> */}
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Notifications</h3>
          <ul className="sidebarList">
            <Link to="/messenger" className="link">
              <li className="sidebarListItem">
                <ChatBubbleOutline className="sidebarIcon" />
                Messages
              </li>
            </Link>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
