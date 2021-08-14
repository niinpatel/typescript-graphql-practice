import { Restaurant } from "#root/db/models";

const deleteRestaurant = async (context: any, { id }: { id: string }) => {
  const deleted = await Restaurant.destroy({ where: { id } });
  return Boolean(deleted);
};

export default deleteRestaurant;
