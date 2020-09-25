const BigNumber = require("bignumber.js");
const { teller, tokens } = require("../../../scripts/utils/contracts");
const {
  loans: loansActions,
  escrow: escrowActions
} = require("../../utils/actions");
const { takeOutNewLoan } = require("../../utils/takeOutNewLoan");
const { toDecimals } = require("../../../test/utils/consts");

module.exports = async (testContext) => {
  const { processArgs, getContracts, accounts } = testContext

  const collTokenName = "ETH";
  const tokenName = processArgs.getValue("testTokenName");
  const verbose = processArgs.getValue("verbose");

  const contracts = await getContracts.getAllDeployed({ teller, tokens }, tokenName, collTokenName);

  const borrower = await accounts.getAt(1);
  const liquidatorTxConfig = await accounts.getTxConfigAt(2);
  const initialOraclePrice = toDecimals("0.00295835", 18); // 1 token = 0.00295835 ether = 5000000000000000 wei
  const finalOraclePrice = toDecimals("0.00605835", 18); // 1 token = 0.006 ether = 6000000000000000 wei
  const decimals = parseInt(await contracts.token.decimals());
  const lendingPoolDepositAmountWei = toDecimals(4000, decimals);
  const amountWei = toDecimals(100, decimals);
  const maxAmountWei = toDecimals(200, decimals);
  const durationInDays = 5;
  const signers = await accounts.getAllAt(12, 13);
  const collateralNeeded = "320486794520547945";
  const borrowerTxConfig = { from: borrower };
  const borrowerTxConfigWithValue = {
    ...borrowerTxConfig,
    value: collateralNeeded
  };
  const lenderTxConfig = await accounts.getTxConfigAt(0);

  const loan = await takeOutNewLoan(contracts, { testContext }, {
    borrower,
    borrowerTxConfig,
    borrowerTxConfigWithValue,
    initialOraclePrice,
    lenderTxConfig,
    lendingPoolDepositAmountWei,
    amountWei,
    maxAmountWei,
    durationInDays,
    signers
  });

  const escrow = await loansActions.getEscrow(
    { loans: contracts.loans },
    { testContext },
    { loanId: loan.id }
  )

  const extraAmount = new BigNumber(10000000000000000000)
  const amountToRepay = amountWei.plus(extraAmount)
  await loansActions.getFunds({ token: contracts.token }, { txConfig: borrowerTxConfig, testContext }, { amount: extraAmount })
  await escrowActions.repay(
    { escrow, token: contracts.token },
    { txConfig: borrowerTxConfig, testContext },
    { amount: amountToRepay }
  )
};