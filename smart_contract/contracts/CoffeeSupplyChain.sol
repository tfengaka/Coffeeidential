// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract CoffeeSupplyChain is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    struct Diary {
        string action;
        string description;
    }

    struct Coffee {
        string order_id;
        string name;
        string product_type;
        address producer;
        uint256 cultivation_step;
        Diary[] diaries;
    }

    mapping(uint256 => Coffee) private _coffees;

    event createdProduct(
        uint256 tokenID,
        string name,
        string typeOfProduct,
        address producer
    );
    event createdDiary(uint256 tokenID, string action, string descriptions);

    modifier ValidTokenID(uint256 tokenID) {
        require(_exists(tokenID), "Invalid token ID");
        _;
    }

    constructor() ERC721("CoffeeToken", "COFFEE") {}

    function createNewProduct(
        string memory order_id,
        string memory _name,
        string memory _type
    ) public returns (Coffee memory) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(msg.sender, newTokenId);

        Coffee storage newCoffee = _coffees[newTokenId];
        newCoffee.order_id = order_id;
        newCoffee.name = _name;
        newCoffee.product_type = _type;
        newCoffee.cultivation_step = 1;
        newCoffee.producer = msg.sender;
        newCoffee.diaries.push(Diary(unicode"Đăng ký cây", unicode""));
        emit createdProduct(newTokenId, _name, _type, msg.sender);
        return newCoffee;
    }

    function getCoffeeToken(
        uint256 tokenId
    )
        public
        view
        returns (
            string memory,
            string memory,
            string memory,
            uint256,
            address,
            Diary[] memory
        )
    {
        require(_exists(tokenId), "Invalid token ID");
        Coffee memory coffee = _coffees[tokenId];
        return (
            coffee.order_id,
            coffee.name,
            coffee.product_type,
            coffee.cultivation_step,
            coffee.producer,
            coffee.diaries
        );
    }

    function createDiary(
        uint256 tokenID,
        string memory action,
        string memory descriptions
    ) public ValidTokenID(tokenID) {
        _coffees[tokenID].diaries.push(Diary(action, descriptions));
        _coffees[tokenID].cultivation_step++;
        emit createdDiary(tokenID, action, descriptions);
    }

    function getDiariesOfProduct(
        uint256 tokenID
    ) public view ValidTokenID(tokenID) returns (Diary[] memory) {
        return _coffees[tokenID].diaries;
    }
}
