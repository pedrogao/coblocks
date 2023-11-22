export default () => ({
  http: {
    port: parseInt(process.env.PORT, 10) || 3000,
  },
});
