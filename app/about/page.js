import Link from "next/link";

export default function About() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-white bg-gradient-to-b from-purple-800 to-blue-900 min-h-screen">
      {/* Logo & Title */}
      <div className="flex items-center gap-3 mb-8">
        <img src="/balu-egg.webp" alt="Logo" className="w-16 invert" />
        <h1 className="text-4xl font-bold">About Buy Me a Chai</h1>
      </div>

      {/* About Text */}
      <p className="max-w-2xl text-center mb-12 text-lg text-gray-200">
        Buy Me a Chai is a simple, creator-first crowdfunding platform.
        Whether you’re an artist, developer, or indie creator, your fans
        can directly support you — one chai at a time! 💙
      </p>

      {/* Visuals Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div className="flex flex-col items-center">
          <img src="/coin.gif" alt="Coin" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Easy Payments</h2>
          <p className="text-gray-300">
            Receive secure payments with just a click. No complicated setup.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/group.gif" alt="Community" className="w-24 h-24 mb-4" />
          <h2 className="text-2xl font-bold mb-2">Build Community</h2>
          <p className="text-gray-300">
            Grow a loyal fanbase that loves your work and supports you.
          </p>
        </div>

        <div className="flex flex-col items-center">
          <img src="/balu-egg.webp" alt="Logo" className="w-24 h-24 invert mb-4" />
          <h2 className="text-2xl font-bold mb-2">Powered by Chai</h2>
          <p className="text-gray-300">
            Every chai fuels your creativity and keeps you going!
          </p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="mt-16">
        <Link
          href="/login"
          className="inline-block px-8 py-3 bg-gradient-to-br from-purple-600 to-blue-500 rounded-lg text-white font-medium hover:from-purple-700 hover:to-blue-600"
        >
          Start Now
        </Link>
      </div>
    </div>
  );
}


export const metadata = {
  title: 'About - Buy Me a Chai',
}