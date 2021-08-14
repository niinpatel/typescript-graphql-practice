import { Restaurant } from "#root/db/models";

const createRestaurent = (
  context: any,
  { name, chefId }: { name: string; chefId: string }
) => {
  //@ts-ignore FIXME
  return Restaurant.create({ name, chefId });
};

export default createRestaurent;
