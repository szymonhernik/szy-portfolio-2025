export default function Information() {
  return (
    <section className="grid grid-cols-12 items-start">
      <div className="mb-36 text-fluid-xl md:hidden">SZY</div>
      <div className="col-span-12 flex flex-col gap-24 md:col-span-10 lg:col-span-7 ">
        <div>
          <p>
            Szy embodies a sense of fluidity that courses through their practice and personality. Not one to bend with the tide but to navigate it personality.
            Not one to bend with the tide but to navigate it thoughtfully, they approach design with an instinct for negotiation—balancing precision with play
            and structure with flow. In collaboration, Szy brings an empathetic, curious approach to every project, enriched by their penchant for learning (be
            it a new coding tool or an unexpected artistic technique) and their observant nature. Their sketchbook, a constant companion, is both a sanctuary
            for ideas and a method of untethering oneself from screens – a nod to the tactile joys of creation.
          </p>
          <p>
            As a designer, Szy specialises in motion design, graphic design, art direction, web design, editorial design and identity design. As a developer,
            Szy’s fluency extends to UX and UI design, user testing, front-end development and back-end development.
          </p>
          <p>
            Szy hones their multifaceted workspace to remain a site of perpetual inquiry. Their workspace is blessed to have welcomed collaborations with: maok
            (soliloquy), warm winters, braids journal, and studio rgbdog.
          </p>
        </div>

        {/* below text will be 48px size but make it relative to 16px */}
        <div>
          <h1 className="text-fluid-xl">Contact</h1>
          <p>Say hello via hello@szymonhernik.com. It’s 13:35 in Brussels. Szy will get back to you very soon.</p>
        </div>
        <div>
          <h1 className="text-fluid-xl">Experience</h1>
          <div>
            <p>
              isz szi studio (2020 — present)
              <br />
              Co-founder and Designer, Brussel
            </p>
            <p>
              NMR.CC (2021)
              <br />
              Graphic Design Intern, Athens
            </p>
          </div>
        </div>
        <div>
          <h1 className="text-fluid-xl">Education</h1>
          <div>
            <p>BA Graphic Design (2018 – 2022) The Royal Academy of Art, The Hague</p>
          </div>
        </div>
      </div>
    </section>
  );
}
