import Carousel from "@/components/carousel/Carousel";
import Image from "next/image";
import section1 from "@/assets/images/section1.jpg";
import section2 from "@/assets/images/section2.jpg";
import section3 from "@/assets/images/section3.jpg";

export default function Home() {
  const sectionsData = [section1, section2, section3];
  return (
    <section className="flex flex-col gap-12">
      <h1 className="my-8 break-words text-center text-2xl sm:text-4xl md:text-6xl">
        LEARN-NEXT
      </h1>

      <Carousel />

      {sectionsData.map((imageSrc, i) => {
        return (
          <article key={i} className="group">
            <div className="mx-auto flex min-h-[90vh] max-w-5xl flex-col items-center gap-8 border-b-2 p-4 group-last:border-none sm:flex-row sm:justify-between sm:group-even:flex-row-reverse">
              <div className="relative aspect-[16/12] w-3/4 overflow-hidden rounded-lg sm:w-1/3">
                <Image
                  src={imageSrc}
                  fill
                  sizes="100"
                  alt="winter"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="w-8/12 sm:text-lg">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolore
                qui incidunt eveniet. Delectus natus commodi laboriosam, quae
                animi consequatur. Eligendi temporibus doloribus libero porro,
                est maxime et pariatur sint tempore voluptates sapiente
                repellendus repellat? Nobis debitis saepe inventore quae minima
                officia porro eaque! Laboriosam ut assumenda cupiditate tempora
                obcaecati corporis.
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
