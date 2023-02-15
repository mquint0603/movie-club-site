function buildUrl(endpoint, params = {}, traditional) {
  const isFullUrl = !endpoint.startsWith("/");
  const origin = window.location.origin;

  const url = isFullUrl ? new URL(endpoint) : new URL(endpoint, origin);

  Object.entries(params).forEach(([k, v]) => {
    if (Array.isArray(v) && traditional) {
      v.forEach((item) => url.searchParams.append(k, item));
    } else {
      url.searchParams.append(k, v);
    }
  });

  return url.href;
}

/** Returns true if this is a json response. */
export function isJson(resp) {
  if (!resp?.getResponseHeader && !resp?.headers) return false;

  try {
    const header = resp.getResponseHeader
      ? resp.getResponseHeader("content-type") // XMLHttpResponse
      : resp.headers.get("content-type"); // Fetch API Response
    return !!header.match(/application\/json/i);
  } catch (err) {
    return false;
  }
}

/**
 * Build a message for an `Error` using the response data.
 * Text responses will be truncated to the first line of the response.
 * Object responses will be JSON stringified.
 * @param {*} data - the response data
 * @return {string}
 */
function getErrorMessage(data) {
  let msg = "";
  if (typeof data === "string") {
    // First line
    msg = data.match(/^([^\n]+)\n/g)[0].replace(/\n/g, "");
    msg = `"${msg}"`;
  } else if (typeof data === "object") {
    msg = JSON.stringify(data, null, 2);
  } else {
    msg = String(data);
  }

  return msg;
}

export function fetchHelper({
  endpoint,
  method = "GET",
  body,
  params = {},
  traditional = false,
  asJson = true,
}) {
  const url = buildUrl(endpoint, params, traditional);
  const config = { method };
  if (body) config.body = asJson ? JSON.stringify(body) : body;
  config.headers = {
    "Content-Type": "application/json",
  };

  return fetch(url, config).then(async (response) => {
    const text = await response.text();
    const isJsonResponse = isJson(response);

    const data = text && isJsonResponse ? JSON.parse(text) : text;

    if (response.ok) {
      return data;
    }

    // Error Response
    const msg = getErrorMessage(data);
    const error = new Error(msg);
    error.data = data;
    error.response = response;

    return Promise.reject(error);
  });
}
