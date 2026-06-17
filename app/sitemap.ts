import { MetadataRoute } from "next";
import { siteMetadata } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteMetadata.url;

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
