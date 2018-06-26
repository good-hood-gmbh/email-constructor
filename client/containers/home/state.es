import { resolved } from '../../modules/network/types';


export const ITEMS_GET = 'home@ITEMS_GET';

export const getItems = () => ({
  type: ITEMS_GET,
  request: {
    url: 'https://jsonplaceholder.typicode.com/posts',
    shouldRequest({ home }) { return !home; },
  },
});

export const reducer = (state = null, action) => {
  switch (action.type) {
    case resolved(ITEMS_GET): {
      return action.payload;
    }

    default: {
      return state;
    }
  }
};
