/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */
import type { ExportedHandler } from "@cloudflare/workers-types";
import type { Env } from "./env";
import { parseRequestUrl } from "./parse-request-url";

type Handler = ExportedHandler<Env>;

const fetch: Handler["fetch"] = async (req): Promise<Response> => {
  if (req.method !== "GET") {
    return new Response("Method not allowed", { status: 405 });
  }

  const url = parseRequestUrl(req.url);
  if (url.pathname !== "/") {
    return new Response("Not found", { status: 404 });
  }

  const ip = req.headers.get("CF-Connecting-IP");
  return new Response(ip?.replaceAll('"', ""));
};

const handler: Handler = {
  fetch,
};

export default handler;
