pragma solidity ^0.5.17;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
    string public name = "Decentral Bank";
    address public owner;
    Tether public tether;
    RWD public rwd;

    address[] public stakers;
    mapping(address => uint) public stakingBalance;
    mapping(address => bool) public hasStaked;
    mapping(address => bool) public isStaking;

    constructor(RWD _rwd, Tether _tether) public {
        rwd = _rwd;
        tether = _tether;
        owner = msg.sender;
    }

    //staking function
    function depositTokens(uint256 _amount) public {
        require(_amount > 0, "Amount must be greater than zero");

        //transfer tether to this contact address for staking
        tether.transferFrom(msg.sender, address(this), _amount);

        //update staking balance
        stakingBalance[msg.sender] += _amount;

        if (!hasStaked[msg.sender]) {
            stakers.push(msg.sender);
        }

        //update staking
        hasStaked[msg.sender] = true;
        isStaking[msg.sender] = true;
    }

    //issue rewards function
    function issueTokens() public {
        // require(msg.sender == owner, "Only owner can issue tokens");

        for (uint i = 0; i < stakers.length; i++) {
            address recipient = stakers[i];
            uint balance = stakingBalance[recipient] / 9; //divide by 9 to create incentive
            if (balance > 0) {
                rwd.transfer(recipient, balance);
            }
        }
    }

    //unstake function
    function unstakeTokens() public {
        uint balance = stakingBalance[msg.sender];
        require(balance > 0, "You are not staking");

        //transfer tether back to the specified address from our bank
        tether.transfer(msg.sender, balance);

        // reset staking balance
        stakingBalance[msg.sender] = 0;

        //update staking
        isStaking[msg.sender] = false;
    }
}
