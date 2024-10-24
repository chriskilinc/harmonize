import { createContext, useContext, useState } from 'react';
import { ReactNode } from 'react';
import { useSearchParams } from 'react-router-dom';
import { chromaticScale } from '../utils/util';
import { Note } from 'tonal';
import { Note as PitchNote } from '@tonaljs/pitch-note';
import { Scale } from 'tonal';


interface IDataContext {
    note: PitchNote;
    scale: Scale.Scale;
    scaleNotes: string[];
    mode: string;
    key: string;
    octave: number;
    setNote: (note: any) => void;
    setOctave: (octave: number) => void;
    setMode: (mode: string) => void;
    setSearchParams: (callback: (params: URLSearchParams) => URLSearchParams) => void;
    changeKey: (key: string) => void;
    changeMode: (mode: string) => void;
}

interface DataProviderProps {
    children: ReactNode;
}

const DataContext = createContext<IDataContext>({} as any);

export const DataProvider = ({ children }: DataProviderProps) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const keyParam = searchParams.get("key")?.toUpperCase() || "C";
    const keyParamValid = chromaticScale.includes(keyParam) ? keyParam : "C";

    const modeParam = searchParams.get("mode") || "major";
    const modeParamValid = Scale.names().includes(modeParam) ? modeParam : "major";

    const [octave, setOctave] = useState(4)
    const [note, setNote] = useState(Note.get(`${keyParamValid}${octave}`));
    const [mode, setMode] = useState(modeParamValid);

    const scale = Scale.get(`${note.name} ${Scale.get(mode).name}`);
    const scaleNotes = scale.notes.map(Note.get).map((note) => Note.simplify(note.pc));

    const changeKey = (key: string) => {
        setNote(Note.get(`${key}${octave}`));
        setSearchParams(params => {
            params.set("key", key);
            return params;
        });
    }

    const changeMode = (mode: string) => {
        setMode(mode);
        setSearchParams(params => {
            params.set("mode", mode);
            return params;
        });
    }

    return (
        <DataContext.Provider value={{ note, scale, scaleNotes, mode, key: keyParamValid, octave, setNote, setOctave, setMode, setSearchParams, changeKey, changeMode }}>
            {children}
        </DataContext.Provider>
    )
}

export const useDataContext = () => useContext(DataContext);