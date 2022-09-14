// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "hardhat/console.sol";

/**
 * @title Tour guide registration
 * @notice tourGuideRegister contract is a contract to register the marks of a tourGuide and calculates his percentage
*/

contract TouristRegister {
    address owner;
    uint256 transactionCount;
    
  event Registered (address wallet, uint Id, string name, string country, string  city);
    /**
     * @dev assigning the contract deployer as the owner
     */
    constructor() {
        owner=msg.sender;
    }
    
    /**
     * @dev a struct tourGuide is defined
     */
    struct tourGuide{
        address wallet;
        uint Id;
        string name;
        string country;
        string  city; 
        bool isFree;
        bool isExist;
    }
      /**
   * @dev mapping address as key to struct tourGuide with mapping name tourGuideList
   */
    mapping (address=>tourGuide)tourGuideList;
    tourGuide[] tourGuideArray;

    function register(address wallet, uint Id,string memory name,string memory country,string memory city) public {
        transactionCount += 1;
  
        tourGuideArray.push(tourGuide(msg.sender, Id,name,country, city,false, true));

        tourGuideList[wallet] = tourGuide(msg.sender, Id,name,country, city,false, true);
    emit Registered(msg.sender, Id, name, country, city);
    }
    
    /**
     * @notice function to get the details of a tourGuide when wallet is given
     */
            
    function getDetails(address wallet) public view returns (uint,string memory,string memory,string memory){
        /**
         * @dev returning wallet,name,country,city and city of tourGuide to corresponding key
         */ 
        return(tourGuideList[wallet].Id,tourGuideList[wallet].name,tourGuideList[wallet].country,tourGuideList[wallet].city);
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}