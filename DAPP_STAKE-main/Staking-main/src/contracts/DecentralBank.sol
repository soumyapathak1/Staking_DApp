pragma solidity ^0.5.0;
import "./RWD.sol";
import "./Tether.sol";

contract DecentralBank {
  string public name = "Decentral Bank";
  address public owner;
  Tether public tether;
  RWD public rwd;

  address[] public stakers;

  mapping(address => uint256) public stakingBalance;
  mapping(address => bool) public hasStaked;
  mapping(address => bool) public isStaking;

  constructor(RWD _rwd, Tether _tether) public {
    rwd = _rwd;
    tether = _tether;
    owner = msg.sender;
  }

  //staking function
  function depositTokens(uint256 _amount) public {
    // require staking amount to be greater than zero
    require(_amount > 0, "amount cannot be 0");
    //transfer tether tokens to contrack adress for stacking
    tether.transferFrom(msg.sender, address(this), _amount);

    // Update Staking Balance
    stakingBalance[msg.sender] = stakingBalance[msg.sender] + _amount;

    if (!hasStaked[msg.sender]) {
      stakers.push(msg.sender);
    }

    // Update Staking Balance
    isStaking[msg.sender] = true;
    hasStaked[msg.sender] = true;
  }

  // unstake tokens
  function unstakeTokens() public {
    uint balance = stakingBalance[msg.sender];
    // require the amount to be greater than zero
    require(balance > 0, "staking balance cant be less than zero");
    // transfer the tokens to be specified contract address from our bank
    tether.transfer(msg.sender, balance);
    // reset staking balance
    stakingBalance[msg.sender] = 0;
    // update staking status
    isStaking[msg.sender] = false;
  }

  // issue rewards token
  function issueTokens() public {
    //require the owner to issue tokens only
    //require(msg.sender == owner, "caller must be the owner");
    //
    for (uint256 i = 0; i < stakers.length; i++) {
      address recipient = stakers[i];
      uint256 balance = stakingBalance[recipient] / 9; // divided by 9 to create percentage incentive
      if (balance > 0) {
        rwd.transfer(recipient, balance);
      }
    }
  }
}
