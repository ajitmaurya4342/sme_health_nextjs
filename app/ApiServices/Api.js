import axios from 'axios';

export default () => {
 
  const instance = axios.create({
    baseURL: process.env.BASE_URL,
  });
   
  instance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

  instance.interceptors.response.use(
    function (response) {
      // Do something with response data
      return response;
    },
    function (error) {
      return Promise.reject(error);
    },
  );
  return instance;
};