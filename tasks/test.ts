import { task, types } from 'hardhat/config'

task('test')
  .addFlag('noFork', 'Runs deployment and tests in a fresh chain.')
  .setAction(async (args, hre, runSuper) => {
    const { run } = hre

    const chain = process.env.FORKING_NETWORK
    if (chain == null) {
      throw new Error(`Invalid network to fork and run tests on: ${chain}`)
    }

    if (!args.noFork) {
      // Fork the deployment files into the 'hardhat' network
      await run('fork', {
        chain,
        onlyDeployment: true,
      })
    }

    // Disable logging
    // process.env.DISABLE_LOGS = 'true'

    // Run the actual test task
    await runSuper({
      deployFixture: true,
    })
  })
