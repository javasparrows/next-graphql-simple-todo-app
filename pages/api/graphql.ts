import { ApolloServer } from "apollo-server-micro";
import { schema } from "../../graphql/schema";
import Cors from "micro-cors";
import { MicroRequest } from "apollo-server-micro/dist/types";
import { ServerResponse, IncomingMessage } from "http";
import { createContext } from "../../graphql/context";

const cors = Cors();

// new ApolloServerに/graphql/schema.tsで定義したGraphQLスキーマ、
// /graphql/resolvers.tsで定義したresolverを指定して、インスタンスを作成する。
// リクエストを受け取ったらstartServerとapolloServer.createHandlerを実行して、
// GraphQLを扱えるようにする。
const apolloServer = new ApolloServer({
  schema,
  context: createContext,
});
const startServer = apolloServer.start();

export default cors(async function handler(
  req: MicroRequest,
  res: ServerResponse<IncomingMessage>
) {
  if (req.method === "OPTIONS") {
    res.end();
    return false;
  }

  await startServer;
  await apolloServer.createHandler({
    path: "/api/graphql",
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};
