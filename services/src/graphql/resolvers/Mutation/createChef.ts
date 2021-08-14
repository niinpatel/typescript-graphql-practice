import { Chef } from "#root/db/models";

const createChefResolver = async (context: any, { name }: { name: string }) => {
  //@ts-ignore FIXME
  return Chef.create({ name });
};

export default createChefResolver;
