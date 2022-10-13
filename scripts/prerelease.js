const { execSync } = require('child_process')
const { join } = require('path')
const { inc } = require('semver')
const { sync } = require('glob')
const { writeJson } = require('fs-extra')

const root = process.cwd()
const exec = cmd => execSync(cmd, { stdio: 'inherit' })
const { version } = require(join(root, 'package.json'))
const args = process.argv.slice(2)

const bump = async (workspaces, version, ...params) => {
  const [releaseType, preid] = params
  if (!releaseType)
    throw new Error('please set version release type')

  const nextVersion = inc(version, releaseType, preid || 'beta')

  await Promise.all(workspaces.reduce((files, ws) => {
    return files.concat(sync(join(root, ws)).map(dir => join(dir, 'package.json')))
  }, []).map((pkg) => {
    const json = require(pkg)

    json.version = nextVersion

    return writeJson(pkg, json, { spaces: 2 })
  }))

  return nextVersion
}

const commit = (version) => {
  exec('git add .')
  exec(`git commit -m "chore: release v${version}"`)
  exec('git branch | git push origin')
}

const tag = () => {
  exec(`git tag v${version}`)
  exec(`git push origin v${version}`)
}

(async () => {
  const nextVersion = await bump(['packages/*', './'], version, ...args)
  exec('pnpm changelog')
  commit(nextVersion)
  tag(nextVersion)
  exec('pnpm build:all')
})()
