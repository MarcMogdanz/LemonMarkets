import {
  Alert,
  Box,
  Button,
  Code,
  Container,
  Group,
  TextInput,
} from "@mantine/core";
import { LemonMarkets } from "lemonmarkets-sdk";
import { useEffect, useState } from "react";

interface WithdrawProps {
  client: LemonMarkets;
}

export const Withdraw = ({ client }: WithdrawProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [amount, setAmount] = useState<string | undefined>();

  const [resultMetadata, setResultMetadata] = useState<any>();
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (!ready || !amount) return;

    const createWithdrawal = async () => {
      const results = await client
        .getTradingClient()
        // TODO
        .account.createWithdrawal({ amount: Number.parseInt(amount) });
      setResultMetadata(results.metadata);
    };

    createWithdrawal()
      .catch((error) => setError(error.message))
      .finally(() => setReady(false));
  }, [ready, amount]);

  return (
    <>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <TextInput
          label="Amount"
          value={amount}
          onChange={(event) => setAmount(event.currentTarget.value)}
        />

        <Group position="center" mt="md">
          <Button type="submit" onClick={() => setReady(true)}>
            Create withdrawal
          </Button>
        </Group>
      </Box>

      <Container my={"md"}>
        {resultMetadata && <Code>{JSON.stringify(resultMetadata)}</Code>}

        {error && (
          <Alert title="Bummer!" color="red">
            {error}
          </Alert>
        )}
      </Container>
    </>
  );
};
