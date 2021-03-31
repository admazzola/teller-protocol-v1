// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Libraries
import "../../util/TellerCommon.sol";
import "../../util/AddressArrayLib.sol";

// Interfaces
import "../../interfaces/loans/ILoanStorage.sol";
import "../../interfaces/loans/ILoanTermsConsensus.sol";
import "../../interfaces/LendingPoolInterface.sol";
import "../../interfaces/AssetSettingsInterface.sol";

// Contracts

/*****************************************************************************************************/
/**                                             WARNING                                             **/
/**                        THIS CONTRACT IS AN UPGRADEABLE STORAGE CONTRACT!                        **/
/**  ---------------------------------------------------------------------------------------------  **/
/**  Do NOT change the order of, PREPEND, or APPEND any storage variables to this or new versions   **/
/**  of this contract as this will cause a ripple affect to the storage slots of all child          **/
/**  contracts that inherit from this contract to be overwritten on the deployed proxy contract!!   **/
/**                                                                                                 **/
/**  Visit https://docs.openzeppelin.com/upgrades/2.6/proxies#upgrading-via-the-proxy-pattern for   **/
/**  more information.                                                                              **/
/*****************************************************************************************************/
/**
 * @notice This contract is used to storage the state variables for all of the LoanManager and LoanData contracts.
 *
 * @author develop@teller.finance.
 */
abstract contract LoanStorage is ILoanStorage, ALoanStorage {
    /* State Variables */

    // Loan length will be inputted in seconds.
    uint256 internal constant SECONDS_PER_YEAR = 31536000;

    /**
     * @notice Holds the total amount of collateral held by the contract.
     */
    uint256 public override totalCollateral;

    /**
     * @notice Holds the instance of the LendingPool used by the LoanManager.
     */
    LendingPoolInterface public override lendingPool;

    /**
     * @notice Holds the lending token used for creating loans by the LoanManager and LendingPool.
     */
    address public override lendingToken;

    /**
     * @notice Holds the collateral token.
     */
    address public override collateralToken;

    /**
     * @notice Holds the Compound cToken where the underlying token matches the lending token.
     */
    CErc20Interface public override cToken;

    /**
     * @dev Holds a list of all loans for a borrower address.
     */
    mapping(address => uint256[]) internal borrowerLoans;

    /**
     * @notice Holds the ID of loans taken out
     * @dev Also the next available loan ID
     */
    uint256 public override loanIDCounter;

    /**
     * @dev Holds the list of authorizer signers for loans.
     */
    AddressArrayLib.AddressArray internal signers;

    /**
     * @dev It holds the address of a deployed InitializeableDynamicProxy contract.
     * @dev It is used to deploy a new proxy contract with minimal gas cost using the logic in the Factory contract.
     */
    address internal initDynamicProxyLogic;

    /**
     * @dev Holds the address of the LoanData implementation.
     */
    address internal loanData;

    /**
     * @dev Holds the address of the LoanTermsConsensus implementation.
     */
    address internal loanTermsConsensus;

    /**
     * @notice Holds the logic name used for the LoanData contract.
     * @dev Is used to check the LogicVersionsRegistry for a new LoanData implementation.
     */
    bytes32 public constant LOAN_DATA_LOGIC_NAME = keccak256("LoanData");

    /**
     * @notice Holds the logic name used for the LoanTermsConsensus contract.
     * @dev Is used to check the LogicVersionsRegistry for a new LoanTermsConsensus implementation.
     */
    bytes32 public constant LOAN_TERMS_CONSENSUS_LOGIC_NAME =
        keccak256("LoanTermsConsensus");

    bool internal _notEntered;

    /**
     * @notice It holds the platform AssetSettings instance.
     */
    AssetSettingsInterface public assetSettings;
}
