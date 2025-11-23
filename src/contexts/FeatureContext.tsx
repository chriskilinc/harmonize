import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface IFeatureContext {
  synth: boolean;
}

interface FeatureProviderProps {
  children: ReactNode;
}

const FeatureContext = createContext<IFeatureContext>({} as any);

export const FeatureProvider = ({ children }: FeatureProviderProps) => {
  const [synth, setSynth] = useState(false);

  console.log("synth", synth);

  return (
    <FeatureContext.Provider
      value={{
        synth,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureContext = () => useContext(FeatureContext);
