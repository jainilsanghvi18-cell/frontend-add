import React from "react";
import { FaCouch, FaLeaf, FaSmile, FaTags } from "react-icons/fa";
import Footer from '../layout/Footer';
import BroadSofa from '../assets/images/BroadSofa.jpg';
const About = () => {
  return (
    <div className="bg-[#F5F5F5]">
      <div
        className="relative h-[90vh] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${BroadSofa})`,
        }}
      >

        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 text-center px-6">
          <h1
            className="text-4xl sm:text-5xl font-bold text-center tracking-wide"
            style={{
              color: '#654321',
              textShadow: '1px 1px 2px rgba(0,0,0,0.3), -1px -1px 1px rgba(255,255,255,0.2)',
            }}
            > 
            LUXURY FURNITURE IS OUR PASSION!
          </h1>
        </div>
      </div>

      {/* About Us Section */}
      <section className="py-16 px-6 md:px-20">
        <h2 className="text-5xl font-extrabold text-[#5D3A1A] text-center mb-10">
          About Us
        </h2>

        <div className="mb-12">
          <h3 className="text-3xl py-4 font-bold text-[#100F57] mb-4">Our Story</h3>
          <p className="text-2xl text-gray-800 font-medium leading-relaxed">
            Founded with a passion for timeless design and comfort, our journey began with a simple goal —
            to make beautiful furniture accessible to everyone. From a small workshop to a thriving brand,
            we've grown by staying true to our values: quality, creativity, and customer care.
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-3xl py-4 font-bold text-[#100F57] mb-4">Mission & Values</h3>
          <p className="text-2xl text-gray-800 font-medium leading-relaxed">
            Our mission is to enrich homes with furniture that blends style and function. We believe in
            sustainability, transparency, and treating every customer like family. Whether you're furnishing
            a cozy apartment or a spacious villa, we're here to help you create a space you love.
          </p>
        </div>

        <div className="mb-8">
          <h3 className="text-3xl py-6 font-bold text-[#100F57] mb-4">Craftsmanship</h3>
          <p className="text-2xl text-gray-800 font-medium leading-relaxed">
            Every piece we offer is crafted with care — from selecting premium woods and fabrics to
            precision detailing and finishing. Our artisans and designers work together to ensure that
            each item not only looks stunning but also stands the test of time.
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 px-6 md:px-20">
        <h2 className="text-5xl font-extrabold text-[#100F57] text-center mb-10">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-center">

          <div className="bg-white p-6 rounded-lg shadow-md max-h-[250px]">
            <FaCouch className="text-6xl text-[#C4A484] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#100F57] mb-2">Widest Variety</h3>
            <p className="text-xl text-gray-800 font-medium">
              Explore a broad range of furniture styles to suit every taste and space.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-h-[250px]">
            <FaLeaf className="text-6xl text-[#C4A484] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#100F57] mb-2">Quality Sourcing</h3>
            <p className="text-xl text-gray-800 font-medium">
              We source premium materials to ensure durability and elegance in every piece.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-h-[250px]">
            <FaSmile className="text-6xl text-[#C4A484] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#100F57] mb-2">Customer Satisfaction</h3>
            <p className="text-xl text-gray-800 font-medium">
              Our team is dedicated to making your shopping experience smooth and joyful.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md max-h-[250px]">
            <FaTags className="text-6xl text-[#C4A484] mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-[#100F57] mb-2">Affordable Prices</h3>
            <p className="text-xl text-gray-800 font-medium">
              Get stylish furniture at everyday low prices without compromising on quality.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;