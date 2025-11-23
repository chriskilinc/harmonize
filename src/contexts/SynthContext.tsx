import { createContext, useContext, useState } from "react";
import { ReactNode } from "react";

interface ISynthContext {
  volume: number;
  setVolume: (volume: number) => void;
}

interface SynthProviderProps {
  children: ReactNode;
}

const SynthContext = createContext<ISynthContext>({} as any);

export const SynthProvider = ({ children }: SynthProviderProps) => {
  const [volume, setVolume] = useState(-7.5); // -7.5dB

  return (
    <SynthContext.Provider
      value={{
        volume,
        setVolume,
      }}
    >
      {children}
    </SynthContext.Provider>
  );
};

export const useSynthContext = () => useContext(SynthContext);
