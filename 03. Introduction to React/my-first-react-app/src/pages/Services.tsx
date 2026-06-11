import services from "../data/services";

const Services = () => {
	return (
		<section id="services" className="full-height">
			<div>
				<div>
					<h2>Our Services</h2>
					<p>
						We offer a wide range of services to meet your needs. Our team of
						experts is here to help you achieve your goals.
					</p>
				</div>
				<div className="grid-cols-3">
					{services.map((service) => (
						<div key={service.id} className="card">
							<div className="card-icon">{service.icon}</div>
							<h3>{service.title}</h3>
							<p>{service.description}</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Services;
