import { Box, Button, Code, Container, Group, Text } from "@mantine/core";
import { LemonAccount, LemonMarkets } from "lemonmarkets-sdk";
import { useEffect, useState } from "react";

interface AccountProps {
  client: LemonMarkets;
}

export const Account = ({ client }: AccountProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [account, setAccount] = useState<LemonAccount>();

  useEffect(() => {
    if (!ready) return;

    const getAccount = async () => {
      const results = await client.getTradingClient().account.getAccount();
      setAccount(results.data);
      console.log(results.data);
    };

    getAccount().catch(console.error);
  }, [ready]);

  if (!ready)
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Group position="center" mt="md">
          <Button type="submit" onClick={() => setReady(true)}>
            Load account
          </Button>
        </Group>
      </Box>
    );

  if (!account) return <>Loading account...</>;

  return (
    <>
      <Container>
        <Text>
          The account <Code>{account.accountId}</Code> registered with the email
          address <Code>{account.email}</Code> is on the{" "}
          <Code>{account.tradingPlan}</Code> trading plan.
        </Text>

        <Text>
          It has a balance of{" "}
          <Code>{(account.balance / 10000).toFixed(2)}</Code> Euros from which{" "}
          <Code>{(account.cashToInvest / 10000).toFixed(2)}</Code> Euros can be
          invested and{" "}
          <Code>{(account.cashToWithdraw / 10000).toFixed(2)}</Code> can be
          withdrawn.
        </Text>
      </Container>
    </>
  );
};
