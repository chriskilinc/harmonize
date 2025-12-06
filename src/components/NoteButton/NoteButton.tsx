import "./NoteButton.css";

// TODO: Implement on hover (not root), to make/switch root

export const NoteButton = ({ note, selected, isRoot, onClick }: { note: string, selected: boolean, isRoot: boolean, onClick: () => void }) => {
  return (
    <button className={`note-button ${selected ? "selected" : ""} ${isRoot ? "root" : ""}`} onClick={onClick}>{note}</button>
  );
};