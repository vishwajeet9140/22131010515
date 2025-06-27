const axios = require('axios');

/**
 * logToServer – send logs to Affordmed test server
 * @param {Object} params
 * @param {"frontend"|"backend"} params.stack
 * @param {"debug"|"info"|"warn"|"error"|"fatal"} params.level
 * @param {string} params.pkg  one of component|hook|page|state|style|auth|config|middleware|utils
 * @param {string} params.message
 * @param {string} params.token  Bearer token from authenticate API
 */
async function logToServer({ stack, level, pkg, message, token }) {
  const url = 'http://20.244.56.144/evaluation-service/logs';
  const body = { stack, level, package: pkg, message };

  try {
    const response = await axios.post(url, body, {
      headers: { Authorization: `Bearer ${token}` },
    });
    console.log('✅ Log Sent:', response.data);
  } catch (err) {
    console.error('❌ Failed to send log:', err.message);
  }
}

module.exports = { logToServer };
