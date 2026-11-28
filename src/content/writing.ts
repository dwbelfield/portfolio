/**
 * Essays. Each section is a heading and its paragraphs; a paragraph may carry
 * links written as [text](https://…), which the page renders as anchors.
 * Edit the words here; app/writing renders them.
 */

export type Essay = {
  slug: string;
  title: string;
  subtitle: string;
  /** ISO date, shown on the page and used for search engines. */
  published: string;
  /** Under 155 characters. */
  description: string;
  /** 5:2 header image, no text (path under /public). */
  cover: { src: string; alt: string; width: number; height: number };
  /** The same image with the title, for social cards. */
  ogImage: string;
  sections: { heading: string; paragraphs: string[] }[];
};

export const essays: Essay[] = [
  {
    slug: "the-last-frontier",
    title: "The Last Frontier",
    subtitle: "A parent’s grief in the age of AI",
    published: "2026-11-27",
    description:
      "AI is taking the walls off childhood. A father’s grief, and the case for the walls our children have to build for themselves.",
    cover: {
      src: "/media/writing/the-last-frontier.png",
      alt: "A father and son stand on the curve of the Earth at night beside a house with one lit window; the boy points at Mars.",
      width: 2000,
      height: 800,
    },
    ogImage: "/media/writing/the-last-frontier-og.png",
    sections: [
      {
        heading: "A Defensive War",
        paragraphs: [
          "When my first son was born, my wife and I drafted a text to send to our respective families. We asked that no one post the photos of our child to the internet. In 2022, that was considered a minor scandal.",
          "Even then, parents were already fighting a defensive battle for the brains and health of our children.",
          "We learned that Moonbug, the company behind the popular children’s cartoon Cocomelon, had been [deliberately engineering its show to hold children’s attention](https://www.nytimes.com/2022/05/05/arts/television/cocomelon-moonbug-entertainment.html). “Cocainemelon” and “CoComelon zombies” were what other parents called it, and they weren’t wrong.",
          "Meanwhile, my wife was fastidiously checking the ingredient labels of every item in our pantry to remove anything remotely associated with developmental or hormonal disruptions.",
          "Now, in 2026, our photo ban seems remarkably prescient. Bad actors can (and do) use AI to create [sexualized images of children](https://www.iwf.org.uk/aireport) or use the photos in elaborate extortion scams. The news tends to follow the effect on teenagers, but the darker side of the trend is the extraordinary number of predators being arrested for [AI-generated CSAM](https://www.nbcnews.com/tech/security/ai-child-exploitation-crisis-rcna259409).",
          "Every one of those threats had a countermeasure. Don’t post the photo to Facebook. Limit screen time. Read the back of the package. The danger lived outside our home, and a little discipline from us and a rule at the door could keep it there.",
        ],
      },
      {
        heading: "Through the Back Door",
        paragraphs: [
          "But AI won’t stay outside our carefully curated home. It’s coming in the back door as the helpful tutor, the digital companion and the patient voice baked into every app, system, or product.",
          "The worst part? It’s going to be really good at those roles. Maybe better than any human. Likely better than any parent.",
          "On one hand, as a techno-optimist, I can imagine a world where my kids can get personalized, infinitely patient instruction about any topic. Even better, I can leverage their existing interests to sneakily teach them fundamental concepts (my kids’ current obsession is Pokémon, so I’m building a Claude artifact that pairs Pokémon with learning to read).",
          "On the other hand, AI is a tool. It’s an amplifier. It’s a magnifying glass for both the lighter and darker aspects of our nature. It can encourage [delusions in vulnerable people](https://www.apa.org/monitor/2026/09/ai-psychosis). It can be overly servile and conciliatory. It pushes back in the most useless ways, and is encouraging when the user likely needs a reality check. It can be both infantilizing and flattering in a single conversation.",
          "AI is Cocomelon injected into the already predatory algorithms of social media, advertising and sales. It’s a drug that passes straight through the blood-brain barrier.",
        ],
      },
      {
        heading: "The Broken Playbook",
        paragraphs: [
          "Protecting my sons is only half my job as their father. The other half is preparing them, and that’s where I find myself adrift. My parents knew what to do even if it wasn’t perfect: a good school district, then maybe a few years in uniform (naturally, the USMC), finally a trade or a degree. Do those things, and you’d have a reasonably successful middle-class life.",
          "Sure, the path could be hard (made easier by the right decisions, the right timing, and a helping of luck or prayer), but you could see where it ended. My boys are now 3 and 4, and despite my love of SciFi and AI, I can’t see where any path ends.",
          "This fall, AI proved the [quasi-Riemann hypothesis](https://quantamagazine.org/ai-proved-the-quasi-riemann-hypothesis-what-happens-now-20261019). It was already the best chess and Go player in the world. There are entire swathes of “[dark factories](https://www.manufacturing.net/operations/blog/22948773/the-tech-enabling-chinas-dark-factories)” in China where products are manufactured and finished without human intervention. It seems that every week a frontier lab is releasing a model or feature that eliminates another white-collar job. Soon, we’ll have humanoid robots for the mundane household chores that we don’t want to do.",
          "From 2022 to 2026, AI has quietly and quickly begun rewriting the human experience. You merely need to read the science fiction heroes of the past to understand where we’re at now. From Isaac Asimov to Frank Herbert we know what the singularity looks like and for anyone in doubt: It’s here.",
          "As a man who loves all things technology and science fiction, it’s exhilarating. As a father, it’s terrifying and I grieve for my children. I grieve for the life they’ll never get to live: the hard one. It’s a strange thing for a father to wish for, but I mean it more every day.",
          "Oh, they’re not in danger of dying. In fact, there’s good reason to believe that at our current pace of technological improvements, my children may be the last generation that has to fight death at all.",
          "No, I grieve for their minds—for their souls.",
        ],
      },
      {
        heading: "Cheat Codes On",
        paragraphs: [
          "Their game of life is one where all the cheat codes are on. Where a brain-machine interface allows them to offload all their cognitive labor to a helpful AI. They get to play life with their own personal Cortana. It’s a beautiful, tragic future.",
          "Any gamer who has played with the cheat codes on knows how that story ends. For twenty minutes, it’s great. Unlimited power and optionality is at your fingertips. It’s a cocaine rush of fun…until it isn’t. Eventually, you stop playing the game, not because the game was difficult, but because it stopped meaning anything. Sometimes, you don’t even return to the game—you’ve mined it for the maximum benefit until it’s nothing but a vague memory in your Steam library.",
          "A game is only worth playing because of its limits: the boss you can’t beat yet, the level you have to grind. No restrictions—no achievements. Just as light defines darkness, our limitations define our passions.",
        ],
      },
      {
        heading: "Bread and Circuses",
        paragraphs: [
          "Governments can see the transformation coming too, and they’re doing what governments know how to do: write checks and talk around the problem without actually doing anything. To be fair, I’m not sure they can do anything. Chekhov’s gun is on the mantel, and if we don’t pick it up, a rival power will.",
          "As of this summer, American babies born between 2025 and 2028 can get [$1,000 in a Trump Account](https://www.nbcnews.com/business/business-news/trump-accounts-baby-qualify-1000-rcna247135), invested in the stock market until they turn 18. SpaceX’s president has already [given a share to two million kids](https://semafor.com/article/07/06/2026/spacex-no-2-exec-donates-320-million-of-stock-to-trump-accounts), and Elon Musk has [pledged a SpaceX share to every child in America](https://www.semafor.com/article/10/19/2026/musk-to-gift-spacex-shares-to-american-children) next year, calling it “the first of many.” By the time my children are ready to retire (if that even means anything in the not too distant future) their generation could have a small fortune waiting in those accounts.",
          "Officials pitch it as ownership of America’s future—a stake in capitalism writ large. I see it for what it is: bread and circus, opium for the masses, a safety net for a generation that may not have a job to provide meaning.",
          "Maybe that cushion keeps a roof overhead and food on the table. But dollars don’t buy self-actualization. Look no further than the elites in our society with plenty of dollars but a pittance of purpose. Too many of them crash into moral depravity, crushing depression, or drug-induced lethargy.",
          "Maybe that’s our Great Filter: finding purpose through discipline. Fail it, and the elites’ fate waits for all of us.",
          "The Great Filter started as an idea about life among the stars: that the universe looks empty because most civilizations never make it off their home world due to some unknown circumstance. If we pass our Filter, there’s still one place left where the stakes are real and not even AI can switch off all the limitations.",
        ],
      },
      {
        heading: "The Last Frontier",
        paragraphs: [
          "I find myself arguing for the progress I dread most. I believe that AI has, or soon will, solve all the mysteries of the Earth. Next, it will help my sons solve the mysteries of the heavens, riding along in their heads as synthetic passengers on the human journey. It’ll be Cortana for everyone.",
          "The heavens will still be cold and alien. Mars will kill you if you’re careless. Physics and natural laws care little for the frailty of humanity and the distance between stars doesn’t shrink no matter how intelligent your copilot is. Space is the last place where the limits are real and no one can vote, legislate, or code them away.",
          "Humanity has always needed somewhere to point its restlessness—the hole in the heart that can never quite be filled. We explored the West, the depths of the Mariana Trench, the frigid desolation of Antarctica, and the dusty surface of the Moon. With AI, we’re even exploring the intricacies of life itself. We’re running out of frontiers to explore, expand, and exploit.",
          "My sons’ generation will have to find their frontier off-world.",
          "That’s why I grieve. I used to think my kids would have to move across the country, maybe to another continent, to pursue their dreams. Now, I suspect the most meaningful lives open to them will be lived somewhere I can’t follow, and I’ll be the one telling them they need to go.",
        ],
      },
      {
        heading: "Walls We Build Ourselves",
        paragraphs: [
          "But grief isn’t a plan, and navel-gazing isn’t a purpose. I can’t wait for a trip to Mars to teach them that limitations are a gift.",
          "So, in my house, we start small. They wash their own dishes, they put away their toys, they make their beds. They don’t get to eat sweets before they eat their dinner. They rarely if ever get to watch TV. We read books, we put together puzzles, we play logic games, and we eat dinner as a family with no electronics in sight.",
          "We teach them to treat people with kindness and respect, even when no one is keeping score. They step onto the mat at Taekwondo to get knocked down by kids who are better and bigger than them so they learn to get back up.",
          "On this side of the singularity, none of this is necessary. But that’s the point. In a world where an Optimus robot can wash the dishes, where their only friend could be an AI companion, where an LLM can do all their thinking for them, their lives can shrink to whatever size feels comfortable. We hope they’ll choose bigger. We hope their lives will stretch into the stars.",
          "Values, discipline, morality, faith, and philosophy aren’t old-fashioned in the age of AI. They might be the only things AI can’t take from you because you have to build them for yourself.",
          "Someday my sons may walk among the stars. Tonight, they put away their dishes.",
        ],
      },
    ],
  },
];

/** "2026-11-27" → "November 27, 2026", fixed to UTC so the build machine's zone cannot shift the day. */
export function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
}
