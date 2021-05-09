# Caesar cipher CLI tool

## About

This is a CLI tool that encodes/decodes text by Caesar cipher (https://en.wikipedia.org/wiki/Caesar_cipher)

## Installastion

```bash
git clone git@github.com:abulynka/basic-nodejs-2021Q2.git
cd basic-nodejs-2021Q2/caesar-cipher-cli-tool
npm install
```

## How To Use

CLI tool accepts 4 options (short alias and full name):

- -s, --shift: a shift
- -i, --input: an input file
- -o, --output: an output file
- -a, --action: an action encode/decode

Run application examples:

- `node main.js -s 1 -a encode` - encodes from stdin and outputs result to stdout with shift 1
- `node main.js -s 1 -a decode` - decodes from stdin and outputs result to stdout with shift 1
- `node main.js -s 256 -a encode -i ./plain.txt -o ./encoded.txt` - encodes from plain.txt and outputs result to encoded.txt with shift 256 mod 26
- `node main.js -s 256 -a encode -i ./encoded.txt -o ./decoded.txt` - decodes from encoded.txt and outputs result to decoded.txt with shift 256 mod 26
