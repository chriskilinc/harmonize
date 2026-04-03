import { Interval, Note, RomanNumeral, Scale } from "tonal";
import "./ScaleRow.css";

interface ScaleRowProps {
  scale: Scale.Scale;
}

export const ScaleRow: React.FC<ScaleRowProps> = ({ scale }) => {
  const noteCount = scale?.notes?.length ?? 0;
  const densityClass = noteCount > 9 ? "compact" : noteCount > 7 ? "dense" : "";

  return (
    <div className="scale-row-shell">
      <div className={`scale-row ${densityClass}`.trim()}>
        {scale?.notes?.map((note, i) => {
          const interval = scale.intervals[i];
          return (
            <div key={i} className="scale-interval" data-interval={interval}>
              <p className="scale-note">{Note.simplify(note)}</p>
              <p className="scale-numeral">
                {RomanNumeral.get(Interval.get(interval)).name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
