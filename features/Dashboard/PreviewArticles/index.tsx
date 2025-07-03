"use client";

import Image from "next/image";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const DashboardPreviewArticlesFeature = () => {
  const [data, setData] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("article_preview");
    if (stored) {
      setData(JSON.parse(stored));
    }
  }, []);

  if (!data) {
    return (
      <p className="text-center py-20 text-muted-foreground">
        No preview data found.
      </p>
    );
  }

  return (
    <main className="container pt-[136px] pb-20">
      <section>
        <button
          onClick={() => router.back()}
          className="mb-6 flex items-center text-sm text-blue-600 hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </button>
        <p className="text-center text-sm font-medium leading-5 text-slate-600">
          Draft Preview
        </p>

        <h1 className="mx-auto text-center pt-4 pb-10 text-3xl font-semibold leading-9 max-w-2xl">
          {data.title}
        </h1>

        {data.image && (
          <div className="relative w-full h-[300px] md:h-[480px] rounded-[12px] overflow-hidden">
            <Image
              src={data.image}
              alt={data.title}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </div>
        )}

        <div className="space-y-4 pt-10 pb-10 prose max-w-none">
          {parse(data.content)}
        </div>
      </section>
    </main>
  );
};

export default DashboardPreviewArticlesFeature;
