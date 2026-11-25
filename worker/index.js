/**
 * Range support for /media/*.
 *
 * Workers static assets answer a Range request with the whole file and a 200.
 * Safari will not play a <video> unless the server can hand back part of the
 * file with a 206, so the Marine Corps hero was blank there. This Worker sits
 * in front of /media/* only (see run_worker_first in wrangler.jsonc): it reads
 * the asset and returns just the bytes asked for. Every other path is served
 * by the asset handler directly and never reaches this code.
 */
export default {
  async fetch(request, env) {
    const range = request.headers.get("range");
    const readable = request.method === "GET" || request.method === "HEAD";

    if (!range || !readable) {
      // No range asked for: pass the asset through, and say that ranges are available.
      const asset = await env.ASSETS.fetch(request);
      const headers = new Headers(asset.headers);
      headers.set("Accept-Ranges", "bytes");
      return new Response(asset.body, { status: asset.status, statusText: asset.statusText, headers });
    }

    // Fetch the whole asset without the Range header, then cut out the part requested.
    const wanted = new Headers(request.headers);
    wanted.delete("range");
    wanted.delete("if-range");
    const asset = await env.ASSETS.fetch(new Request(request.url, { method: "GET", headers: wanted }));
    if (asset.status !== 200 || !asset.body) return asset;

    const bytes = await asset.arrayBuffer();
    const size = bytes.byteLength;
    const headers = new Headers(asset.headers);
    headers.set("Accept-Ranges", "bytes");

    // One range only: "bytes=0-1023", "bytes=500-" or "bytes=-500". Anything else gets the whole file.
    const match = /^bytes=(\d*)-(\d*)$/.exec(range.trim());
    if (!match || (match[1] === "" && match[2] === "")) {
      return new Response(request.method === "HEAD" ? null : bytes, { status: 200, headers });
    }

    let start;
    let end;
    if (match[1] === "") {
      start = Math.max(0, size - Number(match[2]));
      end = size - 1;
    } else {
      start = Number(match[1]);
      end = match[2] === "" ? size - 1 : Math.min(Number(match[2]), size - 1);
    }
    if (start >= size || start > end) {
      headers.set("Content-Range", `bytes */${size}`);
      headers.delete("Content-Length");
      return new Response(null, { status: 416, headers });
    }

    headers.set("Content-Range", `bytes ${start}-${end}/${size}`);
    headers.set("Content-Length", String(end - start + 1));
    return new Response(request.method === "HEAD" ? null : bytes.slice(start, end + 1), { status: 206, headers });
  },
};
