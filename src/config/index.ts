const SERVER_URL: string | undefined =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.PRODUCT_URL;

export { SERVER_URL };
