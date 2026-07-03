export function getSoftwareSchema(name: string, url: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: `AI Image Tools - ${name}`,
    url: `https://img.aixiaot.com${url}`,
    description,
    applicationCategory: "Multimedia",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}
