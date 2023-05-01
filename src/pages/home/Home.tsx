import { useEffect, useState } from 'react';

export function Home() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await fetch('/api/authentication');
      const isLoggedIn = data.status !== 401;

      setLoggedIn(isLoggedIn);
    })();
  }, []);

  const text = loggedIn ? (
    <div>
      <h1>Welcome to Student E-Journal</h1>
    </div>
  ) : (
    <div>
      <h1>Please log in</h1>
    </div>
  );

  return <div>{text}</div>;
}
