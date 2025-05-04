import { Interval, Note, RomanNumeral, Scale } from "tonal";
import "./ScaleRow.css";
import { useDataContext } from "../../contexts/DataContext";

interface ScaleRowProps {
  scale: Scale.Scale;
}

export const ScaleRow: React.FC<ScaleRowProps> = ({}) => {
  const { scale } = useDataContext();

  return (
    <div className="scale-row flex gap-16">
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
