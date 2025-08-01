// Root.tsx
import { Composition } from 'remotion';
import { NewsScenes } from './NewsScenes';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="NewsVideo"
        component={NewsScenes}
        durationInFrames={150 * 5}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
