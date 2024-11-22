import React from 'react';
import { Link } from 'react-router-dom';
import { Server, Cloud, Globe, Shield } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-600 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">
              Your Website, Your Cloud, Your Way
            </h1>
            <p className="text-xl mb-8">
              Professional web hosting and cloud storage solutions for everyone
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/register"
                className="bg-white text-green-700 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors"
              >
                Get Started
              </Link>
              <Link
                to="/login"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose HostCan?</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Server className="w-8 h-8 text-green-600" />}
            title="Lightning Fast Hosting"
            description="State-of-the-art servers ensuring your website loads in milliseconds"
          />
          <FeatureCard
            icon={<Cloud className="w-8 h-8 text-green-600" />}
            title="Secure Cloud Storage"
            description="Keep your files safe and accessible from anywhere"
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-green-600" />}
            title="Free Subdomains"
            description="Get your website online instantly with our free subdomains"
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-green-600" />}
            title="Advanced Security"
            description="Enterprise-grade security to protect your data"
          />
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PricingCard
              title="Starter"
              price="Free"
              features={[
                "1GB Storage",
                "Free Subdomain",
                "Basic Support",
                "Community Access"
              ]}
            />
            <PricingCard
              title="Pro"
              price="$9.99"
              features={[
                "10GB Storage",
                "Custom Domain",
                "Priority Support",
                "Advanced Statistics"
              ]}
              highlighted
            />
            <PricingCard
              title="Enterprise"
              price="$29.99"
              features={[
                "Unlimited Storage",
                "Multiple Domains",
                "24/7 Support",
                "Custom Solutions"
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function PricingCard({ title, price, features, highlighted = false }: { 
  title: string; 
  price: string; 
  features: string[];
  highlighted?: boolean;
}) {
  return (
    <div className={`p-8 rounded-xl ${
      highlighted 
        ? 'bg-green-600 text-white transform scale-105' 
        : 'bg-white'
    }`}>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Free" && <span className="text-sm">/month</span>}
      </div>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <svg className={`w-5 h-5 mr-2 ${
              highlighted ? 'text-white' : 'text-green-600'
            }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
            {feature}
          </li>
        ))}
      </ul>
      <button className={`w-full py-3 rounded-lg font-semibold transition-colors ${
        highlighted
          ? 'bg-white text-green-600 hover:bg-green-50'
          : 'bg-green-600 text-white hover:bg-green-700'
      }`}>
        Get Started
      </button>
    </div>
  );
}