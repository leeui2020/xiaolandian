export default [
  {
    name: 'root',
    path: '/',
    component: () => import('@/components/LeeFrame'),
    redirect: '/paycode',
    children: [
      {
        name: 'Index',
        path: '/index',
        component: () => import('@/views/Index'),
        meta: {
          title: '控制面板'
        }
      },
      {
        name: 'Media',
        path: '/media',
        component: () => import('@/views/Media'),
        meta: {
          title: '媒体库'
        }
      },
      {
        name: 'Product',
        path: '/product',
        component: () => import('@/views/Product'),
        meta: {
          title: '产品管理'
        }
      },
      {
        name: 'Order',
        path: '/order',
        component: () => import('@/views/Order'),
        meta: {
          title: '订单管理'
        }
      },
      {
        name: 'Paycode',
        path: '/paycode',
        component: () => import('@/views/Paycode'),
        meta: {
          title: '支付管理'
        }
      }
    ]
  },
  {
    name: 'Login',
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      notAuth: true
    }
  }
]
