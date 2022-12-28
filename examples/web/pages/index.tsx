import { Box, Button, Divider, Group, TextInput, Title } from "@mantine/core";
import { LemonMarkets } from "lemonmarkets-sdk";
import Head from "next/head";
import { useEffect, useState } from "react";
import { Account } from "../components/Account";
import { Positions } from "../components/Positions";
import { Withdraw } from "../components/Withdraw";

export default function Home() {
  const [apiKey, setApiKey] = useState<string>("");
  const [ready, setReady] = useState<boolean>(false);

  const [client, setClient] = useState<LemonMarkets | null>(null);

  useEffect(() => {
    if (!ready || !apiKey) return;

    setClient(
      new LemonMarkets({
        tradingKey: apiKey,
      })
    );
  }, [ready, apiKey]);

  return (
    <>
      <Head>
        <title>Examples</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title order={1} my="md" align="center">
          Examples
        </Title>

        <Box sx={{ maxWidth: 300 }} mx="auto">
          <TextInput
            label="API Key"
            value={apiKey}
            onChange={(event) => setApiKey(event.currentTarget.value)}
          />

          <Group position="center" mt="md">
            <Button type="submit" onClick={() => setReady(true)}>
              Ready
            </Button>
          </Group>
        </Box>

        {client && (
          <>
            <Divider my={"lg"} />

            <Title order={2} my="md" align="center">
              Account
            </Title>
            <Account client={client} />

            <Divider my={"lg"} />

            <Title order={2} my="md" align="center">
              Positions
            </Title>
            <Positions client={client} />

            <Divider my={"lg"} />

            <Title order={2} my="md" align="center">
              Withdraw money
            </Title>
            <Withdraw client={client} />
          </>
        )}
      </main>
    </>
  );
}
