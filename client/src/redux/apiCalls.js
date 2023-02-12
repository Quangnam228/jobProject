import { toast } from 'react-toastify';
import { loginSuccess as loginSuccessAdmin } from '../redux/useReduxAdmin';

import { publicRequest } from '../requestMethods';

export const login = async (dispatch, user) => {
  try {
    const res = await publicRequest.post('/auth/authenticate', user);
    if (res.data) {
      toast.success('login successfully');
    }
    dispatch(loginSuccessAdmin(res.data));
  } catch (error) {
    toast.error('Something went wrong!');
  }
};
