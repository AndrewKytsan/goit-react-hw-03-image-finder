import axios from 'axios';
const API_KEY = '23486768-997b33f9cb0e02e3e0af30e3b';
axios.defaults.baseURL = 'https://pixabay.com/api';

const fetchImages = async (searchQuery, page = 1) => {
    return await axios(
        `/?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&page=${page}&per_page=12`,
    ).then(response => response.data.hits);
};

const result = { fetchImages };

export default result;
