import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';

import { Header } from '~/components/Header';
import router from '~/router';

function App() {
  return (
    <>
      <Toaster richColors position="bottom-center" />

      <Header>
        <h1>Caju Front Teste</h1>
      </Header>

      <div style={{ marginTop: 64 }}>
        <RouterProvider router={router} />
      </div>
    </>
  );
}

export default App;
