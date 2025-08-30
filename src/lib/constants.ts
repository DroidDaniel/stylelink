export const ADMIN_CREDENTIALS = {
  email: 'admin@stylelink.com',
  password: 'admin123'
};

export const DEFAULT_ADMIN_PROFILE = {
  name: 'Admin User',
  role: 'admin' as const,
  email: ADMIN_CREDENTIALS.email
};