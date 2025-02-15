/* eslint-disable @next/next/no-img-element */

'use client';

// any component that uses useAuth needs this because if a component directly imports useAuth, it needs to be a client component since useAuth uses React hooks.

import { Button } from 'react-bootstrap';
import { signOut } from '@/utils/auth'; // anything in the src dir, you can use the @ instead of relative paths
import { useAuth } from '@/utils/context/authContext';

function Home() {
  const { user } = useAuth();

  return (
    <div className="home-background">
      <div className="container mt-4">
        <div className="image-container">
          <img src="images/Nox Sleep.PNG" alt="Nox Sleep" />
        </div>
        <div className="text-container">
          <h1>Welcome {user.displayName}! </h1>
          <p>Click the button below to logout</p>
          <Button variant="danger" type="button" size="lg" className="copy-btn" onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Home;
