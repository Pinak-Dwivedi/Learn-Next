import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaYoutube,
} from "react-icons/fa";

export default function Footer() {
  const socialMediaLinks = [
    { icon: FaFacebook, link: "https://www.facebook.com" },
    { icon: FaInstagram, link: "https://www.instagram.com" },
    { icon: FaTwitter, link: "https://www.twitter.com" },
    { icon: FaGithub, link: "https://www.github.com" },
    { icon: FaYoutube, link: "https://www.youtube.com" },
  ];

  const solutionLinks = ["Marketing", "Analytics", "Commerce", "Insights"];
  const supportLinks = ["Pricing", "Documentation", "Guides", "API Status"];
  const companyLinks = ["About", "Blogs", "Jobs", "Press", "Partners"];
  const legalLinks = ["Claim", "Privacy", "Terms"];

  const dummyLinks = [
    { title: "Solutions", links: solutionLinks },
    { title: "Support", links: supportLinks },
    { title: "Company", links: companyLinks },
    { title: "Legal", links: legalLinks },
  ];

  return (
    <footer className="min-h-screen border-t-2 border-t-slate-500">
      <section className="mt-20 flex min-h-screen flex-col gap-8 px-8 py-4">
        <Link
          href="/"
          className="self-start rounded-md bg-sky-400 p-2 text-lg text-slate-100 hover:bg-blue-500"
        >
          LEARN-NEXT
        </Link>
        <p className="text-md text-slate-500">
          Just learning next and tailwind.
        </p>

        <nav className="">
          <ul className="flex flex-wrap gap-4">
            {socialMediaLinks.map((sm, i) => (
              <li key={i}>
                <Link
                  href={sm.link}
                  target="_blank"
                  className="text-2xl text-slate-500 hover:text-slate-400"
                >
                  {<sm.icon />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <section className="mt-12 grid grid-cols-1 gap-12 max-[500px]:justify-items-center min-[500px]:grid-cols-2 md:grid-cols-4">
          {dummyLinks.map((dummyLink) => (
            <div
              key={dummyLink.title}
              className="flex flex-col gap-6 max-[500px]:items-center"
            >
              <h2 className="font-semibold dark:text-slate-100">
                {dummyLink.title}
              </h2>

              <nav>
                <ul className="flex flex-col gap-4 max-[500px]:items-center">
                  {dummyLink.links.map((link, i) => (
                    <li key={`${dummyLink.title}-${i + 1}`}>
                      <Link
                        href="#"
                        className="hover:text-slate-500 dark:text-slate-300"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          ))}
        </section>
      </section>

      <section className="mx-auto w-full max-w-[90%] border-t-2 border-slate-600 p-8 text-sm dark:text-slate-400">
        © 2023 Learn-Next, Inc. All rights reserved.
      </section>
    </footer>
  );
}
