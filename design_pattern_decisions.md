# Design Patterns

# Inheritance and Interfaces

The ERC20Contract inherits the ERC20 contract from the @openzepellin/contracts to make further development easier.
The @openzepellin/contracts library is a wrapper around the the common ERC standards and makes use of interfaces to separate concerns.

# Access Control Design Patterns

The ERC20Contract inherits the Ownable contract from the @openzepellin/contracts to make sure that only the owner can mint tokens and increase the tokens' total supply.