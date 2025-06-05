
import React from 'react';
import AuthGuard from '../components/AuthGuard';
import ExplorePage from '../components/ExplorePage';

const Index = () => {
  return (
    <AuthGuard>
      <ExplorePage />
    </AuthGuard>
  );
};

export default Index;
