/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Placeholder — once retailer affiliate feeds are wired in (see the build brief),
    // add each retailer's image CDN hostname here so next/image can optimise their photos.
    remotePatterns: [],
  },

  // Standard protective headers on every response. None of them changes how
  // the site looks or behaves; they stop other sites framing it, stop browsers
  // guessing file types, keep full URLs out of the Referer sent to retailers,
  // and tell browsers to use https only. Search engines read them as a sign of
  // a maintained site. The Strict-Transport-Security line is safe here because
  // Vercel already serves everything over https and redirects http with a 308.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
