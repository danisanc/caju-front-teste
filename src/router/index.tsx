import { createHashRouter } from "react-router-dom";

import DashboardPage from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

import routes from "./routes";

const router = createHashRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
  },
  {
    path: routes.newUser,
    element: <NewUserPage />,
  },
  {
    path: routes.history,
    element: <div>History</div>,
  },
  {
    path: "*",
    element: <DashboardPage />,
  },
]);

export default router;
