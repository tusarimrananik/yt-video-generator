import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

type NewsProps = {
	text: string;
};

export const News: React.FC<NewsProps> = ({ text }) => {
	const frame = useCurrentFrame();

	// Smooth scale-in animation
	const scale = interpolate(frame, [0, 30], [0.8, 1], {
		extrapolateRight: 'clamp',
	});

	// Fade-in effect
	const opacity = interpolate(frame, [0, 20], [0, 1], {
		extrapolateRight: 'clamp',
	});

	return (
		<AbsoluteFill
			style={{
				background: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				padding: '60px',
			}}
		>
			<h1
				style={{
					color: '#ffffff',
					fontSize: '64px',
					fontWeight: 700,
					textAlign: 'center',
					lineHeight: 1.3,
					transform: `scale(${scale})`,
					opacity,
					textShadow: '0px 4px 20px rgba(0,0,0,0.7)',
					fontFamily: 'Arial, Helvetica, sans-serif',
				}}
			>
				{text}
			</h1>
		</AbsoluteFill>
	);
};
