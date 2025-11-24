import React from "react";
import { Note } from "tonal";
import { useDataContext } from "../../contexts/DataContext";
import { getArrangedChromaticScaleByKey } from "../../utils/util";
import "./piano.css";
import * as Tone from "tone";
import { useSynthContext } from '../../contexts/SynthContext';
import { useFeatureContext } from '../../contexts/FeatureContext';

interface PianoKey {
  note?: string;
  freq?: number;
  midi?: number;
}

export const Piano = ({ selectedNotes, rootNote }: { selectedNotes: string[], rootNote: any }) => {
  const { getNoteObject } = useDataContext();
  const { synth: isSynthEnabled } = useFeatureContext();
  const { volume } = useSynthContext();
  const arrangedNotes = getArrangedChromaticScaleByKey(rootNote.pc);

  // Create a persistent PolySynth with Reverb
  const synthRef = React.useRef<Tone.PolySynth | null>(null);
  const reverbRef = React.useRef<Tone.Reverb | null>(null);

  React.useEffect(() => {
    if (!synthRef.current) {
      reverbRef.current = new Tone.Reverb({ decay: 2, wet: 0.3, preDelay: 0.01 }).toDestination();
      synthRef.current = new Tone.PolySynth(Tone.Synth, { oscillator: { type: "amtriangle" } }).connect(reverbRef.current);
    }
    // Clean up on unmount
    return () => {
      if (synthRef.current) {
        synthRef.current.dispose();
        synthRef.current = null;
      }
      if (reverbRef.current) {
        reverbRef.current.dispose();
        reverbRef.current = null;
      }
    };
  }, []);

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "q") {
        const firstNote = arrangedNotes[0];
        const noteObj = getNoteObject(firstNote);
        triggerNote({
          note: firstNote,
          freq: noteObj.freq ?? undefined,
          midi: noteObj.midi ?? undefined,
        });
      } else if (e.key.toLowerCase() === "w") {
        const thirdNote = arrangedNotes[2];
        const noteObj = getNoteObject(thirdNote);
        triggerNote({
          note: thirdNote,
          freq: noteObj.freq ?? undefined,
          midi: noteObj.midi ?? undefined,
        });
      } else if (e.key.toLowerCase() === "e") {
        const fifthNote = arrangedNotes[4];
        const noteObj = getNoteObject(fifthNote);
        triggerNote({
          note: fifthNote,
          freq: noteObj.freq ?? undefined,
          midi: noteObj.midi ?? undefined,
        });
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getNoteObject, arrangedNotes]);

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { note, freq, midi } = e.currentTarget.dataset;
    const key: PianoKey = { note, freq: Number(freq), midi: Number(midi) };
    triggerNote(key);
  };

  const triggerNote = (key: PianoKey) => {
    // TODO: Implement Hold functionality
    // TODO: Implement Visual Feedback on key press
    if (!isSynthEnabled || !key.note || !key.freq) return;
    if (synthRef.current && !synthRef.current.disposed) {
      synthRef.current.set({ volume });
      synthRef.current.triggerAttackRelease(key.freq, "16n", Tone.now(), 1);
    }
  };

  return (
    <ul className="piano-keys">
      {arrangedNotes.map((n, i, arr) => {
        const noteObj = getNoteObject(n);
        const reactKey = `${n}-${i}`;
        const active =
          selectedNotes.includes(n) ||
          selectedNotes.includes(Note.enharmonic(n));
        const isBlack = n.includes("#") || n.includes("b");
        const pianoKey = isBlack ? "black" : "white";
        const isKey = n == selectedNotes[0];
        const classes = `key ${pianoKey} ${n}`;
        return (
          <li
            key={reactKey}
            data-note={n}
            data-active={active.toString()}
            data-iskey={isKey.toString()}
            data-midi={noteObj.midi}
            data-freq={noteObj.freq}
            className={classes}
            onClick={onClick}
          >
            <span>{n}</span>
          </li>
        );
      })}
    </ul>
  );
};
