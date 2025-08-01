// import { Sequence, Audio } from 'remotion';
// import { News } from './News';
// import newsData from './../public/news.json';

// const DURATION_PER_SCENE = 150;

// export const NewsScenes = () => {
//     return (
//         <>
//             {/* Background audio for the entire composition */}
//             <Audio src={require('./../public/news-music.mp3')} />

//             {newsData.map((text, index) => (
//                 <Sequence
//                     key={index}
//                     from={index * DURATION_PER_SCENE}
//                     durationInFrames={DURATION_PER_SCENE}
//                 >
//                     <News text={text} />
//                 </Sequence>
//             ))}
//         </>
//     );
// };


import { Sequence, Audio } from 'remotion';
import { News } from './News';
import newsData from './../public/news.json';
import { getRandomSpotifyPreview } from './../server/spotify';
import { useEffect, useState } from 'react';

const DURATION_PER_SCENE = 150;

export const NewsScenes = () => {
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    useEffect(() => {
        getRandomSpotifyPreview()
            .then((song) => {
                console.log("Now playing:", song.name, "by", song.artist);
                setPreviewUrl(song.preview_url);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <>
            {previewUrl && <Audio src={previewUrl} />}

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
