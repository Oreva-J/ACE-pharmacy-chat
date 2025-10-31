import { execSync } from "child_process";
import fs from "fs";

function run(command, name) {
  try {
    console.log(`\n🧱 Building ${name}...`);
    execSync(command, { stdio: "inherit" });
    console.log(`✅ ${name} build successful.`);
  } catch (error) {
    console.error(`❌ ${name} build failed.`);
    process.exit(1);
  }
}

run("cd packages/client && bun run build", "Client");
run("cd packages/server && bun run build", "Server");

console.log("\n🧩 Checking build outputs...");

const clientBuilt = fs.existsSync("./packages/client/dist/index.html");
const serverBuilt = fs.existsSync("./packages/server/dist/index.js");

if (clientBuilt && serverBuilt) {
  console.log("✅ All build artifacts found.");
} else {
  if (!clientBuilt) console.error("❌ Missing client dist/index.html");
  if (!serverBuilt) console.error("❌ Missing server dist/index.js");
  process.exit(1);
}

console.log("\n🎉 Build check passed. Ready for deployment!");
