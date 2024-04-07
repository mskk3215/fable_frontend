import { RequestHandler } from "msw";
import { afterEach } from "node:test";
import { setupServer } from "msw/node";

//setup Mock server
export function setupMockServer(...handlers: RequestHandler[]) {
  const server = setupServer(...handlers);
  beforeAll(() => server.listen());
  afterEach(() => server.resetHandlers());
  afterAll(() => server.close());
  return server;
}
//setup SelectImage
export function setupImageFile() {}
