import { Sequence } from 'remotion';
import { News } from './News';
import newsData from './../public/news.json';
const DURATION_PER_SCENE = 150;
export const NewsScenes = () => {
    return (
        <>
            {newsData.map((text, index) => (
                <Sequence
                    key={index}
                    from={index * DURATION_PER_SCENE}
                    durationInFrames={DURATION_PER_SCENE}
                >
                    <News text={text} />
                </Sequence>
            ))}
        </>
    );
};