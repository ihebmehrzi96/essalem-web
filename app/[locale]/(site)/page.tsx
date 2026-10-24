import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import Clinic from "@/components/sections/clinic";
import { News } from "@/components/sections/stay";
import { Contact } from "@/components/site-footer";
import { listPublishedPosts } from "@/lib/posts";

export default async function HomePage() {
  const posts = await listPublishedPosts(3);

  return (
    <>
      <Hero />
      <Services />
      <Clinic />
      <News posts={posts} />
      <Contact />
    </>
  );
}