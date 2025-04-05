import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, HomePage, AboutMePage, ContactsPage } from "@pages";

const routerConfig = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "aboutme", element: <AboutMePage /> },
      { path: "contacts", element: <ContactsPage /> },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);
