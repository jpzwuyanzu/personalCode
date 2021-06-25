// @ts-nocheck
import React from 'react';
import { ApplyPluginsType } from '/Users/xinyonghu/Desktop/learn-code/react-Learn/week2/UmiJS/umitest/node_modules/@umijs/runtime';
import * as umiExports from './umiExports';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [
  {
    "path": "/cart",
    "exact": true,
    "component": require('@/pages/cart.js').default
  },
  {
    "path": "/detail",
    "exact": true,
    "component": require('@/pages/detail/index.js').default
  },
  {
    "path": "/detail/list",
    "exact": true,
    "component": require('@/pages/detail/list.js').default
  },
  {
    "path": "/",
    "exact": true,
    "component": require('@/pages/index.js').default
  },
  {
    "path": "/kind",
    "exact": true,
    "component": require('@/pages/kind.js').default
  }
];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
