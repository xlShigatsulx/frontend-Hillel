import { RouterProvider } from "react-router-dom";
import { router } from "./router/index.js";
import { Loader } from "@components";

export function App() {
  return (
    <RouterProvider
      router={router}
      fallbackElement={<Loader />}
      future={{ v7_startTransition: true }}
    />
  );
}

