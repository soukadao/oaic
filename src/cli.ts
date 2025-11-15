import { Command } from "commander";
import * as pkg from "../package.json" with { type: "json" };
import { base } from "./commands/base.js";
import { DEFAULT_MODEL } from "./lib/constants.js";

const program = new Command();

program
  .name(pkg.name)
  .description("OpenAI API Chat CLI")
  .version(pkg.version)

program
  .option("-m, --model <model>", "OpenAI API Model", DEFAULT_MODEL)
  .action(async (options) => {
    await base(options.model);
  });

program.parse();

