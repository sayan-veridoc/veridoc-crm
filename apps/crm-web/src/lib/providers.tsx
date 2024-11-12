"use client";

import * as React from "react";

import { Toaster } from "@/components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "@/utils/react-query";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    // <Provider store={store}>
    //   <GoogleOAuthProvider clientId={"GOCSPX"}>
    //     <PersistGate loading={null} persistor={persistor}>
    <QueryClientProvider client={queryClient}>
      {children}
      <Toaster
        richColors
        closeButton
        // position="top-right"
      />
    </QueryClientProvider>
    //     </PersistGate>
    //   </GoogleOAuthProvider>
    // </Provider>
  );
}
