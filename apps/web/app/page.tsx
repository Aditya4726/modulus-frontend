import { Navbar } from "./components/landing/navbar";
import { Hero } from "./components/landing/hero";
import { Features } from "./components/landing/features";
import { Architecture } from "./components/landing/architecture";
import { ReliabilityLoop } from "./components/landing/reliability-loop";
import { Integrations } from "./components/landing/integrations";
import { HowItWorks } from "./components/landing/how-it-works";
import { Security } from "./components/landing/security";
import { CTA } from "./components/landing/cta";
import { Footer } from "./components/landing/footer";

export default function LandingPage() {
	return (
		<>
			<Navbar />
			<Hero />
      <ReliabilityLoop /> 
			<Features />
			<Architecture />
			<Integrations />
			<HowItWorks />
			<Security />
			<CTA />
			<Footer />
		</>
	);
}