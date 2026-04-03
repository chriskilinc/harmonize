import { createContext, useContext, useMemo, useState } from "react";
import { ReactNode } from "react";
import { useSearchParams } from "react-router-dom";
import { chromaticScale } from "../utils/util";
import { Note } from "tonal";
import { Note as PitchNote } from "@tonaljs/pitch-note";
import { Scale } from "tonal";

interface IDataContext {
  note: PitchNote;
  scale: Scale.Scale;
  scaleNotes: string[];
  mode: string;
  key: string;
  octave: number;
  setNote: (note: PitchNote | string) => void;
  setOctave: (octave: number) => void;
  setMode: (mode: string) => void;
  setSearchParams: (
    callback: (params: URLSearchParams) => URLSearchParams
  ) => void;
  changeKey: (key: string) => void;
  changeMode: (mode: string) => void;
  getNoteObject: (note: string) => PitchNote;
}

interface DataProviderProps {
  children: ReactNode;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

export const DataProvider = ({ children }: DataProviderProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const key = useMemo(() => {
    const keyParam = searchParams.get("key")?.toUpperCase() || "C";
    return chromaticScale.includes(keyParam) ? keyParam : "C";
  }, [searchParams]);

  const mode = useMemo(() => {
    const modeParam = searchParams.get("mode") || "major";
    return Scale.names().includes(modeParam) ? modeParam : "major";
  }, [searchParams]);

  const [octave, setOctave] = useState(4);

  const note = useMemo(() => Note.get(`${key}${octave}`), [key, octave]);

  const scale = useMemo(() => {
    return Scale.get(`${note.name} ${Scale.get(mode).name}`);
  }, [note.name, mode]);

  const scaleNotes = useMemo(() => {
    return scale.notes.map(Note.get).map((scaleNote) => Note.simplify(scaleNote.pc));
  }, [scale.notes]);

  const getNoteObject = (note: string) => {
    return Note.get(`${note}${octave}`);
  };

  const changeKey = (key: string) => {
    const normalizedKey = key.toUpperCase();
    setSearchParams((params) => {
      const nextParams = new URLSearchParams(params);
      nextParams.set("key", normalizedKey);
      return nextParams;
    });
  };

  const changeMode = (mode: string) => {
    setSearchParams((params) => {
      const nextParams = new URLSearchParams(params);
      nextParams.set("mode", mode);
      return nextParams;
    });
  };

  const setNote = (nextNote: PitchNote | string) => {
    const parsedNote = typeof nextNote === "string" ? Note.get(nextNote) : nextNote;
    if (parsedNote.pc) {
      changeKey(parsedNote.pc);
    }
  };

  const setMode = (nextMode: string) => {
    changeMode(nextMode);
  };

  return (
    <DataContext.Provider
      value={{
        note,
        scale,
        scaleNotes,
        mode,
        key,
        octave,
        setNote,
        setOctave,
        setMode,
        setSearchParams,
        changeKey,
        changeMode,
        getNoteObject,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a DataProvider");
  }
  return context;
};
