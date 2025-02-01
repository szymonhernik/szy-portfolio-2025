import TagLink from "@/components/tag-link";

export default function Information() {
  return (
    <section className="grid grid-cols-12 items-start">
      <div className="mb-36 text-fluid-xl md:hidden">SZY</div>
      <div className="col-span-12 flex flex-col gap-X md:col-span-10 lg:col-span-7 ">
        <div>
          <p>
            Szy embodies a sense of fluidity that courses through their practice
            and personality. Not one to bend with the tide but to navigate it
            personality. Not one to bend with the tide but to navigate it
            thoughtfully, they approach design with an instinct for
            negotiation—balancing precision with play and structure with flow.
            In collaboration, Szy brings an empathetic, curious approach to
            every project, enriched by their penchant for learning (be it a new
            coding tool or an unexpected artistic technique) and their observant
            nature. Their sketchbook, a constant companion, is both a sanctuary
            for ideas and a method of untethering oneself from screens – a nod
            to the tactile joys of creation.
          </p>
          <p>
            As a designer, Szy specialises in motion design, graphic design, art
            direction, web design, editorial design and identity design. As a
            developer, Szy’s fluency extends to{" "}
            <TagLink slug="ux-and-ui-design">UX and UI design</TagLink>,{" "}
            <TagLink slug="user-testing">user testing</TagLink>,{" "}
            <TagLink slug="front-end-development">
              front-end development
            </TagLink>
            , and{" "}
            <TagLink slug="back-end-development">back-end development</TagLink>.
          </p>
          <p>
            Szy hones their multifaceted workspace to remain a site of perpetual
            inquiry. Their workspace is blessed to have welcomed collaborations
            with: maok (soliloquy), warm winters, braids journal, and studio
            rgbdog.
          </p>
          <p className="hidden md:block">
            Say hello via{" "}
            <a
              href="mailto:hello@szymonhernik.com"
              className="text-link hover:font-outline-1-secondary"
            >
              hello@szymonhernik.com
            </a>
            . I will get back to you very soon.
          </p>
        </div>

        {/* below text will be 48px size but make it relative to 16px */}
        {/* contact div on md screens will go after experience and education divs */}
        <div className="md:hidden">
          <h1 className="mb-6 text-fluid-xl md:text-fluid-base">Contact</h1>

          <p>
            Say hello via{" "}
            <a
              href="mailto:hello@szymonhernik.com"
              className="text-link hover:font-outline-1-secondary"
            >
              hello@szymonhernik.com
            </a>
            . I will get back to you very soon.
          </p>
        </div>
        {/* eqal columns */}
        <div className="flex flex-col gap-X md:flex-row">
          <div className="flex-1">
            <h1 className="mb-6 text-fluid-xl  md:text-[length:inherit] md:mb-5">
              Experience
            </h1>
            <div>
              <p>
                <a
                  href="https://iszszistudio.com"
                  className="text-link hover:font-outline-1-secondary"
                >
                  isz szi studio, Brussels
                </a>
                <br />
                Co-founder and Designer (2020 — present)
              </p>
              <p>
                <a
                  href="https://nmr.cc"
                  className="text-link hover:font-outline-1-secondary"
                >
                  NMR.CC, Athens
                </a>
                <br />
                Graphic Design Intern (2021)
              </p>
            </div>
          </div>
          <div className="flex-1">
            <h1 className="mb-6 text-fluid-xl md:mb-5 md:text-[length:inherit]">
              Education
            </h1>
            <div>
              <p>
                <a
                  href="https://kabk.nl/"
                  className="text-link hover:font-outline-1-secondary"
                >
                  The Royal Academy of Art, The Hague
                </a>
                <br />
                BA Graphic Design (2018 – 2022)
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
