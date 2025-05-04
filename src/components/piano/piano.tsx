import { Note } from "tonal";
import { useDataContext } from "../../contexts/DataContext";
import { getArrangedChromaticScaleByKey } from "../../utils/util";
import "./piano.css";
import * as Tone from "tone";

export const Piano = () => {
  const { note, scaleNotes, octave, getNoteObject, volume } = useDataContext();

  const onClick = (e: React.MouseEvent<HTMLLIElement>) => {
    const { note, freq, midi } = e.currentTarget.dataset;
    console.log("Clicked: ", e.currentTarget.dataset);
    if (!note || !freq) return;

    const synth = new Tone.Synth().toDestination();
    const vol = new Tone.Volume(volume).toDestination();
    console.log("volume", volume);
    synth.connect(vol);

    synth.triggerAttackRelease(freq, "8n", Tone.now(), 1);
  };

  return (
    <ul className="piano-keys">
      {getArrangedChromaticScaleByKey(note.pc).map((note, i, arr) => {
        const noteObj = getNoteObject(note);
        const reactKey = `${note}-${i}`;
        const active =
          scaleNotes.includes(note) ||
          scaleNotes.includes(Note.enharmonic(note));
        const isBlack = note.includes("#") || note.includes("b");
        const pianoKey = isBlack ? "black" : "white";
        const isKey = note == scaleNotes[0];
        const classes = `key ${pianoKey} ${note}`;
        return (
          <li
            key={reactKey}
            data-note={note}
            data-active={active.toString()}
            data-iskey={isKey.toString()}
            data-midi={noteObj.midi}
            data-freq={noteObj.freq}
            className={classes}
            onClick={onClick}
          >
            <span>{note}</span>
          </li>
        );
      })}
    </ul>
  );
};
