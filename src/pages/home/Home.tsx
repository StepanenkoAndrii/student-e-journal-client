import Grid from '@mui/material/Unstable_Grid2';
import './Home.css';
import { Button, Stack } from '@mui/material';
// import { useEffect, useState } from 'react';

export function Home() {
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   (async () => {
  //     const data = await fetch('/api/authentication');
  //     const isLoggedIn = data.status !== 401;

  //     setLoggedIn(isLoggedIn);
  //   })();
  // }, []);

  // const text = loggedIn ? (
  //   <div>
  //     <h1>Welcome to Student E-Journal</h1>
  //   </div>
  // ) : (
  //   <div>
  //     <h1>Please log in</h1>
  //   </div>
  // );

  // return <div>{text}</div>;

  // const [specialities, setSpecialities] = useState([]);
  // const [specialitiesVisibility, setSpecialitiesVisibility] = useState(false);

  async function handleSpecialitiesOnClick() {
    const data = await fetch('/api/specialities');
    const res = await data.json();
    console.log(res);
  }

  return (
    <Grid container spacing={2} className="main-grid">
      <Grid xs={12} className="top-menu-grid">
        <div>xs=6 md=4</div>
      </Grid>
      <Grid xs={2} className="left-menu-grid">
        <Stack spacing={2}>
          <Button variant="text" onClick={handleSpecialitiesOnClick}>
            Specialities
          </Button>
          <Button variant="text">Text</Button>
          <Button variant="text">Text</Button>
        </Stack>
      </Grid>
      <Grid xs={10} className="main-content-grid">
        <div>xs=6 md=8</div>
      </Grid>
    </Grid>
  );
}
