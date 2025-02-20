import { Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

import { Home, Videos, Blogs, Topics } from "@pages/index";

const AppRouter = () => {
  return (
    <>
      <Route path="/">
        <Home></Home>
      </Route>
      <Route path="/videos">
        <QueryClientProvider client={queryClient}>
          <Videos></Videos>
        </QueryClientProvider>
      </Route>
      <Route path="/blogs">
        <Blogs></Blogs>
      </Route>
      <Route path="/topics">
        <Topics></Topics>
      </Route>
    </>
  );
};

export default AppRouter;
