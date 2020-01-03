import axios from 'axios';

const API_BASIC_URL = 'https://pixabay.com/api/';
const API_KEY = '14715386-62189850d4fd3a7a1b8d3fb7e';
const TYPE = 'photo';
const ORIENTATION = 'horizontal';
const PERPAGE = 12;

export const get = (text, page) => {
  return axios.get(
    `${API_BASIC_URL}?key=${API_KEY}&q=${text}&image_type=${TYPE}&page=${page}&orientation=${ORIENTATION}&per_page=${PERPAGE}`,
  );
};
export const getNull = () => null;
