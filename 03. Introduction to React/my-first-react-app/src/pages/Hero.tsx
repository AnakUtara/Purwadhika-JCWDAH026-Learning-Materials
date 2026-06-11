const Hero = () => {
	return (
		<section id="hero" className="relative full-height">
			<div className="absolute">
				<h1>Welcome to My First React App</h1>
				<p>
					This is a simple React application to get started with React
					development.
				</p>
			</div>
			<img
				src="https://images.pexels.com/photos/31464538/pexels-photo-31464538.jpeg"
				alt="Hero Image"
				className="absolute"
			/>
		</section>
	);
};

export default Hero;
