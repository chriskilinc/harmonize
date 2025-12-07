import { getArrangedChromaticScaleByKey } from '../../utils/util';
import { Note } from 'tonal';
import './MiniPiano.css';

export const MiniPiano = ({ selectedNotes }: { selectedNotes: any[] }) => {
  const octave = 4;
  const root = Note.get(selectedNotes[0] + octave);
  const arrangedNotes = getArrangedChromaticScaleByKey(root.pc);

  return (
    <div className="mini-piano">
      {arrangedNotes.map((note, index) => {
        const noteObj = Note.get(note + octave);
        const isBlack = noteObj.pc.includes('#') || noteObj.pc.includes('b');
        const isSelected = selectedNotes.includes(noteObj.pc);

        return (
          <div key={index} className={`key ${isBlack ? 'black' : 'white'}`}
            data-note={note}
            data-active={isSelected.toString()}
            data-isroot={(noteObj.pc === root.pc).toString()}
          >
          </div>
        );
      })}
    </div>
  );
};
