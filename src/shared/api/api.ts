import { QueryClient } from "@tanstack/react-query";

class Api {
  queryClient = new QueryClient();
}

export const api = new Api();
