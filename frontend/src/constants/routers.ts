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
    profile: {
      root: '/dashboard/profile',
      branding: '/dashboard/profile/branding',
      contact: '/dashboard/profile/contact',
      account: '/dashboard/profile/account',
      changepassword: '/dashboard/profile/changepassword',
    },
  },
};

export default router;
