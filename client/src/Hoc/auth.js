import axios from 'axios';
import React, { useEffect } from 'react';

// true -> 로그인된 사람만
// false -> 로그아웃 된 사람만
// null -> 아무나 가능
export default function (SpecificComponent, isAuth = null) {
  function AuthenticationCheck(props) {
    useEffect(() => {
      axios.get('/nod/user/auth').then((response) => {
        if (response.data.success) {
          if(isAuth === false) {
            return props.history.push('/');
          }
        } else {
          if()
        }
      });
    }, []);
    // 위에서 해당사항이 없을때 이동하려던 컴포넌트로 이동
    return <SpecificComponent />;
  }

  return AuthenticationCheck;
}
