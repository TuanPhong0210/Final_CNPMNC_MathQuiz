const PRIMARY = {
  colorPrimary: '#1677ff',
};

const COMMON = {
  ...PRIMARY,
};

const token = {
  light: {
    ...COMMON,
    colorBgLayout: '#f5f8fa',
    colorBgContainer: '#fff',
  },
  dark: {
    ...COMMON,
    colorBgLayout: '#312e2e',
    colorBgContainer: '#242424',
  },
};

export default token;
