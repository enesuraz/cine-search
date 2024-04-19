import { TIMEOUT_SEC } from "./config";

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

/**
 * Send get requests for application
 * @param {string} url
 * @returns {object} data
 */
export async function getJSON(url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (data.status === "fail") throw new Error(data.message);
    return data;
  } catch (err) {
    throw err;
  }
}

/**
 * Send post requests for application
 * @param {string} url
 * @param {object} uploadData
 * @returns {object} data
 */
export async function sendJSON(url, uploadData) {
  try {
    const fetchUpload = fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(uploadData),
    });
    const res = await Promise.race([fetchUpload, timeout(TIMEOUT_SEC)]);
    const data = await res.json();
    if (data.status === "fail") throw new Error(data.message);

    return data;
  } catch (err) {
    throw err;
  }
}
