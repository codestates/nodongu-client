import axios from 'axios';
import React, { useEffect } from 'react';

// true -> 로그인된 사람만
// false -> 로그아웃 된 사람만
// null -> 아무나 가능
export default async function (setUserInfo, isAuth = null) {
  const response = await axios.get('/nod/user/auth');
  if (response.data.success) {
    if (isAuth === false) {
      return false;
    } else {
      setUserInfo(response.data.userInfo);
      return true;
    }
  } else {
    if (isAuth === true) {
      return false;
    } else {
      return true;
    }
  }
}
