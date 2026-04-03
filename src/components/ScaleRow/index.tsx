import { Interval, Note, RomanNumeral, Scale } from "tonal";
import "./ScaleRow.css";

interface ScaleRowProps {
  scale: Scale.Scale;
}

export const ScaleRow: React.FC<ScaleRowProps> = ({ scale }) => {

  return (
    <div className="scale-row">
      {scale?.notes?.map((note, i) => {
        const interval = scale.intervals[i];
        return (
          <div key={i} className="scale-interval" date-interval={interval}>
            <p className="scale-note">{Note.simplify(note)}</p>
            <p className="scale-numeral">
              {RomanNumeral.get(Interval.get(interval)).name}
            </p>
          </div>
        );
      })}
    </div>
  );
};
