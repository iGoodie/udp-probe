#!/usr/bin/env node

import { Command } from "commander";
import { startProbing } from "./probe.js";
import { tryPort } from "./trial.js";

const program = new Command();

program
  .command("serve <port>")
  .description("Start probing on UDP port")
  .action((port) => startProbing(Number(port)));

program
  .command("try <host> <port>")
  .description("Test UDP port accessibility on remote host")
  .action((host, port) => tryPort(host, Number(port)));

program.parse(process.argv);
