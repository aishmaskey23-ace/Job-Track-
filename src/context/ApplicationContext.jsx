import { createContext, useContext } from "react";
import useApplications from "../hooks/useApplications";

const ApplicationContext = createContext(null);

export function ApplicationProvider({ children }) {
  const applicationData = useApplications();
  return (
    <ApplicationContext.Provider value={applicationData}>
      {children}
    </ApplicationContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApplicationContext() {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error(
      "useApplicationContext must be used within an ApplicationProvider"
    );
  }
  return context;
}