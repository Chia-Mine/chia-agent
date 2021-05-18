# Sample Node.js script for sending email when proof is found.

## How to use

### 1. Install dependencies
```cmd
npm install
```
### 2. Prepare Gmail API credentials
Read below to create Gmail API credential.  
https://developers.google.com/gmail/api/quickstart/nodejs

Put the credential file (names `creadential.json`) under `./gmail/` directory.

### 3. Edit recipient/sender email addresses
See lines in `main.js`. You can't miss where to edit.

### 4. Monitor proof status
```cmd
node ./main.js
```