/**
 * Created by evio on 2017/7/3.
 */
import Router from 'miox-router';

const URI = Router.uri();

URI.domain('Service', '/');
URI.path('Detail', '/content/:key/:hash?');

export default URI;
