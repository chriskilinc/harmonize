import { Interval, Note, RomanNumeral, Scale } from 'tonal';
import "./ScaleRow.css";


interface ScaleRowProps {
    scale: Scale.Scale;
}

export const ScaleRow: React.FC<ScaleRowProps> = ({ scale }) => {
    console.log("interval", Interval.get(scale.intervals[2]));
    console.log("RomanNumeral", RomanNumeral.get(Interval.get(scale.intervals[2])));
    return (
        <div className='scale-row flex gap-16'>
            {scale.notes.map((note, i) => {
                const interval = scale.intervals[i];
                return (
                    <div key={i} className='scale-interval' date-interval={interval}>
                        <p className='scale-note'>{Note.simplify(note)}</p>
                        <p className='scale-numeral'>{RomanNumeral.get(Interval.get(interval)).name}</p>
                    </div>)
            })}
        </div>
    );
}