import { createBrowserRouter } from "react-router-dom";
import { ErrorPage, HomePage, SwapiPage, TodoPage } from "@pages";

const routerConfig = [
  {
    path: "/",
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      { index: true, element: <HomePage /> },
      { path: "swapi", element: <SwapiPage /> },
      { path: "todo", element: <TodoPage /> },
    ],
  },
];

export const router = createBrowserRouter(routerConfig);
