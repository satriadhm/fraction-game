"use client";

import React, { createContext, useState, useContext, ReactNode } from "react";
import LoadingScreen from "../components/molecules/LoadingBar";

// Define the shape of our context
interface PageLoaderContextType {
  isLoading: boolean;
  startLoading: (message?: string) => void;
  stopLoading: () => void;
}

// Create the context with a default value
const PageLoaderContext = createContext<PageLoaderContextType>({
  isLoading: false,
  startLoading: () => {},
  stopLoading: () => {},
});

// Custom hook to use the PageLoader context
export const usePageLoader = () => useContext(PageLoaderContext);

interface PageLoaderProviderProps {
  children: ReactNode;
}

export const PageLoaderProvider: React.FC<PageLoaderProviderProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string>("Loading...");

  const startLoading = (message = "Loading...") => {
    setLoadingMessage(message);
    setIsLoading(true);
  };

  const stopLoading = () => {
    setIsLoading(false);
  };

  return (
    <PageLoaderContext.Provider
      value={{
        isLoading,
        startLoading,
        stopLoading,
      }}
    >
      {children}
      <LoadingScreen isLoading={isLoading} message={loadingMessage} />
    </PageLoaderContext.Provider>
  );
};

export default PageLoaderProvider;