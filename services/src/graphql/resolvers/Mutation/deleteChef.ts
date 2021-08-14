import { Chef } from "#root/db/models";

const deleteChef = async (context: any, { id }: { id: string }) => {
  const deleted = await Chef.destroy({ where: { id } });
  return Boolean(deleted);
};

export default deleteChef;
