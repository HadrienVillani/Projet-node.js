import React, { useEffect, useState } from 'react';
import Routes from './components/Routes';
import { UidContext } from './components/App.context';

const App = () => {
  const [uid, setUid] = useState(null);

  // console.log(user);

  // useEffect(() => {
  //   const fetchToken = async () => {
  //     await axios({
  //       method: 'get',
  //       url: `${process.env.REACT_APP_API_URL}api/user/:id`,
  //       withCredentials: true,
  //     })
  //       .then((res) => {
  //         setUid(res.data);
  //       })
  //       .catch((err) => console.log('No token'));
  //   };
  //   fetchToken();
  // }, [uid]);
  useEffect(() => {
    setUid(localStorage.getItem('user'));
  }, []);
  return (
    <UidContext.Provider value={uid}>
      <Routes />
    </UidContext.Provider>
  );
};
export default App;
