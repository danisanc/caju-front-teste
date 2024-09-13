import { RouterProvider } from "react-router-dom";

import { Header } from "~/components/Header";
import router from "~/router";

function App() {
  return (
    <>
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
