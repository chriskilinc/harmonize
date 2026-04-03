import "./NoteButton.css";

// TODO: Implement on hover (not root), to make/switch root

export const NoteButton = ({ note, selected, isRoot, onClick, onRightClick }: { note: string, selected: boolean, isRoot: boolean, onClick: () => void, onRightClick?: () => void }) => {
  return (
    <button
      className={`note-button ${selected ? "selected" : ""} ${isRoot ? "root" : ""}`}
      onClick={onClick}
      onContextMenu={(e) => {
        e.preventDefault();
        onRightClick?.();
      }}
      title="Click to toggle note, right-click to set root"
    >
      {note}
    </button>
  );
};