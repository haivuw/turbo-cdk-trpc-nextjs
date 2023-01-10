import { Button } from 'ui';
import { trpc } from '../trpc';

export default function Web() {
  const exampleQuery = trpc.example.hello.useQuery();
  return (
    <div>
      <h1>Web</h1>
      <h3>{`TRPC data: ${exampleQuery.data}`}</h3>
      <Button />
    </div>
  );
}
