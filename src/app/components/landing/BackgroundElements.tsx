import { GridPattern } from "./GridPattern";

export default function BackgroundElements() {
  return (
    <>
      <div className="fixed top-0 z-[-2] h-full w-full bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <GridPattern
        width={40}
        height={40}
        x={-1}
        y={-1}
        squares={[
          [0, 1],
          [1, 3],
        ]}
        className="fixed inset-0 z-[-1] h-full w-full fill-white/[0.02] stroke-white/[0.04] [mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)]"
      />
    </>
  );
}