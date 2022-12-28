import { Box, Button, Group, Table, TextInput } from "@mantine/core";
import { LemonMarkets, LemonPosition } from "lemonmarkets-sdk";
import { useEffect, useState } from "react";

interface PositionsProps {
  client: LemonMarkets;
}

export const Positions = ({ client }: PositionsProps) => {
  const [ready, setReady] = useState<boolean>(false);
  const [positions, setPositions] = useState<LemonPosition[]>([]);

  useEffect(() => {
    if (!ready) return;

    const getPositions = async () => {
      const results = await client.getTradingClient().positions.getPositions();
      setPositions(results.data);
    };

    getPositions().catch(console.error);
  }, [ready]);

  if (!ready)
    return (
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Group position="center" mt="md">
          <Button type="submit" onClick={() => setReady(true)}>
            Load positions
          </Button>
        </Group>
      </Box>
    );

  if (!positions.length) return <>Loading positions...</>;

  return (
    <Table>
      <thead>
        <tr>
          <th>ISIN</th>
          <th>Title</th>
          <th>Quantity</th>
          <th>Average Buy</th>
          <th>Estimated Total</th>
          <th>Estimated Price</th>
        </tr>
      </thead>

      <tbody>
        {positions.map((position, i) => (
          <tr key={i}>
            <td>{position.isin}</td>
            <td>{position.isinTitle}</td>
            <td>{position.quantity}</td>
            <td>{position.buyPriceAvg / 10000}</td>
            <td>{position.estimatedPriceTotal / 10000}</td>
            <td>{position.estimatedPrice / 10000}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
