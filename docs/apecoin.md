## How It Works

## UI

![apecoin-ui](./img/apecoin-ui.png)

## Created Verifiable Credential

```
{
  "@context": ["https://www.w3.org/2018/credentials/v1"],
  "id": "id",
  "type": ["VerifiableCredential", "IdP3DelegatedCredential"],
  "issuer": "did:pkh:eip155:1:0x3dAf2eAE4Fe3232Ed8a29c5e1be6eEba81C1CFD6#controller",
  "credentialSubject": {
    "id": "did:ion:EiC0QUuTNetrwATkbj5etrrtbj0B6BhyWEmWgE7x9RaP8Q:eyJkZWx0YSI6eyJwYXRjaGVzIjpbeyJhY3Rpb24iOiJyZXBsYWNlIiwiZG9jdW1lbnQiOnsicHVibGljS2V5cyI6W3siaWQiOiJzaWduaW5nS2V5IiwicHVibGljS2V5SndrIjp7ImNydiI6InNlY3AyNTZrMSIsImt0eSI6IkVDIiwieCI6ImxlbVhicGNxa3VyTzVWM1ZWNko1MDBCbjl0cVMwLWlfX1dhajRGVmFUcm8iLCJ5IjoiV0pMRzZTZHJ2LUVDaWhlNVdZOUYzanlzcTBGZXhyVUxETDhTc1NaOXhPRSJ9LCJwdXJwb3NlcyI6WyJhdXRoZW50aWNhdGlvbiJdLCJ0eXBlIjoiRWNkc2FTZWNwMjU2azFWZXJpZmljYXRpb25LZXkyMDE5In1dfX1dLCJ1cGRhdGVDb21taXRtZW50IjoiRWlDVW5YT0RQRlRSRXZJWWliSDV3bDhlU2FpU0ZkTjJDUkdIWmRKel9EV3I3ZyJ9LCJzdWZmaXhEYXRhIjp7ImRlbHRhSGFzaCI6IkVpQWxUMUpTRC1hT1YzTkdoSnFOWnlpVTI3Q2htbFc5SjVVTjFXWjZBQXo4RnciLCJyZWNvdmVyeUNvbW1pdG1lbnQiOiJFaUNVblhPRFBGVFJFdklZaWJINXdsOGVTYWlTRmROMkNSR0haZEp6X0RXcjdnIn19",
    "hash": "v0.0.0:9A9acRCXmLNl+/e1KIP2TC+kYsrbV/VzIO3BwcOe1YA=",
    "@context": [
      {
        "hash": "https://schema.org/Text",
        "provider": "https://schema.org/Text"
      }
    ],
    "provider": "ApeCoin",
    "balance": "1"
  },
  "proof": {
    "type": "EthereumEip712Signature2021",
    "proofPurpose": "assertionMethod",
    "proofValue": "0x0b0c9d50f71a0121e36fb4258696ca4d75e494b36557c4da6931667c8937c95a7f702e53c7f44438b07651fcf048984872ecb8babcb805efb025460ae483bbf11b",
    "verificationMethod": "did:pkh:eip155:1:0x3dAf2eAE4Fe3232Ed8a29c5e1be6eEba81C1CFD6#controller#controller",
    "eip712": {
      "domain": {
        "name": "IdP3",
        "version": "1",
        "chainId": 1
      },
      "types": {
        "VerifiableCredential": [
          {
            "name": "@context",
            "type": "string[]"
          },
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string[]"
          },
          {
            "name": "issuer",
            "type": "string"
          },
          {
            "name": "credentialSubject",
            "type": "CredentialSubject"
          }
        ],
        "CredentialSubject": [
          {
            "name": "id",
            "type": "string"
          },
          {
            "name": "provider",
            "type": "string"
          }
        ]
      },
      "primaryType": "VerifiableCredential"
    }
  }
}
```
