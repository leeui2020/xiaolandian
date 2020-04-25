export default [
  {
    id: '/index',
    name: '控制面板',
    icon: 'fa fa-tachometer'
  },
  {
    id: '/product',
    name: '产品管理',
    icon: 'fa fa-product-hunt'
  },
  {
    id: '/order',
    name: '订单管理',
    icon: 'fa fa-wpforms'
  },
  {
    id: '/paycode',
    name: '支付管理',
    icon: 'fa fa-qrcode'
  },
  {
    id: '/youhuiquan',
    name: '优惠券管理',
    icon: 'fa fa-ticket',
    children: [
      {
        id: '/youhuiquan/model',
        name: '模板管理'
      }
    ]
  },
  {
    id: '/media',
    name: '媒体库',
    icon: 'fa fa-archive'
  }
]
