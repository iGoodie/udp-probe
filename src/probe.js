#!/usr/bin/env node

import dgram from "node:dgram";

/**
 * @param {number} port
 */
export function startProbing(port) {
  const server = dgram.createSocket("udp4");

  server.on("listening", () => {
    const address = server.address();

    console.log(`📢 Listening on ${address.address}:${address.port}`);
  });

  server.on("message", (msg, rinfo) => {
    console.log(
      `✅ Received message: ${msg} from ${rinfo.address}:${rinfo.port}`
    );

    const response = Buffer.from("ACK");

    server.send(response, rinfo.port, rinfo.address, (err) => {
      if (err) console.error("❌ Error sending response:", err);
    });
  });

  server.bind(port);
}
