FROM oven/bun:1

RUN apt-get update && apt-get install -y curl jq git

# Install Foundry
RUN curl -L https://foundry.paradigm.xyz | bash
ENV PATH="/root/.foundry/bin:${PATH}"
RUN foundryup

WORKDIR /app
COPY . .
RUN bun install
CMD ["bun", "run", "start"]
