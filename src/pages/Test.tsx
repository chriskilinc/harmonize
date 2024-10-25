import { Note, Scale } from "tonal";
import { useSearchParams } from 'react-router-dom';
import { chromaticScale } from '../utils/util';
import { useDataContext } from '../contexts/DataContext';

//  https://github.com/tonaljs/tonal/tree/main/packages/midi
//  https://github.com/tonaljs/tonal

export const Test = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const { octave, setMode, note, mode, scale, scaleNotes, setNote } = useDataContext();


    // const modesPaths = Scale.names().map((scaleName) => encodeURIComponent(Scale.get(scaleName).name));
    // console.log("Modes as Path", modesPaths);
    // console.log("Modes paths decoded", modesPaths.map(decodeURIComponent).map((mode) => mode.replace("-", " ")));
    // console.log("Modes paths decoded", modesPaths.map(decodeURIComponent));

    // const x = Scale.get(`${note.name} ${Scale.get(mode).name}`)
    // console.log("Scale", x)
    // const note = Note.get("C#4");
    // const scaleFreqs = [...scale.notes].map(Note.freq);
    // const pitchClasses = scale.notes.map(Note.pitchClass);

    // console.log("Scale freqs", scaleFreqs)
    // console.log("Pitch Classes", pitchClasses)


    // const midis = scale.notes.map(Note.midi) as number[];
    // const midiNotes = midis.map((midi) => Midi.midiToNoteName(midi, { sharps: note.acc === "#" }));
    // const notesFromMidi = note.acc === "#" ? midis.map(Note.fromMidiSharps) : midis.map(Note.fromMidi);
    // console.log("Notes from MIDIs", notesFromMidi)
    // console.log("MIDIs", midis)
    // console.log("MIDI Notes", midiNotes)

    // const chords = Scale.scaleChords(scale.name);
    // console.log("Chords", chords)
    // const cordes2 = Chord.detect(scale.notes);
    // console.log("Chords2", ...cordes2)

    // console.log("Detect", Scale.detect(scale.notes))
    // console.log("Detect exact", Scale.detect(scale.notes, { match: "exact" }))
    // console.log("Detect with Tonic", Scale.detect(scale.notes, { tonic: note.letter }))
    // console.log("Detect exact with Tonic", Scale.detect(scale.notes, { match: "exact", tonic: note.letter }))

    // console.log("Scale Chords", Scale.scaleChords(scale.name))
    // console.log("Scale Mode Names", Scale.modeNames(scale.name))

    const onKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();

        console.log("Key Change", e.target.value)
        setNote(Note.get(`${e.target.value}${octave}`));
        setSearchParams(params => {
            params.set("key", e.target.value);
            return params;
        });
    }

    const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        setMode(e.target.value);
        setSearchParams(params => {
            params.set("mode", e.target.value);
            return params;
        });
    }

    return (
        <section>
            <select defaultValue={note.pc} onChange={onKeyChange}>
                {chromaticScale.map((noteName) => (
                    <option key={noteName} value={noteName}>{noteName}</option>
                ))}
            </select>

            <select defaultValue={mode} onChange={onModeChange}>
                {Scale.names().map((scaleName) => (
                    <option key={scaleName} value={scaleName}>{scaleName}</option>
                ))}
            </select>

            <h1>Harmonize</h1>
            <p><b>Note:</b> {note.name}</p>
            <p><b>Scale Name:</b> {scale.name}{scale.aliases.length > 0 && <span> ({scale.aliases.join(", ")})</span>} </p>
            <p><b>Scale:</b> {scale.notes.join(", ")}</p>
            <p><b>Scale simple:</b> {scaleNotes.join(", ")}</p>
            {/* <p><b>Pitch classes:</b> {pitchClasses.join(", ")}</p>
            <p><b>freqs:</b> {scaleFreqs.join(", ")}</p>
            <p><b>MIDIs:</b> {midis.join(", ")}</p>
            <p><b>Notes from MIDIs:</b> {notesFromMidi.join(", ")}</p>
            <p><b>MIDI Notes:</b> {midiNotes.join(", ")}</p> */}

            <div>
                {/* <Piano /> */}
            </div>

        </section>

    )
}