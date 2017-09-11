/**
 * Created by evio on 2017/7/3.
 */
import Axios from 'axios';
const ajax = Axios.create();
export default ajax;
ajax.defaults.baseURL =
    process.env.NODE_ENV === 'production'
        ? 'http://miox.51.nb'
        : 'http://192.168.20.57:3001';

ajax.interceptors.response.use(response => response.data);