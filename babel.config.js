exports = (api) => {
  const isTest = /^test$/i.test(api.env());
  return {
    presets: [["@babel/preset-env", isTest ? { target: {} }: undefined], "@babel/preset-typescript"],
  };
};
