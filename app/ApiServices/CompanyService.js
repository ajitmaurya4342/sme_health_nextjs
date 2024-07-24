import Api from './Api';

export default {
  GetCompany(payload) {
    return Api().get('/get-company', payload);
  },

  addCompany(payload){
    return Api().post('/add-company', payload);
  },
};