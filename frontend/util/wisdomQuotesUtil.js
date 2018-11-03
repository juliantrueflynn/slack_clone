const wisdomQuotes = [
  {
    quoteText: 'If you optimize everything, you will always be unhappy.',
    quoteBy: 'Donald Knuth',
  },
  {
    quoteText: 'An algorithm must be seen to be believed.',
    quoteBy: 'Donald Knuth',
  },
  {
    quoteText: 'The best way to predict the future is to invent it.',
    quoteBy: 'Alan Kay',
  },
  {
    quoteText: 'The protean nature of the computer is such that it can act like a machine or like a language to be shaped and exploited.',
    quoteBy: 'Alan Kay',
  },
  {
    quoteText: 'Developers, developers, developers, developers... Developers, developers!',
    quoteBy: 'Steve Ballmer',
  },
  {
    quoteText: 'Programming is a social activity.',
    quoteBy: 'Robert C. Martin',
  },
  {
    quoteText: 'Redundant comments are just places to collect lies and misinformation.',
    quoteBy: 'Robert C. Martin',
  },
  {
    quoteText: 'The perfect kind of architecture decision is the one which never has to be made.',
    quoteBy: 'Robert C. Martin',
  },
  {
    quoteText: 'Duplication is the primary enemy of a well-designed system. It represents additional work, additional risk, and additional unnecessary complexity.',
    quoteBy: 'Robert C. Martin',
  },
  {
    quoteText: 'Complexity kills. It sucks the life out of developers, it makes products difficult to plan, build, and test.',
    quoteBy: 'Ray Ozzie, CTO, Microsoft',
  }
];

const sampleWisdomQuote = (
  wisdomQuotes[Math.floor(Math.random() * wisdomQuotes.length)]
);

export default sampleWisdomQuote;
