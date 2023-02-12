import './userList.css';
import { DataGrid } from '@material-ui/data-grid';
import { DeleteOutline } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUser, getUsers } from '../../redux/apiCallsAdmin';

export default function UserListAdmin() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.usersAdmin.users);
  console.log(user);

  useEffect(() => {
    getUsers(dispatch);
  }, [dispatch]);

  // const handleDelete = (id) => {
  //   deleteUser(id, dispatch);
  // };

  const columns = [
    { field: 'id', headerName: 'ID', width: 220 },
    {
      field: 'user',
      headerName: 'User',
      width: 200,
      renderCell: (params) => {
        return (
          <div className="userListUser">
            <img
              className="userListImg"
              src={
                params.row.img ? params.row.img : 'https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif'
              }
              alt=""
            />

            {`${params.row.firstname} `}
            {params.row.lastname}
          </div>
        );
      }
    },
    { field: 'email', headerName: 'Email', width: 200 }
    // {
    //   field: 'action',
    //   headerName: 'Action',
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />
    //       </>
    //     );
    //   }
    // }
  ];

  return (
    <div className="userList">
      <div className="userTitleContainer">
        <h1 className="userTitle">Users</h1>
      </div>
      <DataGrid
        rows={user}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        getRowId={(row) => row.id}
        checkboxSelection
      />
    </div>
  );
}
