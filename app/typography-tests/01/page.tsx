export default function Page() {
  return (
    // 12 column grid
    <div>
      <div className="fixed top-4 right-4 z-50">
        <nav className="">
          <h1>Projects</h1>
        </nav>
      </div>
      <section className="grid grid-cols-12 items-start">
        <div className="col-span-7">
          <p>
            Szy embodies a sense of fluidity that courses through their practice
            and personality. Not one to bend with the tide but to navigate it
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
            developer, Szy’s fluency extends to UX and UI design, user testing,
            front-end development and back-end development.
          </p>
          <p>
            Szy hones their multifaceted workspace to remain a site of perpetual
            inquiry. Their workspace is blessed to have welcomed collaborations
            with: maok (soliloquy), warm winters, braids journal, and studio
            rgbdog.
          </p>
        </div>
        {/* put the item in the last column of the grid */}
      </section>
    </div>
  );
}
