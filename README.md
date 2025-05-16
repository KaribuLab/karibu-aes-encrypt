# Karibu -AES Encryption in ECB Mode

This Node.js application allows you to encrypt text using the AES algorithm in ECB mode and is compatible with decryption in Python.

## Requirements

- Node.js installed
- npm or yarn for installing dependencies

## Installation

1. Clone this repository or download the files
2. Run `npm install` to install dependencies
3. Configure your encryption key in the `.env` file (it comes with a default key in base64 format)

## Usage

To encrypt a text, run:

```bash
node index.js "text to encrypt"
```

The application will display:
- The original text
- The encrypted text (in base64 format)
- The decrypted text (to verify it works correctly)

## Configuration

The encryption key is defined in the `.env` file in base64 format:

```
AES_KEY=uGeaj5cQugtjN+EMPY/RU+DdrimuWcKEzZOfYTZwcYw=
```

**Important note:** The key must be in base64 format and represent the actual key (32 bytes for AES-256).

## Python Compatibility

This code is compatible with the following Python code for decryption:

```python
from base64 import b64decode
from Crypto.Cipher import AES
from Crypto.Util.Padding import unpad

def decrypt(data, encryption_key):
    key = b64decode(encryption_key)
    cipher = AES.new(key, AES.MODE_ECB)
    decrypted_data = unpad(cipher.decrypt(b64decode(data)), AES.block_size)
    return decrypted_data.decode("utf-8")
```

Make sure to install the PyCryptodome library in Python:

```bash
pip install pycryptodome
``` 