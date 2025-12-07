import { Note, Scale } from 'tonal';
import { MiniPiano } from '../MiniPiano/MiniPiano';

export const ScaleCard = ({ scale, index }: { scale: string, index: number }) => {
  if (!scale) return null;

  const scaleObj = Scale.get(scale);
  const notes = new Set(scaleObj.notes.map(n => Note.simplify(n)));

  if (notes.size === 0) return null;

  const url = new URL(`${window.location.origin}/`);
  url.searchParams.set('key', scaleObj.tonic || '');
  url.searchParams.set('mode', scaleObj.type || '');

  return (
    <a href={url.toString()} className='scale-card' key={index}>
      <h2>
        {scale}
      </h2>
      <p>
        {Scale.get(scale).notes.map(n => Note.simplify(n)).join(' ')}
      </p>
      <MiniPiano selectedNotes={Array.from(notes)} />
    </a>
  );
}