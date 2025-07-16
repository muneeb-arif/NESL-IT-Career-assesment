import { AuthProvider, useAuth } from './auth.jsx';
import LoginPage from './LoginPage';
import PostPage from './PostPage';

function InnerApp() {
  const { token } = useAuth();
  return token ? <PostPage /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <InnerApp />
    </AuthProvider>
  );
}

export default App;
