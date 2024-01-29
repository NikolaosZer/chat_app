import { useState } from 'react';
import { Container, Button, Spinner } from 'react-bootstrap';
import { services } from '../services';
import { ToastContainer, toast } from 'react-toastify';
import UserList from './UserList';
const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [usersLoaded, setUsersLoaded] = useState(false);

  const handleLoadUsers = async () => {
    try {
      setIsLoading(true);
      await services.initUsersApi();
      setIsLoading(false);
      setUsersLoaded(true);
      toast.success('Users have been loaded!!!');
    } catch (err) {
      setIsLoading(false);
      toast.error(err.message);
    }
  };

  return (
    <Container id="users-container">
      <ToastContainer />
      {(!usersLoaded && (
        <div id="load-container">
          <div id="load-information">
            <p>
              For ChatApp we are using test data for the users information. In
              order load the test data please press the load button. The loading
              may take some time...
            </p>
          </div>
          <Button
            id="load-button"
            variant="primary"
            onClick={handleLoadUsers}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                {' Loading...'}
              </>
            ) : (
              'Load Users'
            )}
          </Button>
        </div>
      )) || <UserList />}
    </Container>
  );
};
export default Dashboard;
