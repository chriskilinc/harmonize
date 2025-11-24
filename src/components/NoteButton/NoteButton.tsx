import "./NoteButton.css";

export const NoteButton = ({ note, selected, onClick }: { note: string, selected: boolean, onClick: () => void }) => {
  return (
    <button className={`note-button ${selected ? "selected" : ""}`} onClick={onClick}>{note}</button>
  );
};