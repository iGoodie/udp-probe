#!/usr/bin/env node

import dgram from "dgram";

/**
 * @param {string} host
 * @param {number} port
 */
export function tryPort(host, port) {
  const client = dgram.createSocket("udp4");
  const message = Buffer.from("ping");

  const timeout = setTimeout(() => {
    console.log("❌ No response received, port may be closed or filtered.");
    client.close();
  }, 3000);

  client.on("message", (msg, rinfo) => {
    console.log(
      `✅ Received response from ${rinfo.address}:${rinfo.port} - ${msg}`
    );
    console.log("✅ Port probing successful.");
    clearTimeout(timeout);
    client.close();
  });

  client.send(message, port, host, (err) => {
    if (err) {
      console.error("❌ Failed to send message:", err);
      client.close();
    } else {
      console.log(
        `⌛️ Message sent to ${host}:${port}, waiting for response...`
      );
    }
  });
}
