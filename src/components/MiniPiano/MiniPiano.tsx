import { getArrangedChromaticScaleByKey } from '../../utils/util';
import { Note } from 'tonal';
import './MiniPiano.css';

export const MiniPiano = ({ selectedNotes, rootNote }: { selectedNotes: string[], rootNote?: string | null }) => {
  const octave = 4;
  const normalizedRoot = Note.simplify(rootNote || selectedNotes[0] || 'C');
  const root = Note.get(normalizedRoot + octave);
  const arrangedNotes = getArrangedChromaticScaleByKey(root.pc || 'C');

  return (
    <div className="mini-piano">
      {arrangedNotes.map((note, index) => {
        const noteObj = Note.get(note + octave);
        const isBlack = noteObj.pc.includes('#') || noteObj.pc.includes('b');
        const isSelected =
          selectedNotes.includes(noteObj.pc) ||
          selectedNotes.includes(Note.enharmonic(noteObj.pc));

        return (
          <div key={index} className={`key ${isBlack ? 'black' : 'white'}`}
            data-note={note}
            data-active={isSelected.toString()}
            data-isroot={(Note.simplify(noteObj.pc) === Note.simplify(root.pc)).toString()}
          >
          </div>
        );
      })}
    </div>
  );
};
