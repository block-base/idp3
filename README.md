# idp3

IdP with web3 wallet

![top](./docs/img/top.png)

## Description

IdP3 is a fully decentralized solution for authorization, leveraging SIOPv2 and OID4VP. This system empowers users to turn their wallets into Self-Issued ID Token Providers (SIOPs) and attach credentials as Verifiable Presentations.

## Demo Video

TBD

## How It works

### Diagram

TBD

### Difference from Sign In With Ethereum

Sign In With Ethereum (SIWE) requires another signing key, which is not managed by the user. It acts as a middleman in the authentication process, as illustrated in the Auth0 SIWE integration diagram below.

![!siwe](./docs/siwe.png)

In contrast, the IdP3 model allows only the user to control the key for creating the ID token.

### Compatibility with W3C Verifiable Credentials

The scenario discussed below is compatible with W3C Verifiable Credentials.

https://www.w3.org/TR/vc-data-model/#subject-passes-a-verifiable-credential-to-someone-else

In our model, the Decentralized Identifier (DID) that creates the ID token is a pairwise DID. It is used only for the connection, while the original verifiable credential holder is the user's Web3 wallet.

## How It Build

IdP3 uses the Gitcoin Passport credential as its primary source of credentials. In turn, Gitcoin Passport relies on Ceramic for data storage, and Ceramic itself uses IPFS.

Additionally, IdP3 has incorporated ENS and ApeCoinDAO credentials to demonstrate a broader range of actual use cases.

Please see the details in the following documents.

- [IPFS](./docs/ipfs.md)
- [Ceramic](./docs/ceramic.md)
- [ENS](./docs/ens.md)
- [ApeCoin DAO](./docs/apecoin.md)
