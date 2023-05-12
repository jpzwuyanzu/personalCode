-- 账户信息
-- 修改USDT地址，API文档下载，修改支付密码，查看密钥，通道管理
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2001, '修改USDT地址', 20, 10, 'system-account-info-update', NULL, 1, 0, 'F', '0', '0', 'system:account:info:update', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2002, 'API文档下载', 20, 20, 'system-account-info-api', NULL, 1, 0, 'F', '0', '0', 'system:account:info:api', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2003, '修改支付密码', 20, 30, 'system-account-info-password', NULL, 1, 0, 'F', '0', '0', 'system:account:info:password', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2004, '查看密钥', 20, 40, 'system-account-info-key', NULL, 1, 0, 'F', '0', '0', 'system:account:info:key', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2005, '通道管理', 20, 50, 'system-account-info-channel', NULL, 1, 0, 'F', '0', '0', 'system:account:info:channel', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (2005, '查看余额', 20, 60, 'system-account-info-transfer', NULL, 1, 0, 'F', '0', '0', 'system:account:info:transfer', '#', '', NULL, '', NULL, '1');

-- 商户管理
-- 修改余额记录，提醒列表，商户通道批量配置，添加商户，编辑，修改余额，通道配置，启用禁用
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400100, '修改余额记录', 4001, 10, 'merchant-manage-balance-record', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:balance:record', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400101, '提醒列表', 4001, 20, 'merchant-manage-remind', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:remind', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400102, '商户通道批量配置', 4001, 30, 'merchant-manage-channel-batch', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:batch', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400103, '添加商户', 4001, 40, 'merchant-manage-add', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:add', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400104, '编辑', 4001, 50, 'merchant-manage-update', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:update', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400105, '修改余额', 4001, 60, 'merchant-manage-balance', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:balance', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400106, '通道配置', 4001, 70, 'merchant-manage-channel', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:channel', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400107, '启用禁用', 4001, 80, 'merchant-manage-enable', NULL, 1, 0, 'F', '0', '0', 'merchant:manage:enable', '#', '', NULL, '', NULL, '0');



-- 商户账变记录
-- 导出
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (400200, '导出', 4002, 10, 'merchant-record-export', NULL, 1, 0, 'F', '0', '0', 'merchant:record:export', '#', '', NULL, '', NULL, '0,1');


-- 商户提现审批
-- 发起提现，待打款，更改状态
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500100, '发起提现', 5001, 10, 'finance-withdraw-add', NULL, 1, 0, 'F', '0', '0', 'finance:exchange:add', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500101, '待打款', 5001, 20, 'finance-withdraw-pending', NULL, 1, 0, 'F', '0', '0', 'finance:exchange:pending', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500102, '更改状态', 5001, 30, 'finance-withdraw-status', NULL, 1, 0, 'F', '0', '0', 'finance:exchange:status', '#', '', NULL, '', NULL, '0');


-- 商户USDT充值
-- 手动充值，修改状态
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500200, '手动充值', 5002, 10, 'finance-recharge-add', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:add', '#', '', NULL, '', NULL, '1');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500201, '修改状态', 5002, 20, 'finance-recharge-status', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:status', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500202, '后台手动充值', 5002, 30, 'finance-recharge-back-add', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:back:add', '#', '', NULL, '', NULL, '0');



-- 商户充值信息管理
-- 货币系数配置，添加，编辑，商户配置，币种配置，启用禁用
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500300, '货币系数配置', 5003, 10, 'finance-recharge-config-rate', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:rate', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500301, '添加', 5003, 20, 'finance-recharge-config-add', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:add', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500302, '编辑', 5003, 30, 'finance-recharge-config-update', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:update', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500303, '商户配置', 5003, 40, 'finance-recharge-config-merchant', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:merchant', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500304, '币种配置', 5003, 50, 'finance-recharge-config-currency', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:currency', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500305, '启用禁用', 5003, 60, 'finance-recharge-config-enable', NULL, 1, 0, 'F', '0', '0', 'finance:recharge:config:enable', '#', '', NULL, '', NULL, '0');



-- 商户提现信息管理
-- 保留余额设置，提现机制设置，货币系数配置，编辑，商户配置，币种配置
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500400, '保留余额设置', 5004, 10, 'finance-exhcange-config-balance', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:balance', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500401, '提现机制设置', 5004, 20, 'finance-exhcange-config-withdraw', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:withdraw', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500402, '货币系数配置', 5004, 30, 'finance-exhcange-config-rate', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:rate', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500403, '编辑', 5004, 40, 'finance-exhcange-config-update', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:update', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500404, '商户配置', 5004, 50, 'finance-exhcange-config-merchant', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:merchant', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (500405, '币种配置', 5004, 60, 'finance-exhcange-config-currency', NULL, 1, 0, 'F', '0', '0', 'finance:exhcange:config:currency', '#', '', NULL, '', NULL, '0');


-- 代收通道管理
-- 添加代收通道，编辑，启用禁用，修改余额，分配
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600100, '添加代收通道', 6001, 10, 'tunnel-collect-channel-add', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:add', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600101, '编辑', 6001, 20, 'tunnel-collect-channel-update', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:update', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600102, '启用禁用', 6001, 30, 'tunnel-collect-channel-enable', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:enable', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600103, '修改余额', 6001, 40, 'tunnel-collect-channel-balance', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:balance', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600104, '分配', 6001, 50, 'tunnel-collect-channel-distribute', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:distribute', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600105, '通道余额记录', 6001, 60, 'tunnel-collect-channel-record', NULL, 1, 0, 'F', '0', '0', 'tunnel:collect:channel:record', '#', '', NULL, '', NULL, '0');


-- 代付通道管理
-- 添加代付通道，编辑，启用禁用，修改余额，分配
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600200, '添加代付通道', 6002, 10, 'tunnel-pay-channel-add', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:add', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600201, '编辑', 6002, 20, 'tunnel-pay-channel-update', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:update', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600202, '启用禁用', 6002, 30, 'tunnel-pay-channel-enable', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:enable', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600203, '修改余额', 6002, 40, 'tunnel-pay-channel-balance', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:balance', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600204, '分配', 6002, 50, 'tunnel-pay-channel-distribute', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:distribute', '#', '', NULL, '', NULL, '0');
INSERT INTO `sys_menu`(`menu_id`, `menu_name`, `parent_id`, `order_num`, `path`, `component`, `is_frame`, `is_cache`, `menu_type`, `visible`, `status`, `perms`, `icon`, `create_by`, `create_time`, `update_by`, `update_time`, `tenant`)
VALUES (600205, '通道余额记录', 6002, 60, 'tunnel-pay-channel-record', NULL, 1, 0, 'F', '0', '0', 'tunnel:pay:channel:record', '#', '', NULL, '', NULL, '0');
