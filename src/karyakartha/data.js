// Karyakartha prototype data.
// [real] = verified public data (ECI / Wikipedia). Everything else is demo/sample
// content for the prototype and is labelled as such in the UI.

export const ROLES = [
  "Karyakartha",
  "Booth Leader",
  "Mandal Leader",
  "Aspirant (MLA/MP)",
];

export const LEADERS = [
  { id: "kcr", name: "K. Chandrashekar Rao", short: "KCR", role: "Founder & President, BRS", note: "Led the Telangana statehood movement; first CM of Telangana (2014-2023)." },
  { id: "ktr", name: "K. T. Rama Rao", short: "KTR", role: "Working President, BRS", note: "MLA from Sircilla; drives party organisation and outreach." },
  { id: "harish", name: "T. Harish Rao", short: "Harish Rao", role: "Senior Leader, BRS", note: "MLA from Siddipet; former Finance & Health Minister." },
  { id: "kavitha", name: "Kalvakuntla Kavitha", short: "Kavitha", role: "MLC, BRS", note: "Leads Telangana Jagruthi; strong voice on women and youth issues." },
];

// Demo headlines for the prototype. Replace with a real news feed before handover.
export const LEADER_NEWS = {
  kcr: [
    { title: "KCR addresses farmers’ meeting on crop support prices", time: "2h ago", tag: "Speech" },
    { title: "BRS chief reviews party membership drive progress", time: "1d ago", tag: "Party" },
    { title: "KCR to tour north Telangana districts next week", time: "2d ago", tag: "Tour" },
  ],
  ktr: [
    { title: "KTR holds review with district coordinators on booth strengthening", time: "3h ago", tag: "Party" },
    { title: "KTR questions government on job calendar delays", time: "1d ago", tag: "Statement" },
    { title: "Working president to address youth convention in Karimnagar", time: "3d ago", tag: "Event" },
  ],
  harish: [
    { title: "Harish Rao visits Siddipet; inaugurates development works", time: "5h ago", tag: "Visit" },
    { title: "Harish Rao counters opposition on irrigation claims", time: "2d ago", tag: "Statement" },
    { title: "Siddipet MLA holds grievance day for constituents", time: "4d ago", tag: "Seva" },
  ],
  kavitha: [
    { title: "Kavitha leads Telangana Jagruthi meeting on women’s welfare", time: "6h ago", tag: "Event" },
    { title: "MLC raises skill-training demand for rural youth", time: "2d ago", tag: "Statement" },
    { title: "Kavitha to participate in Bathukamma celebrations", time: "5d ago", tag: "Culture" },
  ],
};

export const CONSTITUENCY = {
  name: "Korutla",
  number: 20, // [real] Telangana Assembly constituency number
  district: "Jagtial", // [real]
  lokSabha: "Nizamabad", // [real]
  electors: "1,86,704", // [real, 2023]
  mla: "Kalvakuntla Sanjay", // [real] winner, 2023
  mlaParty: "BRS", // [real]
  prevMla: "Kalvakuntla Vidya Sagar Rao (2009, 2014, 2018)", // [real]
  result2023: {
    // [real] ECI 2023 figures
    brsVotes: 72115,
    brsPct: 39.28,
    runnerUp: "Dharmapuri Arvind (BJP)",
    runnerUpVotes: 61810,
    margin: 10305,
  },
  mandals: ["Koratla", "Metpally", "Mallapur", "Ibrahimpatnam"], // [real]
  issues: [
    { title: "Muthyampet sugar mill revival", detail: "Mill closed since 2009; the central demand of sugarcane farmers in the belt.", heat: "High" },
    { title: "Turmeric price & Turmeric Board", detail: "Price support demand across the Jagtial-Nizamabad turmeric belt.", heat: "High" },
    { title: "Irrigation water for tail-end villages", detail: "Assured water for paddy and maize farmers in dry mandals.", heat: "Medium" },
    { title: "Youth jobs & skill centres", detail: "Government job calendar and local skill-training demand.", heat: "Medium" },
  ],
  // Demo tracker for the prototype. Wire to verified sources before handover.
  promises: [
    { promise: "Reopen Muthyampet sugar mill in 100 days", status: "Pending", note: "Demo item" },
    { promise: "Rythu Bharosa crop investment support", status: "In progress", note: "Demo item" },
    { promise: "New degree college for Korutla", status: "Pending", note: "Demo item" },
  ],
};

export const DAILY_TASKS = [
  { id: "t1", title: "Morning booth visit", detail: "Visit your assigned booth; greet 10 households.", points: 10 },
  { id: "t2", title: "Share leader’s message", detail: "Forward today’s leader message to 3 WhatsApp groups.", points: 5 },
  { id: "t3", title: "Report one local issue", detail: "Photo + 2-line note on any civic issue in your street.", points: 15 },
  { id: "t4", title: "Enrol one new member", detail: "Add one supporter to the party membership list.", points: 20 },
  { id: "t5", title: "Evening street corner meet", detail: "15-minute chat with youth on jobs & schemes.", points: 15 },
  { id: "t6", title: "Pulse note", detail: "Write 3 lines on the mood in your area today.", points: 10 },
];

// Demo numbers for the prototype.
export const PULSE = {
  updated: "Demo data — connect a real survey feed before handover",
  sentiment: [
    { party: "BRS", pct: 44 },
    { party: "Congress", pct: 36 },
    { party: "BJP", pct: 16 },
    { party: "Others", pct: 4 },
  ],
  topIssues: [
    { issue: "Sugar mill revival", mentions: 128 },
    { issue: "Crop prices", mentions: 96 },
    { issue: "Youth jobs", mentions: 84 },
    { issue: "Water supply", mentions: 51 },
  ],
  mood: "Cautiously positive for BRS in rural mandals; urban youth undecided.",
};

export const STRATEGIES = [
  {
    id: "s1", title: "Booth Jeet Plan", forRole: "Booth Leader",
    steps: ["Map all 800-1200 voters in your booth.", "Identify 50 committed BRS families.", "Visit every house once a month.", "Ensure 90%+ turnout of your supporters on polling day."],
    tip: "Elections are won booth by booth. Own your booth like it is your constituency.",
  },
  {
    id: "s2", title: "Youth Connect", forRole: "Karyakartha",
    steps: ["Form a 10-member youth team in your village.", "Share job-calendar updates every Monday.", "Organise one sports or cultural event per month.", "Invite the mandal leader to address the team quarterly."],
    tip: "Youth bring energy and phones — both win elections.",
  },
  {
    id: "s3", title: "Mahila Outreach", forRole: "Karyakartha",
    steps: ["Meet self-help groups in your area weekly.", "Explain welfare schemes simply, with examples.", "Help 5 women apply for eligible schemes each month.", "Celebrate Bathukamma and local festivals together."],
    tip: "Women voters decide silently. Respect and consistency win them.",
  },
  {
    id: "s4", title: "WhatsApp Discipline", forRole: "All",
    steps: ["Share only verified party messages — never forwards from unknown sources.", "One crisp message per day beats ten noisy ones.", "Reply to questions within 2 hours.", "Report fake news about the party immediately to your coordinator."],
    tip: "Your phone is a party office. Keep it clean and credible.",
  },
  {
    id: "s5", title: "Seva First", forRole: "Aspirant (MLA/MP)",
    steps: ["Pick one visible civic problem and fix it in 30 days.", "Hold a monthly grievance morning in your area.", "Help students with scholarships and certificates.", "Be present at every local funeral, wedding and festival."],
    tip: "People vote for those who showed up before the election was announced.",
  },
  {
    id: "s6", title: "Smart Spending", forRole: "Mandal Leader",
    steps: ["Spend more on direct voter contact: corner meets, auto announcements.", "Spend less on big hoardings; one rally well done beats five poorly attended.", "Track every rupee: volunteer time is worth more than flex banners.", "Review weekly: which activity brought new supporters?"],
    tip: "Spend where the voter is, not where the camera is.",
  },
];

export const CAREER_LADDER = [
  {
    stage: "Karyakartha", title: "Active Party Worker",
    needs: ["Complete 30 daily tasks.", "Enrol 10 new members.", "Attend 3 party events."],
    next: "Consistent ground work gets you noticed by your booth leader.",
  },
  {
    stage: "Booth Leader", title: "Booth In-charge",
    needs: ["Own one polling booth end-to-end.", "Build a 10-member booth committee.", "Deliver 90%+ supporter turnout in a local drive."],
    next: "Booth leaders are the backbone — the mandal president picks from here.",
  },
  {
    stage: "Mandal Leader", title: "Mandal Coordinator",
    needs: ["Coordinate 5+ booths successfully.", "Run one membership drive per quarter.", "Resolve 20 citizen grievances with proof."],
    next: "Visibility at mandal level opens the door to constituency roles.",
  },
  {
    stage: "Constituency Leader", title: "Recognised Face",
    needs: ["Lead a constituency-wide campaign activity.", "Earn public recommendation from 2 senior leaders.", "Show measurable vote-shift in your area."],
    next: "From here, the party considers you for tickets and nominated posts.",
  },
  {
    stage: "MLA / MP", title: "People’s Representative",
    needs: ["Win the trust of the high command.", "Prove winnability: survey, cadre, resources.", "Serve — the seat is a responsibility, not a reward."],
    next: "The journey from karyakartha to legislator is walked one booth at a time.",
  },
];
