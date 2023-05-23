const router = {
  home: {
    root: '/',
    lookup: '/lookup',
  },
  auth: {
    signIn: '/auth/sign-in',
    signUp: '/auth/sign-up',
  },
  dashboard: {
    root: '/dashboard/overview',
    products: {
      root: '/dashboard/products',
      create: '/dashboard/products/create',
      edit: '/dashboard/products/edit',
      diary: {
        root: '/dashboard/products/diaries',
        create: '/dashboard/products/diaries/create',
      },
    },
    profile: '/dashboard/profile',
  },
};

export default router;
