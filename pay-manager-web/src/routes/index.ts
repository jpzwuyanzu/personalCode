import payment from './payment';
import merchant from './merchant';

const APP = process.env.APP || 'payment';
const routes = APP === 'merchant' ? merchant : payment;

export default routes;
