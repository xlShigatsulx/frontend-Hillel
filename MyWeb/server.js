import jsonServer from 'json-server';
import jsonServerAuth from 'json-server-auth';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServerAuth);

server.use(router);

server.listen(3333, () => {
  console.log('✅ JSON Server with Auth is running on port 3333');
});
