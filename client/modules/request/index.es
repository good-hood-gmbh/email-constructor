import config from 'uni-config';
import superagent from 'superagent';


const INTERNAL_LINK = /^\//;
const API_ROOT = config.client.api_root;

const defaultOptions = {
  url: null,
  type: 'get',
  token: null,
  payload: null,
  query: null,
  multipart: false,
  customize: null,
};

export default (options) => {
  const {
    url,
    type,
    token,
    payload,
    query,
    multipart,
    customize,
  } = { ...defaultOptions, ...options };

  const newUrl = INTERNAL_LINK.test(url) ? `${API_ROOT}${url}` : url;
  const request = superagent(type, newUrl);

  request.set('Accept', 'application/json');

  if (token) {
    request.set('X-Access-Token', token);
  }

  if ((type === 'put' || type === 'post') && !multipart) {
    request.set('Content-Type', 'application/json');
  }

  if (query) request.query(query);
  if (payload) request.send(payload);
  if (customize) customize(request);

  const promise = new Promise((resolve, reject) => (
    request.end((err, response) => {
      const body = (response && response.body) || {};

      if (err) {
        const statusCode = parseInt(response && response.status, 10) || 500;
        reject(body, statusCode);
      } else {
        resolve(body);
      }
    })
  ));

  return { request, promise };
};
