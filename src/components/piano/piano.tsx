import { Note } from 'tonal';
import { useDataContext } from '../../contexts/DataContext';
import { getArrangedChromaticScaleByKey } from '../../utils/util';
import './piano.css';

export const Piano = () => {

    const {note, scaleNotes} = useDataContext();

    return (
        <ul className="piano-keys">
            {getArrangedChromaticScaleByKey(note.pc).map((note, i, arr) => {
                const reactKey = `${note}-${i}`;
                const active = scaleNotes.includes(note) || scaleNotes.includes(Note.enharmonic(note));
                const isBlack = note.includes("#") || note.includes("b");
                const pianoKey = isBlack ? "black" : "white";
                const isKey = (note == scaleNotes[0]);
                const classes = `key ${pianoKey} ${note}`;
                return <li key={reactKey} data-note={note} data-active={active.toString()} data-iskey={isKey.toString()} className={classes}><span>{note}</span></li>
            })}
        </ul>
    );
}