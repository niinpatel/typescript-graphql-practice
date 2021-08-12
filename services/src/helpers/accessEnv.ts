const cache: { [key: string]: string } = {};

const accessEnv = (key: string, defaultValue?: string) => {
  if (!(key in process.env)) {
    if (!defaultValue) {
      throw new Error(`${key} not found`);
    }
    return defaultValue;
  }

  if (cache[key]) {
    return cache[key];
  }

  cache[key] = process.env[key]!;

  return cache[key];
};

export default accessEnv;
