import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../features/authentication/useUser";

import Spinner from "../ui/Spinner";
import { styled } from "styled-components";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-gray-50);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isLoadingUser, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoadingUser) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoadingUser, navigate]);

  if (isLoadingUser)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  return <>{isAuthenticated ? children : null}</>;
};

export default ProtectedRoute;
