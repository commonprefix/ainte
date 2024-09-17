# Ainte

Ainte is a command line tool that allows you to interact with the Ethereum blockchain. It is built with Bun and uses an LLM to generate bash commands for you. It is able to interoperate between the EthereumRPC, the Etherscan API and the foundry tooling to get you the information you need.

## Installation (Docker)

1. Copy .env.example to .env and set your `open_ai` key

```bash
docker build -t ainte .
docker run --rm -it -e ASSISTANT_NAME=your-assistants-name ainte
```
