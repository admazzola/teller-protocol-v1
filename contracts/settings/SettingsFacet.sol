// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contracts
import { RolesMods } from "../contexts2/access-control/roles/RolesMods.sol";
import { ADMIN, AUTHORIZED } from "../shared/roles.sol";

// Interfaces
import { IUniswapV2Router } from "../shared/interfaces/IUniswapV2Router.sol";

// Libraries
import { RolesLib } from "../contexts2/access-control/roles/RolesLib.sol";

// Storage
import { AppStorageLib, AppStorage } from "../storage/app.sol";

struct InitAssets {
    string sym;
    address addr;
}

struct InitArgs {
    address admin;
    InitAssets[] assets;
    address uniswapV2Router;
}

contract SettingsFacet is RolesMods {
    /**
        @notice This event is emitted when the platform restriction is switched
        @param restriction Boolean representing the state of the restriction
        @param pauser address of the pauser flipping the switch
    */
    event PlatformRestricted(bool restriction, address indexed pauser);

    /**
     * @notice Restricts the use of the Teller protocol to authorized wallet addresses only
     * @param restriction Bool turning the resitriction on or off
     */
    function restrictPlatform(bool restriction)
        internal
        authorized(ADMIN, msg.sender)
    {
        AppStorageLib.store().platformRestricted = restriction;
        emit PlatformRestricted(restriction, msg.sender);
    }

    /**
     * @notice Adds a wallet address to the list of authorized wallets
     * @param account The wallet address of the user being authorized
     */
    function addAuthorizedAddress(address account)
        external
        authorized(ADMIN, msg.sender)
    {
        RolesLib.grantRole(AUTHORIZED, account);
    }

    /**
     * @notice Adds a list of wallet addresses to the list of authorized wallets
     * @param addressesToAdd The list of wallet addresses being authorized
     */
    function addAuthorizedAddressList(address[] calldata addressesToAdd)
        external
        authorized(ADMIN, msg.sender)
    {
        for (uint256 i; i < addressesToAdd.length; i++) {
            RolesLib.grantRole(AUTHORIZED, addressesToAdd[i]);
        }
    }

    /**
     * @notice Removes a wallet address from the list of authorized wallets
     * @param account The wallet address of the user being unauthorized
     */
    function removeAuthorizedAddress(address account)
        external
        authorized(ADMIN, msg.sender)
    {
        RolesLib.revokeRole(AUTHORIZED, account);
    }

    function init(InitArgs calldata _args) external {
        if (AppStorageLib.store().initialized) return;
        AppStorageLib.store().initialized = true;

        RolesLib.grantRole(ADMIN, _args.admin);

        for (uint256 i; i < _args.assets.length; i++) {
            AppStorageLib.store().assetAddresses[_args.assets[i].sym] = _args
                .assets[i]
                .addr;
        }
        AppStorageLib.store().uniswapRouter = IUniswapV2Router(
            _args.uniswapV2Router
        );
    }
}
