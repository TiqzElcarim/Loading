// Netlify serverless function: resolves a TikTok URL to no-watermark media links.
// Uses the public tikwm.com endpoint. Swap UPSTREAM if you move to another provider.

const UPSTREAM = "https://www.tikwm.com/api/";
const TIKTOK_RE = /^https?:\/\/((www|vm|vt|m)\.)?tiktok\.com\//i;

const json = (statusCode, body) => ({
  statusCode,
  headers: { "Content-Type": "application/json", "Cache-Control": "no-store" },
  body: JSON.stringify(body),
});

exports.handler = async (event) => {
  const url =
    event.httpMethod === "POST"
      ? (JSON.parse(event.body || "{}").url || "").trim()
      : (event.queryStringParameters || {}).url || "";

  if (!TIKTOK_RE.test(url)) {
    return json(400, { error: "Please paste a valid TikTok link." });
  }

  try {
    const res = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 Chrome/120 Mobile Safari/537.36",
      },
      body: new URLSearchParams({ url, hd: "1" }).toString(),
    });
    const data = await res.json();

    if (data.code !== 0 || !data.data) {
      return json(404, { error: "Couldn't fetch that video. It may be private or removed." });
    }

    const d = data.data;
    return json(200, {
      title: d.title || "TikTok video",
      author: (d.author && (d.author.nickname || d.author.unique_id)) || "",
      cover: d.cover || "",
      duration: d.duration || 0,
      video: d.play || "",
      videoHd: d.hdplay || "",
      music: d.music || "",
      images: d.images || [],
    });
  } catch (e) {
    return json(502, { error: "Service busy. Please try again in a moment." });
  }
};
