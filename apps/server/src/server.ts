import { fastifyTRPCPlugin } from '@trpc/server/adapters/fastify';
import fastify from 'fastify';
import { appRouter } from './router';
import { createContext } from './router/context';
import cors from '@fastify/cors';
import * as path from 'node:path';
import serve from '@fastify/static';

export interface ServerOptions {
  dev?: boolean;
  port?: number;
  prefix?: string;
}

export function createServer(opts: ServerOptions) {
  const dev = opts.dev ?? true;
  const port = opts.port ?? 3000;
  const prefix = opts.prefix ?? '/trpc';
  const server = fastify({ logger: dev });
  server.register(cors)
  server.register(fastifyTRPCPlugin, {
    prefix,
    trpcOptions: { router: appRouter, createContext },
  });

	server.register(serve, {
    root: path.join(__dirname, './public'),
    preCompressed: true
  });
  server.setNotFoundHandler(async function (request, reply) {
    if (request.raw.url && request.raw.url.startsWith('/api')) {
      return reply.status(404).send({
        success: false
      });
    }
    return reply.status(200).sendFile('index.html');
  });
  // server.get('/', async () => {
  //   return { hello: 'wait-on 💨' };
  // });

  const stop = () => server.close();
  const start = async () => {
    try {
      await server.listen({port});
      console.log('listening on port', port);
    } catch (err) {
      server.log.error(err);
      process.exit(1);
    }
  };

  return { server, start, stop };
}
