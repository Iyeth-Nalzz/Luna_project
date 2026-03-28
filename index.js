/* Hady Zen'in */
/* dibuat oleh Hady with love - Copyright HadyZenin 2025 */
const { spawn } = require('child_process');
const requiredVersion = '14.x';

if (!process.version.match(new RegExp(`^v${requiredVersion.replace('x', '\\d+')}$`))) {
  console.error(`Error: Node.js versi ${requiredVersion} diperlukan.`);
  process.exit(1);
}

function hady() {
  const child = spawn("node Ara.js", {
    cwd: __dirname,
    stdio: "inherit",
    shell: true
  });
  child.on("close", (code) => {
    if (code == 2) {
      hady();
    }
  });
};
hady();
