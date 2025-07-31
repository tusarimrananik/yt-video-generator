import { Composition } from 'remotion';

export const RemotionRoot = () => {
  return (
    <Composition
      id="ProgrammingTimeline"
      component={ProgrammingTimeline}
      durationInFrames={30 * 9} // 9 entries in data × 1 second per entry
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
