const SERVER_URL: string | undefined =
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:3001'
    : process.env.REACT_APP_PRODUCT_URL;

export { SERVER_URL };
