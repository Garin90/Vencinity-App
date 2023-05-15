import http from './base-api';

const list = () => http.get('/communities/:id/claims')
  .then((res) => res.data);

export default { list };