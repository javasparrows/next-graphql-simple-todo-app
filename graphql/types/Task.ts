import {
  objectType,
  extendType,
  nonNull,
  stringArg,
  intArg,
  booleanArg,
  makeSchema,
  decorateType,
  asNexusMethod,
} from "nexus";
import { GraphQLDateTime } from "graphql-scalars";

export const Task = makeSchema({
  types: [
    asNexusMethod(GraphQLDateTime, "dateTime"),
    objectType({
      name: "Task",
      definition(t) {
        t.nonNull.int("id");
        t.nonNull.string("title");
        t.nonNull.boolean("done");
        // @ts-ignore
        t.dateTime("createdAt");
        // @ts-ignore
        t.dateTime("updatedAt");
      },
    }),
  ],
});

export const TasksQuery = extendType({
  type: "Query",
  definition(t) {
    t.nonNull.list.field("tasks", {
      type: "Task",
      resolve(_parent, _args, ctx) {
        return ctx.prisma.task.findMany();
      },
    });
  },
});

export const CreateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("createTask", {
      type: "Task",
      args: {
        title: nonNull(stringArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.create({
          data: {
            title: args.title,
          },
        });
      },
    });
  },
});

export const DeleteTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("deleteTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.delete({
          where: {
            id: args.id,
          },
        });
      },
    });
  },
});

export const UpdateTaskMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("updateTask", {
      type: "Task",
      args: {
        id: nonNull(intArg()),
        title: nonNull(stringArg()),
        done: nonNull(booleanArg()),
      },
      resolve(_parent, args, ctx) {
        return ctx.prisma.task.update({
          where: {
            id: args.id,
          },
          data: {
            title: args.title,
            done: args.done,
          },
        });
      },
    });
  },
});
