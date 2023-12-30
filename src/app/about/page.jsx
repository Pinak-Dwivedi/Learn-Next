import Image from "next/image";
import aboutImage1 from "@/assets/images/about1.jpg";
import aboutImage2 from "@/assets/images/about2.jpg";

export const metadata = {
  title: "LEARN-NEXT - About",
  description: "This is the about page of LEARN-NEXT.",
};

export default function About() {
  return (
    <section className="flex flex-col items-center gap-8 py-4">
      <div className="relative aspect-video h-screen w-full">
        <Image
          src={aboutImage1}
          fill
          sizes="100"
          priority
          alt="team1"
          className="h-full w-full object-cover"
        />
      </div>

      <section className="grid min-h-screen w-11/12 max-w-4xl grid-cols-1 justify-items-center gap-16 py-4 sm:grid-cols-2 sm:gap-12 sm:gap-x-6">
        <h1 className="text-3xl font-bold sm:col-span-2 sm:text-6xl md:text-7xl">
          ABOUT
        </h1>

        <div className="w-3/4 text-center text-2xl sm:col-span-2 sm:text-5xl md:text-6xl">
          "It's not wise to violate rules until you know how to observe them."
        </div>

        <p className="text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti quo
          ipsa hic, voluptate fuga labore dicta itaque, illo temporibus aliquam
          maxime cupiditate quasi sunt, culpa dignissimos tenetur? Hic,
          inventore temporibus!
          <br />
          <br />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati
          quas accusamus, labore doloremque distinctio soluta doloribus, impedit
          dolorum ullam fugiat eos possimus tempora natus quibusdam aliquam
          architecto ducimus omnis laudantium?
        </p>
        <p className="text-md">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint a et
          beatae in dignissimos laborum corrupti soluta earum sapiente, amet
          harum animi. Consequatur vitae maiores unde fugiat asperiores porro
          velit!
          <br /> <br />
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ducimus
          temporibus blanditiis ex sed molestias suscipit voluptatibus, nam
          accusamus laborum possimus?
        </p>
      </section>

      <div className="relative aspect-video h-screen w-11/12 max-w-4xl overflow-hidden rounded-md">
        <Image
          src={aboutImage2}
          fill
          sizes="100"
          alt="team2"
          className="object-cover"
        />
      </div>

      <section className="grid min-h-screen w-11/12 max-w-4xl grid-cols-1 gap-4 gap-y-12 sm:grid-cols-2 md:grid-cols-3">
        <article className="flex flex-col gap-4">
          <h2 className="break-words text-lg">STORYTELLING</h2>

          <p className="border-b-2 border-b-slate-300 pb-4 sm:border-none sm:pb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Magnam,
            debitis facilis tempore impedit veniam neque illo, voluptate
            cupiditate repudiandae odit, ipsum ex vel excepturi cum? Iusto ad
            illum eum cupiditate.
            <br />
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            dolorem deserunt esse ipsa a sint praesentium tempora dolore
            voluptatum enim soluta, odit est iusto repellendus nemo quidem
            cupiditate, reprehenderit expedita!
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum
            provident ab, qui vero at fugit.
          </p>
        </article>

        <article className="flex flex-col gap-4">
          <h2 className="text-lg">DESIGN + CRAFT</h2>

          <p className="border-b-2 border-b-slate-300 pb-4 sm:border-none sm:pb-0">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Distinctio, maiores! Officia rem ipsam cupiditate non ipsum.
            Similique ducimus delectus sed corporis esse? Adipisci dolorum
            consequuntur architecto modi animi eos distinctio.
            <br />
            <br />
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque
            dolorem deserunt esse ipsa a sint praesentium tempora dolore
            voluptatum enim soluta, odit est iusto repellendus nemo quidem
            cupiditate, reprehenderit expedita!
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis
            expedita ullam illum, consectetur libero, vel recusandae doloribus
            non nesciunt laudantium itaque, repellat consequatur! Quibusdam,
            corporis.
          </p>
        </article>

        <article className="flex flex-col gap-4">
          <h2 className="text-lg">TECHNOLOGY</h2>

          <p className="">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quos
            quaerat molestiae provident voluptas iusto corrupti nobis fugiat
            veritatis soluta dolorem aliquam impedit repudiandae ipsa vero vel,
            quas quisquam aspernatur sequi?
            <br />
            <br />
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
            repellendus dolorum sunt dignissimos nostrum veritatis eligendi
            iste, esse sint animi et eos eius ipsum. Modi facere dolores fuga
            delectus rem.
          </p>
        </article>
      </section>
    </section>
  );
}
