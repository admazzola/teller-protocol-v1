import { task, types } from 'hardhat/config'
import { subtask } from 'hardhat/config'
import { TASK_TEST_RUN_MOCHA_TESTS } from 'hardhat/builtin-tasks/task-names'
import { HARDHAT_NETWORK_NAME } from 'hardhat/plugins'

import {
  HardhatArguments,
  HttpNetworkConfig,
  NetworkConfig,
  EthereumProvider,
  HardhatRuntimeEnvironment,
  Artifact,
  Artifacts,
} from 'hardhat/types'

let mochaConfig

task('test').setAction(async (args, hre, runSuper) => {
  const { run } = hre

  const chain = process.env.FORKING_NETWORK
  if (chain == null) {
    throw new Error(`Invalid network to fork and run tests on: ${chain}`)
  }

  // Fork the deployment files into the 'hardhat' network
  await run('fork', {
    chain,
    onlyDeployment: true,
  })

  // Disable logging
  // process.env.DISABLE_LOGS = 'true'

  // Run the actual test task
  await runSuper({
    deployFixture: true,
  })
})

/**
 * Merges GasReporter defaults with user's GasReporter config
 * @param  {HardhatRuntimeEnvironment} hre
 * @return {any}
 */
function getOptions(hre: HardhatRuntimeEnvironment): any {
  return { ...getDefaultOptions(hre), ...(hre.config as any).gasReporter }
}

/**
 * Sets reporter options to pass to eth-gas-reporter:
 * > url to connect to client with
 * > artifact format (hardhat)
 * > solc compiler info
 * @param  {HardhatRuntimeEnvironment} hre
 * @return {EthGasReporterConfig}
 */
function getDefaultOptions(
  hre: HardhatRuntimeEnvironment
): EthGasReporterConfig {
  const defaultUrl = 'http://localhost:8545'
  const defaultCompiler = hre.config.solidity.compilers[0]

  let url: any
  // Resolve URL
  if ((<HttpNetworkConfig>hre.network.config).url) {
    url = (<HttpNetworkConfig>hre.network.config).url
  } else {
    url = defaultUrl
  }

  return {
    enabled: true,
    url: <string>url,
    metadata: {
      compiler: {
        version: defaultCompiler.version,
      },
      settings: {
        optimizer: {
          enabled: defaultCompiler.settings.optimizer.enabled,
          runs: defaultCompiler.settings.optimizer.runs,
        },
      },
    },
  }
}

/**
 * Overrides TASK_TEST_RUN_MOCHA_TEST to (conditionally) use eth-gas-reporter as
 * the mocha test reporter and passes mocha relevant options. These are listed
 * on the `gasReporter` of the user's config.
 */
subtask(TASK_TEST_RUN_MOCHA_TESTS).setAction(
  async (args: any, hre, runSuper) => {
    const options = getOptions(hre)
    //options.getContracts = getContracts.bind(null, hre.artifacts, options.excludeContracts);

    /*if (options.enabled) {
      mochaConfig = hre.config.mocha || {};
      mochaConfig.reporter = "eth-gas-reporter";
      mochaConfig.reporterOptions = options;

      if (hre.network.name === HARDHAT_NETWORK_NAME || options.fast){
        const wrappedDataProvider= new EGRDataCollectionProvider(hre.network.provider,mochaConfig);
        hre.network.provider = new BackwardsCompatibilityProviderAdapter(wrappedDataProvider);

        const asyncProvider = new EGRAsyncApiProvider(hre.network.provider);
        resolvedRemoteContracts = await getResolvedRemoteContracts(
          asyncProvider,
          options.remoteContracts
        );

        mochaConfig.reporterOptions.provider = asyncProvider;
        mochaConfig.reporterOptions.blockLimit = (<any>hre.network.config).blockGasLimit as number;
        mochaConfig.attachments = {};
      }

      hre.config.mocha = mochaConfig;
      resolvedQualifiedNames = await hre.artifacts.getAllFullyQualifiedNames();
    }*/

    console.log('subtask to comandeer mocha tests ')

    return runSuper()
  }
)
