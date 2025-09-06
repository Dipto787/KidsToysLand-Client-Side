import AboutHome from "./AboutHome";
import GetInTouch from "./GetInTouch";
import { FaSmileBeam, FaAward, FaUsers, FaPuzzlePiece } from "react-icons/fa";
import { MdOutlineEmojiObjects } from "react-icons/md";

const AboutUs = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero / Intro */}
      <AboutHome />

      {/* Welcome Section */}
      <div className="text-center space-y-4 mt-16 px-4 lg:px-20">
        <h1 className="lg:text-5xl text-3xl font-bold text-gray-800">
          Welcome to <span className="text-[#f85606]">KidsToysLand! 🌈</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          At KidsToysLand, we believe that childhood should be full of joy,
          discovery, and imagination. That's why we bring together a magical
          collection of toys that spark creativity and learning.
        </p>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          Whether your little one is building castles, racing toy cars, playing
          with dolls, or solving puzzles — we have something perfect for every
          child, every age, and every moment of play.
        </p>
      </div>

      {/* Our Story */}
      <div className="mt-20 bg-white py-12 px-6 lg:px-20 rounded-2xl shadow-lg max-w-6xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-6">
          Our Story 📖
        </h2>
        <p className="text-gray-600 text-lg text-center max-w-4xl mx-auto">
          KidsToysLand started with a simple idea — to make every child smile
          with toys that inspire imagination and joy. From humble beginnings, we
          have grown into a trusted name loved by parents and kids alike. Every
          product we offer is carefully selected to ensure safety, quality, and
          endless fun.
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="mt-20 grid grid-cols-1 lg:grid-cols-2 gap-10 px-6 lg:px-20">
        <div className="bg-white shadow-md rounded-2xl p-10 text-center hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-[#f85606] mb-4">
            Our Mission 🎯
          </h2>
          <p className="text-gray-600 text-lg">
            To bring happiness to every child through safe, innovative, and
            affordable toys that nurture creativity and learning.
          </p>
        </div>
        <div className="bg-white shadow-md rounded-2xl p-10 text-center hover:shadow-xl transition">
          <h2 className="text-3xl font-bold text-[#f85606] mb-4">
            Our Vision 👁️
          </h2>
          <p className="text-gray-600 text-lg">
            To be the world’s most trusted and loved kids’ toy brand — where
            every childhood memory begins.
          </p>
        </div>
      </div>

      {/* What We Offer */}
      <div className="mt-20 px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
          What We Offer 🎁
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaSmileBeam className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Fun & Joy</h3>
            <p className="text-gray-600">
              Toys that bring endless smiles to children everywhere.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <MdOutlineEmojiObjects className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Creativity</h3>
            <p className="text-gray-600">
              Products that spark imagination, curiosity, and innovation.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaPuzzlePiece className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Learning</h3>
            <p className="text-gray-600">
              Educational toys designed for all stages of childhood.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition">
            <FaAward className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Quality & Safety</h3>
            <p className="text-gray-600">
              Premium toys tested for durability and child safety.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-20 bg-[#f85606]/10 py-16 px-6 lg:px-20 rounded-2xl">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
          Why Choose KidsToysLand? ⭐
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaUsers className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Trusted by Parents</h3>
            <p className="text-gray-600">
              Thousands of families choose us for safe and fun toys.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaAward className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Award-Winning</h3>
            <p className="text-gray-600">
              Recognized for excellence in toy safety and design.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow text-center">
            <FaSmileBeam className="text-4xl text-[#f85606] mx-auto mb-4" />
            <h3 className="font-bold text-xl mb-2">Happy Kids</h3>
            <p className="text-gray-600">
              Our toys are loved by kids of all ages, everywhere.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="mt-20 px-6 lg:px-20">
        <h2 className="text-3xl lg:text-4xl font-bold text-center text-gray-800 mb-12">
          What Parents Say 💬
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">
              “KidsToysLand has been amazing for my kids! The quality is top
              notch and they absolutely love every toy we got.”
            </p>
            <h4 className="font-bold mt-4 text-[#f85606]">— Sarah M.</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">
              “As a parent, I always worry about safety. KidsToysLand gave me
              peace of mind with their certified safe toys.”
            </p>
            <h4 className="font-bold mt-4 text-[#f85606]">— John D.</h4>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <p className="text-gray-600 italic">
              “Not only fun but also educational! My son learned so much while
              playing with their puzzle sets.”
            </p>
            <h4 className="font-bold mt-4 text-[#f85606]">— Ayesha K.</h4>
          </div>
        </div>
      </div>

      {/* Call To Action */}
      <div className="mt-20">
        <GetInTouch />
      </div>
    </div>
  );
};

export default AboutUs;
