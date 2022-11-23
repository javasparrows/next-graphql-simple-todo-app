export const resolvers = {
  Query: {
    tasks: (
      _parent: any,
      _args: any,
      ctx: { prisma: { task: { findMany: () => any } } }
    ) => {
      return ctx.prisma.task.findMany();
    },
  },
};
