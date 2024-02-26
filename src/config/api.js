const baseURL =
  process.env.NODE_ENV === 'production'
    ? 'https://pixelcredithub-backend.onrender.com'
    : 'http://localhost:5500';

export default baseURL;