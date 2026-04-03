import { createContext, useContext } from "react";
import { ReactNode } from "react";

interface IFeatureContext {
  synth: boolean;
  chords: boolean;
  test: boolean;
}

interface FeatureProviderProps {
  children: ReactNode;
}

const FeatureContext = createContext<IFeatureContext>({} as any);

export const FeatureProvider = ({ children }: FeatureProviderProps) => {
  const synth = false;
  const chords = false;
  const test = false;

  return (
    <FeatureContext.Provider
      value={{
        synth,
        chords,
        test,
      }}
    >
      {children}
    </FeatureContext.Provider>
  );
};

export const useFeatureContext = () => useContext(FeatureContext);
