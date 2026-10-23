const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const tokenPath = path.resolve('C:/Users/Administrator/.gemini/config/credentials/xmind_mcp_token.json');

function getToken() {
  if (!fs.existsSync(tokenPath)) {
    throw new Error(`Token file not found at ${tokenPath}. Please re-authenticate.`);
  }
  const data = JSON.parse(fs.readFileSync(tokenPath, 'utf8'));
  return data.access_token;
}

function unchunk(str) {
  let res = '';
  let pos = 0;
  while (pos < str.length) {
    const lineEnd = str.indexOf('\r\n', pos);
    if (lineEnd === -1) { res += str.substring(pos); break; }
    const lenHex = str.substring(pos, lineEnd).trim();
    if (!lenHex) { pos = lineEnd + 2; continue; }
    const len = parseInt(lenHex, 16);
    if (isNaN(len) || len === 0) { pos = lineEnd + 2; continue; }
    const chunkStart = lineEnd + 2;
    res += str.substring(chunkStart, chunkStart + len);
    pos = chunkStart + len + 2;
  }
  return res || str;
}

/**
 * Call Xmind Cloud MCP Tool
 * @param {string} toolName - e.g. 'xmind_read_mindmap', 'xmind_edit_mindmap', 'xmind_show_mindmap'
 * @param {object} args - Arguments object
 * @returns {Promise<any>}
 */
function callTool(toolName, args = {}) {
  return new Promise((resolve, reject) => {
    const accessToken = getToken();
    const postData = JSON.stringify({
      jsonrpc: '2.0',
      id: Date.now(),
      method: 'tools/call',
      params: { name: toolName, arguments: args }
    });

    const req = http.request({
      host: '127.0.0.1',
      port: 7890,
      method: 'CONNECT',
      path: 'app.xmind.com:443'
    });

    req.on('connect', (res, socket) => {
      const tlsSocket = require('tls').connect({
        host: 'app.xmind.com',
        socket: socket,
        servername: 'app.xmind.com'
      }, () => {
        tlsSocket.write(
          'POST /api/mcp HTTP/1.1\r\n' +
          'Host: app.xmind.com\r\n' +
          'Authorization: Bearer ' + accessToken + '\r\n' +
          'Accept: application/json, text/event-stream\r\n' +
          'Content-Type: application/json\r\n' +
          'Content-Length: ' + Buffer.byteLength(postData) + '\r\n' +
          'Connection: close\r\n\r\n' + postData
        );
      });

      let responseData = '';
      tlsSocket.on('data', chunk => responseData += chunk.toString('utf8'));
      tlsSocket.on('end', () => {
        const headerEnd = responseData.indexOf('\r\n\r\n');
        const bodyStr = responseData.substring(headerEnd + 4);
        const unchunked = unchunk(bodyStr);

        const dataIdx = unchunked.indexOf('data: ');
        if (dataIdx !== -1) {
          const jsonStr = unchunked.substring(dataIdx + 6).trim();
          try {
            resolve(JSON.parse(jsonStr));
            return;
          } catch (e) {
            // Fallback: extract result object if SSE text contains control characters
            const endIdx = jsonStr.lastIndexOf('}');
            if (endIdx !== -1) {
              try {
                resolve(JSON.parse(jsonStr.substring(0, endIdx + 1)));
                return;
              } catch (e2) {}
            }
          }
        }
        resolve({ raw: unchunked });
      });
      tlsSocket.on('error', reject);
    });

    req.on('error', reject);
    req.end();
  });
}

// CLI runner if executed directly
if (require.main === module) {
  const [,, cmd, fileId, ...rest] = process.argv;
  if (!cmd || !fileId) {
    console.log('Usage: node xmind_cloud_client.js <read|show|list_tools> <fileId> [argJson]');
    process.exit(1);
  }

  (async () => {
    try {
      if (cmd === 'read') {
        const res = await callTool('xmind_read_mindmap', { fileId });
        console.log(JSON.stringify(res, null, 2));
      } else if (cmd === 'show') {
        const res = await callTool('xmind_show_mindmap', { fileId });
        console.log(JSON.stringify(res, null, 2));
      } else {
        const args = rest.length ? JSON.parse(rest.join(' ')) : { fileId };
        const res = await callTool(cmd, args);
        console.log(JSON.stringify(res, null, 2));
      }
    } catch (err) {
      console.error('Error executing Xmind MCP:', err);
      process.exit(1);
    }
  })();
}

module.exports = { callTool, getToken };
