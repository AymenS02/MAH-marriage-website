import React, { useState, useEffect } from 'react';
import { Heart, Users, Shield, CheckCircle, ArrowRight, Star, MessageCircle, Calendar, UserCheck, ArrowBigDown, ArrowBigDownDash, ArrowBigDownIcon } from 'lucide-react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import { useRouter } from 'next/navigation';

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }));
    }, 100);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(prev => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id]').forEach((el) => {
      observer.observe(el);
    });

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

//   const testimonials = [
//     {
//       name: "Amina & Omar",
//       text: "We found each other through this blessed platform. The Imam's guidance made our journey smooth and meaningful.",
//       location: "Toronto, ON"
//     },
//     {
//       name: "Fatima & Ahmed",
//       text: "The process was respectful and thorough. We're grateful for the community support in finding our life partner.",
//       location: "Hamilton, ON"
//     },
//     {
//       name: "Khadija & Hassan",
//       text: "Alhamdulillah, we've been happily married for 2 years now. This platform truly works with Allah's blessing.",
//       location: "Mississauga, ON"
//     }
//   ];

  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Islamic Guidance",
      description: "Every match is reviewed and guided by our respected Imam, Shaykh Reda Bedier"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Focus",
      description: "Connect with like-minded individuals from our local Muslim community"
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Meaningful Connections",
      description: "Find a spouse who shares your values, faith, and life aspirations"
    },
    {
      icon: <UserCheck className="w-8 h-8" />,
      title: "Verified Profiles",
      description: "All applications are carefully reviewed to ensure authenticity and sincerity"
    }
  ];

  const steps = [
    {
      number: "01",
      title: "Submit Application",
      description: "Complete our comprehensive application form with your details and preferences"
    },
    {
      number: "02",
      title: "Imam Review",
      description: "Shaykh Reda Bedier personally reviews your application and verifies your information"
    },
    {
      number: "03",
      title: "Matching Process",
      description: "Our Imam identifies potentially compatible matches based on Islamic principles"
    },
    {
      number: "04",
      title: "Facilitated Meeting",
      description: "Guided introductions in a respectful, Islamic environment with family involvement"
    }
  ];

  const router = useRouter();

  const handleBeginApplication = () => {
    router.push('/application');
  };

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
//     }, 5000);
//     return () => clearInterval(interval);
//   }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-green-50 to-white">
      {/* Header */}
      <header className="hidden lg:block bg-gradient-to-br from-green-800 to-green-600 text-black py-5 px-5 md:px-12 lg:px-28 backdrop-blur-sm sticky top-0 z-50 border-green-100">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="  rounded-full flex items-center justify-center">
                <Image src={assets.mah_logo} alt='' width={200} height={400} className='' />
            </div>
          </div>
          <button 
            onClick={handleBeginApplication}
            className="flex items-center gap-2 py-2 px-4 sm:py-3 sm:px-6 bg-white text-green-800 font-medium rounded-xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-green-900/25 border border-transparent hover:border-green-200"
          >
            Login/Register <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-[25vh] px-5 md:px-12 lg:px-28">
        <div className={`text-center transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-4xl sm:text-6xl font-bold text-gray-900 mb-6">
            Find a Compatible 
            <span className="text-green-800 block">Spouse</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Guided and Facilitated by our Imam, <b>Shaykh Reda Bedier</b>, in accordance with Islamic principles and community values
          </p>
          
          <div className="mb-16">
            <button 
              onClick={handleBeginApplication}
              className="bg-green-800 text-white font-semibold py-4 px-8 rounded-lg text-lg hover:bg-green-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Begin Your Application
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-center">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">100% Halal Process</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Imam Supervised</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-gray-700">Community Based</span>
            </div>
          </div>
          <ArrowBigDownIcon className="w-8 h-8 text-green-800 animate-bounce mx-auto mt-16" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-5 md:px-12 lg:px-28 bg-white">
        <div className={`transition-all duration-1000 delay-200 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Platform?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`text-center p-6 rounded-xl bg-gradient-to-br from-green-50 to-white shadow-lg hover:shadow-xl transition-all duration-500 hover:scale-105 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 bg-green-800 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="process" className="py-20 px-5 md:px-12 lg:px-28 bg-gradient-to-br from-green-50 to-white">
        <div className={`transition-all duration-1000 ${isVisible.process ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            How It Works
          </h2>
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div 
                key={index} 
                className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} max-md:flex-col transition-all duration-700`}
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className={`flex-1 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="text-6xl font-bold text-green-800 opacity-20 mb-2">{step.number}</div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600 text-lg">{step.description}</p>
                </div>
                <div className="max-md:hidden w-16 h-16 bg-green-800 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                  {index + 1}
                </div>
                <div className="flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      {/* <section id="testimonials" className="py-20 px-5 md:px-12 lg:px-28 bg-white">
        <div className={`transition-all duration-1000 ${isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-16">
            Success Stories
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 shadow-xl">
              <div className="flex items-center justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-500 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl text-gray-700 text-center mb-6 italic">
                "{testimonials[currentTestimonial].text}"
              </blockquote>
              <div className="text-center">
                <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[currentTestimonial].location}</p>
              </div>
              <div className="flex justify-center mt-6 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentTestimonial ? 'bg-green-800' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="cta" className="py-24 px-5 md:px-12 lg:px-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-800 via-green-700 to-green-900"></div>
        <div className="absolute inset-0 bg-black opacity-10"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-white opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white opacity-5 rounded-full blur-2xl"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-green-400 opacity-20 rounded-full blur-lg"></div>
        
        <div className={`relative z-10 text-center transition-all duration-1000 ${isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
              Ready to Find Your 
              <span className="block text-green-200">Life Partner?</span>
            </h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto mb-12 leading-relaxed">
              Join our community and take the first step towards a blessed marriage, guided by Islamic principles and our respected Imam
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button 
                onClick={handleBeginApplication}
                className="group relative bg-white text-green-800 font-bold py-5 px-10 rounded-2xl text-lg transition-all duration-300 hover:scale-105 shadow-2xl hover:shadow-green-900/25 border-2 border-transparent hover:border-green-200"
              >
                <span className="relative z-10 flex items-center gap-3">
                  Begin Your Application
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
              </button>
              
              <div className="flex items-center gap-4 text-green-100">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">100% Free to Apply</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm">Imam Supervised</span>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-green-200 text-sm">
                "And one of His signs is that He created for you spouses from among yourselves so that you may find comfort in them." - Quran 30:21
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 px-5 md:px-12 lg:px-28">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-green-800 to-green-600 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg font-bold">Muslim Matrimonial</span>
              </div>
              <p className="text-gray-400">
                Connecting hearts through faith, guided by Islamic principles and community values.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a onClick={() => window.open("https://www.mahcanada.com/about-us", "_blank")} className="hover:text-green-400 transition-colors">About Us</a></li>
                <li><a onClick={() => window.open("https://www.mahcanada.com/contact-us", "_blank")} className="hover:text-green-400 transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Info</h4>
              <div className="space-y-2 text-gray-400">
                <p>📧 info@muslimmatrimonial.com</p>
                <p>📱 +1 (905) -929 -1526</p>
                <p>📍 1545 Stone Church Rd E, Hamilton, ON L8W 3P8</p>
                <p onClick={() => window.open("https://www.mahcanada.com", "_blank")}>🌐 www.mahcanada.com</p>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 All rights reserved. | Guided by Islamic principles</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;