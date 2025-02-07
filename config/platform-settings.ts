import { PlatformSettings } from '../types/custom/config-types'

const mainnetPlatformSettings: PlatformSettings = {
  RequiredSubmissionsPercentage: {
    processOnDeployment: true,
    value: 8000,
    min: 0,
    max: 10000,
  },
  MaximumTolerance: {
    processOnDeployment: true,
    value: 0,
    min: 0,
    max: 10000,
  },
  ResponseExpiryLength: {
    processOnDeployment: true,
    value: 900,
    min: 0,
    max:
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  },
  TermsExpiryTime: {
    processOnDeployment: true,
    value: 3600,
    min: 0,
    max:
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  },
  LiquidateRewardPercent: {
    processOnDeployment: true,
    value: 500,
    min: 0,
    max: 10000,
  },
  MaximumLoanDuration: {
    processOnDeployment: true,
    value: 5184000,
    min: 0,
    max:
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  },
  CollateralBuffer: {
    processOnDeployment: true,
    value: 1500,
    min: 0,
    max: 10000,
  },
  OverCollateralizedBuffer: {
    processOnDeployment: true,
    value: 13000,
    min: 11000,
    max: 50000,
  },
  RequestLoanTermsRateLimit: {
    processOnDeployment: true,
    value: 3600,
    min: 0,
    max:
      '115792089237316195423570985008687907853269984665640564039457584007913129639935',
  },
}

export const platformSettings: Record<string, PlatformSettings> = {
  rinkeby: {
    RequiredSubmissionsPercentage: {
      processOnDeployment: true,
      value: 100,
      min: 0,
      max: 10000,
    },
    MaximumTolerance: {
      processOnDeployment: true,
      value: 0,
      min: 0,
      max: 10000,
    },
    ResponseExpiryLength: {
      processOnDeployment: true,
      value: 300,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    TermsExpiryTime: {
      processOnDeployment: true,
      value: 3600,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    LiquidateRewardPercent: {
      processOnDeployment: true,
      value: 500,
      min: 0,
      max: 10000,
    },
    MaximumLoanDuration: {
      processOnDeployment: true,
      value: 5184000,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    CollateralBuffer: {
      processOnDeployment: true,
      value: 1500,
      min: 0,
      max: 10000,
    },
    OverCollateralizedBuffer: {
      processOnDeployment: true,
      value: 13000,
      min: 11000,
      max: 50000,
    },
    RequestLoanTermsRateLimit: {
      processOnDeployment: true,
      value: 30,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
  },
  kovan: {
    RequiredSubmissionsPercentage: {
      processOnDeployment: true,
      value: 100,
      min: 0,
      max: 10000,
    },
    MaximumTolerance: {
      processOnDeployment: true,
      value: 0,
      min: 0,
      max: 3000,
    },
    ResponseExpiryLength: {
      processOnDeployment: true,
      value: 300,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    TermsExpiryTime: {
      processOnDeployment: true,
      value: 3600,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    LiquidateRewardPercent: {
      processOnDeployment: true,
      value: 500,
      min: 500,
      max: 10000,
    },
    MaximumLoanDuration: {
      processOnDeployment: true,
      value: 5184000,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    CollateralBuffer: {
      processOnDeployment: true,
      value: 1500,
      min: 0,
      max: 10000,
    },
    OverCollateralizedBuffer: {
      processOnDeployment: true,
      value: 13000,
      min: 11000,
      max: 50000,
    },
    RequestLoanTermsRateLimit: {
      processOnDeployment: true,
      value: 30,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
  },
  ropsten: {
    RequiredSubmissionsPercentage: {
      processOnDeployment: true,
      value: 100,
      min: 0,
      max: 10000,
    },
    MaximumTolerance: {
      processOnDeployment: true,
      value: 0,
      min: 0,
      max: 10000,
    },
    ResponseExpiryLength: {
      processOnDeployment: true,
      value: 300,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    TermsExpiryTime: {
      processOnDeployment: true,
      value: 3600,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    LiquidateRewardPercent: {
      processOnDeployment: true,
      value: 500,
      min: 0,
      max: 10000,
    },
    MaximumLoanDuration: {
      processOnDeployment: true,
      value: 5184000,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
    CollateralBuffer: {
      processOnDeployment: true,
      value: 1500,
      min: 0,
      max: 10000,
    },
    OverCollateralizedBuffer: {
      processOnDeployment: true,
      value: 13000,
      min: 11000,
      max: 50000,
    },
    RequestLoanTermsRateLimit: {
      processOnDeployment: true,
      value: 30,
      min: 0,
      max:
        '115792089237316195423570985008687907853269984665640564039457584007913129639935',
    },
  },
  hardhat: mainnetPlatformSettings,
  localhost: mainnetPlatformSettings,
  mainnet: mainnetPlatformSettings,
}
