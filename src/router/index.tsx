import { createHashRouter } from "react-router-dom";

import DashboardPage, { dashboardLoader } from "~/pages/Dashboard";
import NewUserPage from "~/pages/NewUser";

import routes from "./routes";

const router = createHashRouter([
  {
    path: routes.dashboard,
    element: <DashboardPage />,
    loader: dashboardLoader,
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
    loader: dashboardLoader,
  },
]);

export default router;
