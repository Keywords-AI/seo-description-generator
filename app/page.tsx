import SEOGenerator from "@/app/components/SEOGenerator";
import { Discord } from "./components/icons";

export default function Home() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">
      
        Keywords AI SEO Description Generator
      </h1>
      <section className="py-12">
        <SEOGenerator />
      </section>
      <section className="py-8 bg-indigo-200 rounded-[8px]">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://www.keywordsai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl font-semibold mb-4"
          >
            Created by Keywords AI
          </a>
          <p className="text-lg mb-6">
            Keywords AI is the leading LLM monitoring platform for AI startups.
          </p>
          <a
            href="https://discord.com/invite/KEanfAafQQ"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-indigo-600 text-white px-8 py-4 rounded-md text-lg font-semibold hover:bg-indigo-700 inline-flex items-center"
          >
            <Discord />
            Join the community
          </a>
        </div>
      </section>
      <section className="py-8 bg-stone-200 rounded-[8px]">
        <div className="container mx-auto px-4 text-center">
          <a
            href="https://www.keywordsai.co"
            target="_blank"
            rel="noopener noreferrer"
            className="text-3xl font-semibold mb-4"
          >
            Github
          </a>
          <p className="text-lg mb-6">Contribute to the project on Github.</p>
          <a
            href="https://github.com/Keywords-AI/seo-description-generator"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-neutral-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-neutral-700 inline-flex items-center"
          >
            Check out the prompt
          </a>
        </div>
      </section>
    </main>
  );
}
