import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react';
import { createStyles, Space } from '@mantine/core';
import React from 'react';
import { Layout } from '../components/layout/Layout';
import { SecurityData } from '../components/profile/SecurityData';
import { UserData } from '../components/profile/UserData';
import { UserPreferences } from '../components/profile/UserPreferences';

const useStyles = createStyles((theme) => ({
  content: {
    margin: 'auto',
    padding: 5,
    [theme.fn.largerThan('md')]: {
      maxWidth: '75%'
    }
  }
}));

const Profile = () => {
  const { classes } = useStyles();
  const { user } = useAuth0();
  const isNotFroGmail = user && !user.sub?.includes('google');
  return (
    <Layout>
      <div className={classes.content}>
        <Space h="xl" />
        <UserData />
        <Space h="xl" />
        <UserPreferences />
        {isNotFroGmail && (
          <>
            <Space h="xl" />
            <SecurityData />
          </>
        )}
      </div>
    </Layout>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <p>Redirecting to the login page...</p>
});
