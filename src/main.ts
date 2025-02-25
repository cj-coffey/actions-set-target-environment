import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    let target = ''

    const environmentName = core.getInput('environment-name')
    if (environmentName) {
      target = environmentName
    } else {
      const branch = core
        .getInput('branch', {required: true})
        .replace('refs/heads/', '')

      switch (branch) {
        case 'main':
        case 'master':
          target = 'production'
          break
        case 'risk':
        case 'regression':
          target = 'risk'
          break
        case 'dev':
        case 'develop':
        case 'development':
        case 'lithium':
          target = 'lithium'
          break
        default:
          target = branch
          break
      }
    }

    if (target) {
      core.info(`Setting target environment to ${target}`)
      core.setOutput('target-environment', target)
    }
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
