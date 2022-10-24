const { execSync } = require('child_process')
const exec = cmd => execSync(cmd, { stdio: 'inherit' })

const testPkgs = [
  '*clipboard',
]

exec(`pnpm ${testPkgs.reduce((acc, pkg) => `--filter=${pkg} ${acc}`, '')} run build`)
