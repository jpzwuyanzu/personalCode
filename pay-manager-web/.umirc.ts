import { defineConfig } from '@umijs/max';
import routes from './src/routes';

const APP = process.env.APP || 'payment';
export const APP_NAME = APP === 'payment' ? '支付管理后台' : '商户后台';

export default defineConfig({
  define: {
    'process.env.MODE': process.env.MODE,
    'process.env.APP': APP,
    'process.env.APP_NAME': APP_NAME,
  },
  antd: {},
  access: {},

  model: {},
  initialState: {},
  request: {},
  layout: {},
  routes,
  npmClient: 'yarn',
  mfsu: {},
  proxy: {
    // '/api': {
    //   target: `https://${APP}-api.iggame.work`,
    //   changeOrigin: true,
    // },
    '/api': {
      target: `http://172.28.113.248:8081`,
      changeOrigin: true,
    },
    '/api/back-websocket': {
      target: `wss://${APP}-api.iggame.work`,
      changeOrigin: true,
      ws: false,
    },
  },
});
