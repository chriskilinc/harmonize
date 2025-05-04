import { useDataContext } from "../contexts/DataContext";
import { chromaticScale } from "../utils/util";
import { Scale } from "tonal";
import { DropdownSelect } from "../components/DropdownSelect/DropdownSelect";
import { Piano } from "../components/piano/piano";
import { ScaleRow } from "../components/ScaleRow";
import { CopyButton } from "../components/CopyButton/CopyButton";

export const InitialSection = () => {
  const {
    note,
    scale,
    mode,
    octave,
    changeKey,
    changeMode,
    setOctave,
    volume,
    setVolume,
  } = useDataContext();

  const onKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    changeKey(e.target.value);
  };

  const onModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    changeMode(e.target.value);
  };

  const onOctaveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseInt(e.target.value, 10);
    setOctave(value);
  };

  const onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = parseFloat(e.target.value); // Slider value (0-1)
    console.log("value", value);
    const dB = value * 60 - 60; // Map to -60 dB to 0 dB
    console.log("dB", dB);
    setVolume(dB);
  };

  const defaultVolume = (volume + 60) / 60; // Map to 0-100 range
  console.log("defaultVolume", defaultVolume);

  return (
    <>
      <section className="flex flex-column flex-center gap-32">
        {!scale?.empty && <ScaleRow scale={scale} />}

        <Piano />

        <div className="flex gap-8 md-gap-16 flex-wrap flex-center">
          <DropdownSelect
            options={chromaticScale}
            defaultValue={note.pc}
            onChange={onKeyChange}
          />
          <DropdownSelect
            options={Scale.names()}
            defaultValue={mode}
            onChange={onModeChange}
          />
        </div>
        <p className="scale-name">
          {scale?.empty ? (
            <>Something went wrong..</>
          ) : (
            <>
              {scale.name}
              {scale.aliases.length > 0 && (
                <span style={{ fontStyle: "italic", fontSize: "0.75rem" }}>
                  {" "}
                  ({scale.aliases.join(", ")})
                </span>
              )}
              <CopyButton size={"1rem"} text={location.href} />
            </>
          )}
        </p>
      </section>
      <section
        className="synth-controls flex gap-16"
        style={{
          width: "100vw",
          height: "12.5rem",
          position: "absolute",
          bottom: 0,
          left: 0,
          backgroundColor: "grey",
        }}
      >
        <div className="synth-controls-wrapper">
          <div className="control">
            <header className="flex gap-8">
              <p>basic controls</p>
            </header>
            <div className="content">
              <div>
                <p>volume</p>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.01}
                  defaultValue={defaultVolume}
                  onChange={onVolumeChange}
                />
              </div>
              <div>
                <p>Octave</p>
                <input
                  type="number"
                  min={1}
                  max={9}
                  onChange={onOctaveChange}
                  defaultValue={octave}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// TODO: http://localhost:5173/?mode=lydian+%235P+pentatonic&key=A%23
// TODO: http://localhost:5173/?mode=minor+%237M+pentatonic&key=A%23
