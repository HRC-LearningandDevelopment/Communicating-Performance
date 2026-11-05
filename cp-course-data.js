/* Communicating Performance (CX360 Module 5) — all course text lives here. */
(function () {
  const LOBS = [
    { id: 'cs', name: 'Customer Service' },
    { id: 'billing', name: 'Billing & Charge Entry' },
    { id: 'coding', name: 'Coding' },
    { id: 'posting', name: 'Payment Posting' },
    { id: 'ar', name: 'AR / Collections' },
    { id: 'edi', name: 'Onboarding & EDI' },
    { id: 'labs', name: 'Labs' },
    { id: 'mis', name: 'Process Excellence & MIS' }
  ];

  // One entry per line of business: rewrite line, email, bad/good-news cards, pushback.
  const L = {
    cs: { rot: 1,
      call: 'We’re looking into the hold times, it should get better soon.', style: 'Passive', topic: 'hold times',
      good: 'Average hold time rose to 6 minutes this week against your 2-minute target. It’s driven by billing calls landing in the wrong queue. We’re re-routing them by Wednesday, and I’ll send you the daily hold time until it’s back under 2 minutes.',
      blame: 'Hold times are up because your new phone menu is sending calls to the wrong place.',
      email: 'Hi, just wanted to let you know that our numbers have been a bit off lately. We’re working on it. Let us know if any concerns.',
      emailModel: 'Subject: CSAT down to 84%, fix live by Friday. “Hi Dana, I’m writing to flag a dip in patient experience. CSAT fell from 92% to 84% this month, and abandonment rose to 11%. The cause: the new phone menu routes billing calls to the wrong queue. We’ve mapped a routing fix with your IT team. Could you approve the change by Wednesday so it’s live by Friday? I’ll share daily CSAT until it’s back above 90%.”',
      bad: { m: ['CSAT 92% → 84%', 'Abandonment 4% → 11%'], c: 'New phone menu routes billing calls to the wrong queue', s: [
        'Bottom line: patient experience has dropped. CSAT is down from 92% to 84% this month.',
        'Abandonment has risen from 4% to 11%, so more patients hang up before they reach us.',
        'The cause is the new phone menu: billing calls are being routed to the wrong queue.',
        'We’ve mapped a routing fix with your IT team and added two agents to the billing queue in the meantime.',
        'You’ll see abandonment back under 5% within two weeks, and I’ll send you daily numbers until then.'] },
      gd: { m: ['First-call resolution 68% → 79%', 'CSAT back to 93%'], c: 'Knowledge base refresh + call calibration', s: [
        'Bottom line: first-call resolution is up from 68% to 79%, and CSAT is back to 93%.',
        'That means fewer repeat calls from your patients and fewer complaints reaching your front desk.',
        'It came from refreshing our knowledge base and running weekly call calibration.',
        'Calibration is now a standing weekly session, so the gain holds as the team changes.',
        'Next, we’d like to use the same approach on your billing enquiries. Can we agree a start date?'] },
      push: 'Our patients keep telling us they can’t get through. Why are we paying for this?',
      def: 'That’s mainly the new phone menu on your side. It’s sending billing calls to the wrong queue.',
      ack: '(Let them finish.) I hear you. Patients not getting through is serious, and I understand why you’re questioning the value.',
      esc: 'It’s been like this for three weeks, and my front desk is taking the complaints.',
      explore: 'Which complaints are you hearing most: long waits, or calls being dropped? That tells me which fix to prioritise.',
      argue: 'Three weeks is a bit of an exaggeration. The spike started ten days ago.',
      stand: 'Abandonment is at 11% against a 5% target. The cause is billing calls reaching the wrong queue. We’re re-routing them by Wednesday and adding two agents today. I’ll send you daily numbers, and we’ll review them together next Friday.',
      shift: 'Once your IT team approves the routing change it’ll be fixed. It’s really in their hands.' },

    billing: { rot: 2,
      call: 'Honestly, the delays are because your templates keep changing.', style: 'Aggressive', topic: 'charge entry delays',
      good: 'Charge entry TAT is at 60 hours against our 24-hour target. Most delays trace to the new template, which is missing mandatory fields. We’ve built a day-one check that flags gaps, and I’d like 15 minutes with your team to agree the fields. We’ll be back under 24 hours by the 20th.',
      blame: 'Charges will be entered once your team starts sending complete information.',
      email: 'Charge entry is delayed because we haven’t received complete encounter details from your team, as mentioned multiple times.',
      emailModel: 'Subject: Charge entry TAT at 60 hrs, 15-minute call needed this week. “Hi Dana, I’m writing to get charge entry back on track. TAT has risen from 24 to 60 hours, and rejections from 2% to 5%. Most delays trace to the new template, which is missing three mandatory fields. We’ve added a day-one check that flags gaps. Could your team join a 15-minute call by Thursday to agree the fields? We’ll be back under 24 hours by the 20th.”',
      bad: { m: ['Charge entry TAT 24 → 60 hrs', 'Rejections 2% → 5%'], c: 'New client template missing mandatory fields', s: [
        'Bottom line: charge entry is running slow. TAT has gone from 24 to 60 hours.',
        'Rejections have also risen from 2% to 5%, which delays your cash.',
        'The root cause is the new template: it’s missing mandatory fields, so encounters stall.',
        'We’ve added a day-one check that flags missing fields, and we’re agreeing the template with your team this week.',
        'You’ll see TAT back under 24 hours by the 20th, and rejections under 2% next month.'] },
      gd: { m: ['Clean claim rate 94% → 98%', 'Rejections down 60%'], c: 'Pre-submission checklist', s: [
        'Bottom line: your clean claim rate is up from 94% to 98%, and rejections are down 60%.',
        'That means claims are paid on first submission, so cash arrives sooner with less rework for your team.',
        'It came from a pre-submission checklist our team now runs on every claim.',
        'The checklist is built into our workflow, and we audit it weekly so it sticks.',
        'Next, we’d like to extend it to your two new providers. Could we start this month?'] },
      push: 'Our cash is late because your team can’t enter charges on time.',
      def: 'Honestly, the delays come from your new template. It’s missing mandatory fields.',
      ack: '(Let them finish.) You’re right to raise it. Late charges mean late cash, and that’s a real problem for you.',
      esc: 'It’s been weeks. My CFO is asking me why cash is down.',
      explore: 'What would help most with your CFO right now: a date for TAT recovery, or a view of the cash at risk?',
      argue: 'It’s actually only been ten days, and TAT was fine before the template changed.',
      stand: 'Charge entry TAT is at 60 hours against 24. The main cause is missing template fields. We’ve added a day-one check, and I’d like 15 minutes with your team this week to fix the template. TAT will be under 24 hours by the 20th, and I’ll send you a cash-at-risk view for your CFO by Friday.',
      shift: 'Once your team sends complete encounters, we’ll be fine. It really depends on them.' },

    coding: { rot: 0,
      call: 'Accuracy dipped a little, but it’s a new specialty for everyone.', style: 'Passive', topic: 'coding accuracy',
      good: 'Coding accuracy is at 91% against your 95% target. The dip is in the new specialty, where our guidelines weren’t updated in time. We’ve updated them and started peer audits this week. You’ll see accuracy above 95% within four weeks, and I’ll share the score every Monday.',
      blame: 'Accuracy dropped because your providers’ documentation for the new specialty is incomplete.',
      email: 'Please be informed that accuracy is below target this month due to various reasons. Improvement steps are in progress.',
      emailModel: 'Subject: Coding accuracy at 91%, back above 95% in four weeks. “Hi Dana, I’m writing to update you on coding accuracy. It’s 91% this month against your 95% target, and rework has tripled. The dip is in the new specialty: our guidelines weren’t updated when it was added. We’ve updated them and started peer audits. Could you share the specialty’s payer policies by Friday so we can finish the guideline? I’ll send weekly accuracy until we’re back above 95%.”',
      bad: { m: ['Accuracy 96% → 91% (target 95%)', 'Rework up 3x'], c: 'New specialty added without updated guidelines', s: [
        'Bottom line: coding accuracy has dropped to 91%, below your 95% target.',
        'Rework has tripled, which slows your claims going out.',
        'The cause is the new specialty: it was added before our coding guidelines were updated.',
        'We’ve updated the guidelines and started daily peer audits on that specialty.',
        'You’ll see accuracy back above 95% within four weeks, with a weekly score from me.'] },
      gd: { m: ['Accuracy 91% → 97%', 'Backlog cleared 2 days early'], c: 'Specialty training + peer audits', s: [
        'Bottom line: coding accuracy is up to 97%, and we cleared the backlog two days early.',
        'That means fewer denials and faster billing, so your revenue lands sooner.',
        'It came from specialty training and daily peer audits.',
        'Peer audits are now permanent, and new coders train on the specialty before they go live.',
        'Next, we’d like to bring the same training to your cardiology charts. Could we discuss scope next week?'] },
      push: 'More coding errors again? Is your team even trained on our specialty?',
      def: 'The errors mostly come from your providers’ documentation, not our coders.',
      ack: '(Let them finish.) That’s a fair question, and I understand why your trust in our accuracy has taken a hit.',
      esc: 'This is the second time this quarter. My billing team is drowning in rework.',
      explore: 'Which errors are causing your team the most rework? I want to fix the ones that hurt you most first.',
      argue: 'To be fair, accuracy was above target last month, so it isn’t really the second time.',
      stand: 'Accuracy is at 91% against your 95% target. The errors are in the new specialty, where our guidelines lagged. We’ve updated them and started daily peer audits. You’ll see accuracy above 95% within four weeks, and I’ll send you the score every Monday.',
      shift: 'If your providers documented more clearly, our accuracy would be fine.' },

    posting: { rot: 1,
      call: 'The bank changed the file, so that’s not on us.', style: 'Aggressive', topic: 'posting delays',
      good: 'Posting lag is at three days against our one-day target. The bank changed its remittance file format, and our mapping didn’t pick it up. We’re fixing the mapping with the bank this week. Posting will be back to next-day by Monday, and I’ll confirm when unapplied cash is cleared.',
      blame: 'We’ll catch up eventually, but the bank really needs to sort out its file.',
      email: 'Posting is slightly delayed for some deposits. Will share an update once things are sorted.',
      emailModel: 'Subject: Posting lag at 3 days, back to next-day by Monday. “Hi Dana, I’m writing to flag a delay in payment posting. Lag has risen from one to three days, and unapplied cash is up 40%. The cause: the bank changed its remittance file format. We’re remapping the file with the bank this week. Could you confirm your bank contact by Wednesday so we can finish testing? Posting will be back to next-day by Monday.”',
      bad: { m: ['Posting lag 1 → 3 days', 'Unapplied cash up 40%'], c: 'Bank changed its remittance file format', s: [
        'Bottom line: payments are posting late. Lag is up from one day to three.',
        'Unapplied cash has risen 40%, so your books are harder to reconcile.',
        'The root cause is the bank’s new remittance file format, which our mapping didn’t recognise.',
        'We’re remapping the file with the bank and posting the backlog manually in the meantime.',
        'Posting will be back to next-day by Monday, and unapplied cash cleared by month-end.'] },
      gd: { m: ['Auto-post rate 72% → 88%', 'Posting back to same day'], c: 'File mapping fixed with the bank', s: [
        'Bottom line: auto-posting is up from 72% to 88%, and posting is back to same day.',
        'That means your books balance daily, and your team spends less time chasing unapplied cash.',
        'It came from fixing the file mapping with your bank.',
        'We now test every bank file change before it goes live, so it won’t slip again.',
        'Next, we’d like to bring your second bank onto the same set-up. Could we schedule it this month?'] },
      push: 'Our books don’t balance. I need every payment posted by Friday, no excuses.',
      def: 'That’s down to the bank. They changed the file format without telling anyone.',
      ack: '(Let them finish.) Understood. Books that don’t balance are a serious problem, especially at month-end.',
      esc: 'My auditors are in next week. I can’t explain this to them.',
      explore: 'What do your auditors need to see first: the unapplied cash list, or a clear posting date?',
      argue: 'To be clear, most payments are posted. It’s really just a few deposits.',
      stand: 'Posting lag is three days against next-day. The bank’s new file format broke our mapping. We’re posting the backlog manually now and fixing the mapping this week. Every payment will be posted by Thursday, a day before your deadline, and I’ll send you a reconciled unapplied cash list for your auditors on Friday.',
      shift: 'We’ll get there, but it really depends on how fast the bank responds.' },

    ar: { rot: 2,
      call: 'We might be a little behind on some follow-ups.', style: 'Passive', topic: 'follow-ups',
      good: 'AR over 90 days has risen to 31% against a 24% baseline. A payer portal change and two callers on leave slowed our follow-ups. We’ve added cover and moved the highest-value accounts to the front of the queue. You’ll see it under 25% within six weeks, with an update from me every Monday.',
      blame: 'AR is up because of your payer mix changes and the portal issues.',
      email: 'AR > 90 has increased. This is mainly due to payer delays which are outside our control.',
      emailModel: 'Subject: AR over 90 at 31%, recovery plan and one ask. “Hi Dana, I’m writing to share our recovery plan for aged AR. AR over 90 days has risen from 24% to 31%, and cash is at 88% of target. Two causes: a payer portal change and two callers on leave. We’ve added cover and prioritised the highest-value accounts. Could you approve weekend follow-up hours by Thursday? You’ll see AR over 90 under 25% within six weeks.”',
      bad: { m: ['AR > 90 days 24% → 31%', 'Cash at 88% of target'], c: 'Payer portal change; two callers on leave', s: [
        'Bottom line: aged AR is up. AR over 90 days has gone from 24% to 31%.',
        'Cash collected is at 88% of target, so money is sitting longer with payers.',
        'Two causes: a payer portal change slowed follow-ups, and two callers were on leave.',
        'We’ve added cover and moved the highest-value accounts to the front of the work queue.',
        'You’ll see AR over 90 below 25% within six weeks, with a weekly update from me.'] },
      gd: { m: ['Cash 104% of target', 'AR > 90 down to 19%'], c: 'Work queue prioritised by value and deadline', s: [
        'Bottom line: cash is at 104% of target, and AR over 90 days is down to 19%.',
        'That means more of your money is in the bank, not sitting with payers.',
        'It came from prioritising the work queue by claim value and filing deadline.',
        'That prioritisation now runs automatically every morning, so the gain holds.',
        'Next, we’d like to target your two slowest payers. Could we review them together next week?'] },
      push: 'Our AR has never been this bad. I’m taking this to your leadership.',
      def: 'It’s mainly the payer portal change. That’s outside our control.',
      ack: '(Let them finish.) I understand. AR at this level hits your cash, and you’re right to escalate if you need to.',
      esc: 'I’ve heard “we’re working on it” for a month. I want to see a real plan.',
      explore: 'What would make you confident in the plan: weekly numbers, a named owner, or a review with my director?',
      argue: 'It’s not actually our worst month. It was higher last spring.',
      stand: 'AR over 90 is at 31% against a 24% baseline. A payer portal change and two callers on leave slowed us down. We’ve added cover and are working the highest-value accounts first. You’ll see it under 25% within six weeks. I’ll send you the numbers every Monday, and I’ll bring my director to our review next week.',
      shift: 'Honestly, until the payers fix their portals, there’s only so much we can do.' },

    edi: { rot: 0,
      call: 'We can’t go live until your team sends the documents.', style: 'Aggressive', topic: 'enrolment delays',
      good: 'Enrolment TAT is at 28 days against our 15-day target, and one go-live is at risk. Twelve documents are still outstanding, and our manual tracking let that slip. I’ll send you a checklist of exactly what’s missing today. If we have them by Friday, go-live stays on the 15th.',
      blame: 'We’ve asked for those documents several times. It’s really on your team now.',
      email: 'We are still waiting for the documents requested last month. Go-live cannot happen without them.',
      emailModel: 'Subject: 12 documents needed by Friday to keep the 15th go-live. “Hi Dana, I’m writing to protect your go-live date. Enrolment is at 28 days against our 15-day target, and 12 documents are still outstanding. Our manual tracking didn’t flag this early enough, so we’ve moved to a shared tracker. The full list is attached. Could your team send them by Friday? If so, go-live stays on the 15th.”',
      bad: { m: ['Enrolment TAT 15 → 28 days', 'One go-live at risk'], c: 'Incomplete client documents, manual tracking', s: [
        'Bottom line: one go-live is at risk. Enrolment TAT is at 28 days against 15.',
        'Twelve provider documents are still outstanding, so enrolments can’t be submitted.',
        'Our manual tracking didn’t flag the missing documents early enough.',
        'We’ve moved to a shared tracker, and today you’ll get a checklist of exactly what’s missing.',
        'If we have the documents by Friday, go-live stays on the 15th.'] },
      gd: { m: ['3 go-lives on time', 'Enrolment TAT 28 → 14 days'], c: 'Client document checklist + tracker', s: [
        'Bottom line: all three go-lives were on time, and enrolment TAT is down from 28 to 14 days.',
        'That means your new providers can bill from day one, with no lost revenue.',
        'It came from a document checklist and a shared tracker your team can see.',
        'We now use the checklist for every new provider, from the first call.',
        'Next, we’d like to help you plan the four providers joining next quarter. Can we set that up?'] },
      push: 'We go live in two weeks and enrolments still aren’t done?',
      def: 'We’ve been waiting on documents from your team for over a month.',
      ack: '(Let them finish.) I understand the worry. A late go-live means providers who can’t bill.',
      esc: 'My providers start seeing patients on the 15th. If they can’t bill, that’s lost revenue.',
      explore: 'Which providers matter most for the 15th? If we prioritise them, we protect most of the revenue.',
      argue: 'Technically we’re not late yet. There are still two weeks.',
      stand: 'Enrolment is at 28 days against 15, and twelve documents are outstanding. Our manual tracking didn’t flag them early enough, so we’ve moved to a shared tracker. I’ll send you the exact list today. If we have them by Friday, your priority providers will be live on the 15th, and I’ll update you daily until then.',
      shift: 'As soon as your team sends the documents, we’ll finish. It’s really in their hands.' },

    labs: { rot: 1,
      call: 'The ordering system issue is really on your side.', style: 'Aggressive', topic: 'requisition errors',
      good: 'Requisition errors are at 8% against our 3% baseline, and billing is running five days behind. The new ordering system is dropping patient demographics. We’ve added a validation step at intake so we catch gaps on day one. Billing will be back to two days within two weeks.',
      blame: 'We can only bill what your ordering system sends us.',
      email: 'There were some issues with requisitions this week. Attached is the list.',
      emailModel: 'Subject: Requisition errors at 8%, billing back to 2 days in two weeks. “Hi Dana, I’m writing to flag a billing delay. Requisition errors have risen from 3% to 8%, and billing has slipped from two days to five. The cause: the new ordering system is dropping patient demographics. We’ve added an intake validation step. Could your IT team review the attached field list by Wednesday? Billing will be back to two days within two weeks.”',
      bad: { m: ['Requisition errors 3% → 8%', 'Billing delay 2 → 5 days'], c: 'New ordering system dropping demographics', s: [
        'Bottom line: billing is running late. Requisition errors are up from 3% to 8%.',
        'Billing has slipped from two days to five, which delays your revenue.',
        'The cause is the new ordering system: it’s dropping patient demographics.',
        'We’ve added a validation step at intake and shared the missing fields with your IT team.',
        'Billing will be back to two days within two weeks.'] },
      gd: { m: ['Requisition errors 8% → 2%', 'Billing next-day'], c: 'Demographic validation step at intake', s: [
        'Bottom line: requisition errors are down from 8% to 2%, and billing is now next-day.',
        'That means faster revenue, and fewer calls to your physicians’ offices about missing details.',
        'It came from a demographic validation step at intake.',
        'That step is now standard for every requisition, including new clients.',
        'Next, we’d like to extend it to your two outreach sites. Could we start next month?'] },
      push: 'Our physicians are complaining about delays. This is affecting patient care.',
      def: 'The delays come from your ordering system dropping patient details.',
      ack: '(Let them finish.) That’s serious. Anything that touches patient care needs to be fixed fast.',
      esc: 'Two physicians called me directly this week. They’re losing patience.',
      explore: 'What are the physicians seeing exactly: delayed results, or calls asking for missing details?',
      argue: 'Results aren’t actually delayed. It’s only the billing side.',
      stand: 'Requisition errors are at 8% against a 3% baseline, because the new ordering system drops demographics. We’ve added an intake check, so we catch gaps on day one instead of calling physicians later. Billing will be back to two days within two weeks, and I’ll send you a note you can share with the physicians by tomorrow.',
      shift: 'Once your IT team fixes the ordering system, this will stop.' },

    mis: { rot: 2,
      call: 'The report error was a one-off, it won’t happen again.', style: 'Passive', topic: 'report errors',
      good: 'Report SLA is at 90% against our 99% target, and two errors reached your dashboard. A data source change wasn’t validated before release. We’ve added a QA check before every release. From Monday every report will be on time and checked, and I’ll walk you through the corrected dashboard.',
      blame: 'The error came from the data your team sent us. We just report what we receive.',
      email: 'Apologies for the confusion in yesterday’s report. Kindly ignore the earlier version and use the attached.',
      emailModel: 'Subject: Corrected dashboard attached, two figures changed. “Hi Dana, I’m writing to correct two figures in yesterday’s dashboard: denial rate and cash collected. The error came from a data source change we didn’t validate. The corrected version is attached, with the changes highlighted, and we’ve added a QA check before every release. Could we take 10 minutes on Thursday to walk through it before your board pack goes out?”',
      bad: { m: ['Report SLA 99% → 90%', '2 errors in client dashboard'], c: 'Data source change not validated', s: [
        'Bottom line: two errors reached your dashboard, and report SLA fell to 90%.',
        'Two figures were wrong, so decisions may have been based on incorrect data.',
        'The cause: a data source change wasn’t validated before release.',
        'We’ve corrected the dashboard and added a QA check before every release.',
        'From Monday, every report will be on time and checked, and I’ll walk you through the corrected figures.'] },
      gd: { m: ['6 reports automated', '40 hours saved a month, 100% on time'], c: 'Automation + QA checks before release', s: [
        'Bottom line: we’ve automated six of your reports, and every report is on time.',
        'That means your team gets the numbers earlier and saves 40 hours a month of manual work.',
        'It came from automation, with QA checks before every release.',
        'Every new report now goes through the same automated QA.',
        'Next, we’d like to automate your monthly board pack. Could we scope it next week?'] },
      push: 'I showed your report to my board and the numbers were wrong.',
      def: 'The data we received had issues. We report what’s sent to us.',
      ack: '(Let them finish.) That happened in front of your board, and it’s on us to put it right. I understand the frustration.',
      esc: 'How am I supposed to trust any of your reports now?',
      explore: 'Which reports does your board rely on most? I’ll make sure those are double-checked first.',
      argue: 'Only two numbers were wrong. The rest of the report was accurate.',
      stand: 'Two figures were wrong because a data source change wasn’t validated. We’ve corrected the dashboard, and every report now passes a QA check before release. I’ll send you the corrected version with the changes highlighted today, and I can join your next board prep to walk through it.',
      shift: 'If your team flags data source changes earlier, it won’t happen again.' }
  };

  const name = id => LOBS.find(l => l.id === id).name;
  const rot = (arr, n) => arr.slice(n).concat(arr.slice(0, n));
  const per = fn => { const o = {}; LOBS.forEach(l => { o[l.id] = fn(L[l.id], l.id); }); return o; };
  const HINT = {
    Passive: 'Look again: this line doesn’t blame anyone. It softens the problem and avoids the number.',
    Aggressive: 'Look again: this line is said openly, and it puts the responsibility on someone else.',
    'Passive-aggressive': 'Look again: is the tension hidden, or is it out in the open?'
  };
  const WHY = {
    Passive: 'It hedges, softens the problem and gives the client no number, plan or date. They fill the silence with worry.',
    Aggressive: 'It puts the responsibility on someone else. Even if it’s partly true, the client hears defensiveness, not a plan.'
  };

  const standSim = l => ({ steps: [
    { sit: 'On a client call, someone on your team says: “' + l.call + '” Which style is it?', opts: ['Passive', 'Aggressive', 'Passive-aggressive'].map(st => st === l.style ? { text: st, ok: true, fb: 'Yes, ' + st.toLowerCase() + '. ' + WHY[st] } : { text: st, fb: HINT[l.style] }) },
    { sit: 'Now pick the STAND version: state the fact, steady tone, anchor to impact, name the plan, deliver the commitment.', opts: rot([
      { text: '“' + l.good + '”', ok: true, fb: 'That’s STAND: the number, a steady tone, the cause, a specific plan and a dated commitment.' },
      { text: '“I’m really sorry about the ' + l.topic + '. We’re trying our best, and hopefully it improves soon.”', fb: 'Apologetic and vague. No fact, no plan, no date, so the client is left to worry.' },
      { text: '“' + l.blame + '”', fb: 'This still points at someone else. The client hears defensiveness, not ownership.' }
    ], l.rot) }
  ] });

  const pushSim = l => ({ steps: [
    { sit: 'The client opens the call: “' + l.push + '”', opts: rot([
      { text: '“' + l.ack + '”', ok: true, fb: 'Listen, then acknowledge the concern without agreeing to anything inaccurate. It lowers the temperature so they can hear your plan.' },
      { text: '“' + l.def + '”', fb: 'You jumped straight to the cause. Even if it’s true, explaining before you’ve listened sounds defensive.' },
      { text: '“I’m so sorry. We’ll fix everything right away, I promise.”', fb: 'Over-apologising and promising everything is passive. You’ve committed to something you can’t control.' }
    ], l.rot) },
    { sit: 'They go on: “' + l.esc + '”', opts: rot([
      { text: '“' + l.argue + '”', fb: 'Correcting their facts now wins the point and loses the relationship. Explore first; tidy up details later.' },
      { text: '“' + l.explore + '”', ok: true, fb: 'Exploring finds what’s really driving the pushback, so your plan answers the real concern.' },
      { text: '“Okay, noted. Let me check and get back to you.”', fb: 'Too passive. The client doesn’t know you’ve understood, and the real issue stays hidden.' }
    ], (l.rot + 1) % 3) },
    { sit: '“So what are you actually going to do about it?”', opts: rot([
      { text: '“We’re on it, and it should settle down soon.”', fb: 'No fact, no plan, no date. This is the line clients mean when they say “we keep hearing that”.' },
      { text: '“' + l.shift + '”', fb: 'Handing the fix to someone else sounds like you’ve stopped owning it.' },
      { text: '“' + l.stand + '”', ok: true, fb: 'Respond with STAND: the fact, a steady tone, the impact, the plan and a dated commitment.' }
    ], l.rot) }
  ] });

  const card = (l, id, k, tag) => ({ tag: name(id) + ' · ' + tag, title: 'Your 90-second client update', html: '<strong>' + l[k].m.join(' · ') + '</strong><br><br>' + (k === 'bad' ? 'Cause: ' : 'Driver: ') + l[k].c });

  window.CP_COURSE = {
    title: 'Communicating Performance',
    kicker: 'CX360 · Module 5 · About 60 minutes',
    storeKey: 'hrc-communicating-performance-v1',
    passMark: 70,
    lobs: LOBS,
    lobDefault: 'ar',
    certLines: ['Communicating Performance'],
    certSub: 'CX360 · Module 5 · AM & Manager Track',
    nextSteps: [
      'Use STAND on your next tough client call.',
      'Run your next client email through PACE before you send it.',
      'Start preparing your Module 6 client update with real (anonymised) data from your own account.'
    ],
    speakers: {
      narrator: { name: 'Narrator', role: 'Course guide', tone: 'cyan', eleven: 'Xb7hH8MSUJpSbSDYk0k2' },
      arjun: { name: 'Arjun', role: 'Account Manager, HRC', tone: 'teal', eleven: 'cjVigY5qzO86Huf0OWal' },
      dana: { name: 'Dana Whitfield', role: 'Revenue Cycle Director, client', tone: 'amber', eleven: 'EXAVITQu4vr4xnSDxMaL' }
    },
    groups: [
      { label: 'Start', mods: ['welcome', 'why'] },
      { label: 'Part 1: Assertive by Default', mods: ['spectrum', 'stand', 'pace'] },
      { label: 'Part 2: Performance Conversations', mods: ['badnews', 'goodnews', 'pushback', 'channels'] },
      { label: 'Wrap-Up', mods: ['takeaways', 'final', 'results'] }
    ],
    modules: {
      welcome: { title: 'Welcome', mins: 2, hero: true, pages: [[
        { t: 'lede', html: 'This module is about the conversations that decide whether a client keeps trusting HRC: how you tell them about performance, good or bad, on calls and in email.' },
        { t: 'p', html: 'It’s for <strong>Account Managers and Managers</strong>. It takes about 60 minutes, and your progress saves automatically in this browser, so you can stop and come back.' },
        { t: 'name' },
        { t: 'lob' },
        { t: 'h3', text: 'How It Works' },
        { t: 'flow', items: [
          '<strong>Start: why client trust matters.</strong> What it costs, and a quick trust self-audit. About 6 minutes.',
          '<strong>Part 1: assertive by default.</strong> The assertiveness spectrum, STAND for calls and PACE for email. About 20 minutes.',
          '<strong>Part 2: performance conversations.</strong> Bad news, good news, client pushback, and the right channel. About 24 minutes.',
          '<strong>Wrap-up.</strong> Key takeaways, your commitment, a final check (70% to pass) and your certificate. About 10 minutes.'
        ] },
        { t: 'h3', text: 'By the end, you will be able to' },
        { t: 'objectives', items: [
          'Explain why how you communicate performance shapes client trust.',
          'Spot passive, aggressive and passive-aggressive habits, and choose assertive instead.',
          'Deliver tough updates on calls with STAND, and write them with PACE.',
          'Structure bad news with BLUF + Storytelling, and good news with BLUF + Value.',
          'Handle client pushback calmly with LAER.'
        ] },
        { t: 'h3', text: 'Where this fits in CX360' },
        { t: 'cards', cols: 3, items: [
          { tone: 'grey', kicker: 'Module 1 ✓', text: 'Effective Client Communication: lead with the point.' },
          { tone: 'grey', kicker: 'Module 2 ✓', text: 'Building Client Relationships: the Trust Equation.' },
          { tone: 'grey', kicker: 'Module 3 ✓', text: 'Client Service Skills: service recovery.' },
          { tone: 'grey', kicker: 'Module 4 ✓', text: 'Client Call Handling: ACE, 3C and executive presence.' },
          { tone: 'cyan', kicker: 'Module 5 · Now', text: 'Communicating Performance: clarity, ownership and control.' },
          { tone: 'violet', kicker: 'Module 6 · Next', text: 'Presentation Assessment: present a real client update.' }
        ] },
        { t: 'callout', tone: 'tip', html: 'Your progress is saved on this device only. Nothing is sent or tracked. Your reflections and results are included in the PDF of your answers at the end.' }
      ]] },

      why: { title: 'Why Client Trust Matters', mins: 6, pages: [
        [
          { t: 'lede', html: 'What does it cost when a client stops trusting you? Rarely the account at first. First the relationship goes, then the trust, and <strong>then</strong> the account.' },
          { t: 'h3', text: 'This isn’t a soft skill anymore' },
          { t: 'cards', cols: 2, items: [
            { tone: 'cyan', kicker: 'You own the relationship', text: 'You don’t just report performance. You raise delivery issues before the client has to.' },
            { tone: 'pink', kicker: 'Tone can undo months', text: 'One defensive answer on a call can undo months of good delivery, even when your explanation is valid.' },
            { tone: 'amber', kicker: 'Assertive isn’t aggressive', text: 'Leaders who confuse the two often say nothing. Assertive is clear, respectful and owned.' },
            { tone: 'violet', kicker: 'Avoidance costs trust', text: 'Every escalation you avoid, or risk you flag late, is a small trust withdrawal.' }
          ] },
          { t: 'quote', html: 'Clients remember how they were told, not just what they were told.' },
          { t: 'callout', tone: 'key', html: '<strong>You don’t need every answer.</strong> You do need to communicate early, take ownership, and make sure the client never feels you’re avoiding the issue.' },
          { t: 'reflect', id: 'r-putoff', label: 'A client conversation I’ve been putting off, and why', rows: 3 }
        ],
        [
          { t: 'h3', text: 'Recap: the Trust Equation' },
          { t: 'p', html: 'You met this in Module 2. Trust = (Credibility + Reliability + Intimacy) ÷ Self-orientation. The lower your self-orientation, the higher the trust, <strong>even when the news is bad</strong>.' },
          { t: 'cards', cols: 4, items: [
            { tone: 'cyan', kicker: 'Credibility', text: 'Your words: you know the account.' },
            { tone: 'green', kicker: 'Reliability', text: 'Your actions match your words.' },
            { tone: 'violet', kicker: 'Intimacy', text: 'They feel safe being candid with you.' },
            { tone: 'pink', kicker: '÷ Self-orientation', text: 'Protecting yourself or your team lowers trust.' }
          ] },
          { t: 'selfcheck', id: 'a-trust', title: 'Trust self-audit', inst: 'Think of your top client. Rate each statement from 1 (rarely) to 5 (consistently), using real evidence, not instinct. Your lowest lever is your growth edge.',
            scale: [['1', 1], ['2', 2], ['3', 3], ['4', 4], ['5', 5]],
            groups: {
              C: { name: 'Credibility', tip: 'Before your next review, prepare one insight the client hasn’t asked for: a trend, a risk or an opportunity.' },
              R: { name: 'Reliability', tip: 'List every commitment you make on your next call, and confirm each one in writing the same day.' },
              I: { name: 'Intimacy', tip: 'Ask your client: “What’s one thing you’d want me to hear early, before it becomes an escalation?”' },
              O: { name: 'Self-orientation', tip: 'On your next tough call, keep explanations under 30 seconds, then move to the plan.' }
            },
            items: [
              { g: 'C', text: 'This client asks for my view, not just the data.' },
              { g: 'R', text: 'I delivered every commitment I made to this client last month.' },
              { g: 'I', text: 'This client raises concerns with me first, before escalating.' },
              { g: 'O', text: 'On tough calls, I spend my time on the client’s problem, not on explaining why it wasn’t my team’s fault.' }
            ] }
        ]
      ] },

      spectrum: { title: 'The Assertiveness Spectrum', mins: 7, pages: [
        [
          { t: 'lede', html: 'Under pressure, people communicate in one of four ways. Only one protects <strong>both the message and the relationship</strong>.' },
          { t: 'cards', cols: 2, items: [
            { tone: 'amber', kicker: 'Passive', text: 'Hedging, avoiding the number, burying bad news on page six of the report. The client finds out anyway, and wonders what else you haven’t said.' },
            { tone: 'pink', kicker: 'Aggressive', text: 'Blaming the client or the team, over-defending in the moment. It may be true, but the client hears defensiveness.' },
            { tone: 'violet', kicker: 'Passive-aggressive', text: '“Sure, no problem” on the call, then venting to the team afterwards. The real problem never gets addressed.' },
            { tone: 'green', kicker: 'Assertive', text: 'Direct, respectful, fact-based and still in control. No hedging, no blaming, no drama.' }
          ] },
          { t: 'callout', tone: 'key', html: '<strong>Most leaders live in the middle two without realising it.</strong> Almost everyone rates themselves assertive. Your client, or your team, might describe someone different.' },
          { t: 'poll', id: 'poll', q: 'Be honest: which style do you slip into when a client is unhappy?', opts: [
            { title: 'Passive', sub: 'I soften it', fb: 'This is the most common trap for AMs. You’re closest to the client and want to protect the relationship, but softening too much is how clients get blindsided. STAND, next, gives you a structure for saying the number plainly.' },
            { title: 'Aggressive', sub: 'I defend the team', fb: 'You may be right about the cause, but leading with it makes the client defensive too. In LAER (Part 2) you’ll practise acknowledging before explaining.' },
            { title: 'Passive-aggressive', sub: 'I agree, then vent', fb: 'A common trap for Managers. If your team overheard you after a tough call, what would they say? Agreeing upwards and venting downwards is still passive-aggressive.' },
            { title: 'Assertive', sub: 'Usually', fb: 'Good. Now test it: would your client, and your team, say the same? Keep an eye on the phrases you use when you’re tired or caught off guard.' }
          ] }
        ],
        [
          { t: 'h3', text: 'Spectrum in action: calls and email' },
          { t: 'table', head: ['Style', 'On a call', 'In an email', 'Trust impact'], cols: '1fr 1.4fr 1.4fr 1.2fr', rows: [
            ['Passive', '“We might be a little behind on some claims…”', '“Per my last email, see attached for details.”', 'Client fills the silence with worry'],
            ['Aggressive', '“It’s not really our fault the AR is high.”', '“This delay is due to your team’s process changes.”', 'Client feels blamed and gets defensive'],
            ['Passive-aggressive', '“Sure, no problem at all” (said flatly)', 'Replies “Fine”, then cc’s leadership with no context', 'Client senses tension but can’t name it'],
            ['Assertive', '“Critical errors rose to 9 this week. Here’s what we’re doing.”', '“Denial rate is 4%, below target. Here’s what’s driving it.”', 'Client feels informed and in capable hands']
          ] },
          { t: 'buckets', id: 'a-spectrum', title: 'Name the style', inst: 'Sort each line into its style. Drag it, or select it and then select a box.', buckets: [
            { id: 'p', title: 'Passive', tone: 'amber' }, { id: 'a', title: 'Aggressive', tone: 'pink' }, { id: 'pa', title: 'Passive-aggressive', tone: 'violet' }, { id: 'as', title: 'Assertive', tone: 'green' }
          ], chips: [
            { text: '“Posting is slightly delayed. Will update.”', b: 'p', why: 'Vague and soft: no number, no plan, no date.' },
            { text: '“Accuracy dipped a little, but it’s a new specialty for everyone.”', b: 'p', why: 'It softens the number and hides behind an excuse.' },
            { text: '“The bank changed the file, so that’s not on us.”', b: 'a', why: 'Open blame, and no plan.' },
            { text: '“We can’t go live until your team sends the documents.”', b: 'a', why: 'It puts the whole problem on the client.' },
            { text: '“Sure, we’ll make it happen,” then after the call: “They have no idea how this works.”', b: 'pa', why: 'Agreeable on the call, venting afterwards: the real issue is never raised.' },
            { text: 'Replying “Noted.” and copying the client’s VP without a word of context', b: 'pa', why: 'The tension is real but hidden in the cc.' },
            { text: '“Charge entry TAT is 60 hours against 24. Here’s the cause and our fix, with a date.”', b: 'as', why: 'Fact, cause, plan and date.' },
            { text: '“Our accuracy came in at 92% against your 95% target. Here’s why, and when you’ll see it move.”', b: 'as', why: 'Direct, respectful and owned.' }
          ], kp: [
            'Passive avoids the issue. Aggressive wins the point and loses the relationship.',
            'Passive-aggressive hides the issue in tone, a cc, or a delay.',
            'Assertive says the truth, respects the relationship and owns the outcome.',
            'Assertive doesn’t mean the client hangs up happy. It means they know exactly where things stand.'
          ] },
          { t: 'reflect', id: 'r-phrase', label: 'One phrase I use under pressure that gives my style away', rows: 2, hint: 'For example: “We’re working on it.” “That’s not on our side.” “Sure, no problem.”', model: 'Example: “We’re looking into it” is passive. An assertive version: “Here’s what happened, here’s what we’re doing, and you’ll hear from me by Thursday.”' }
        ]
      ] },

      stand: { title: 'STAND for Calls', mins: 6, pages: [
        [
          { t: 'lede', html: 'STAND is your go-to structure the moment a client call turns uncomfortable, so you don’t have to improvise under pressure.' },
          { t: 'flow', items: [
            '<strong>State the fact.</strong> Lead with data, not opinion.',
            '<strong>Tone check.</strong> Steady: not apologetic, not sharp.',
            '<strong>Anchor to impact.</strong> What it means for them.',
            '<strong>Name the plan.</strong> What’s being done, specifically.',
            '<strong>Deliver the commitment.</strong> A next step and a date.'
          ] },
          { t: 'h3', text: 'Hear the rhythm: a missed SLA' },
          { t: 'quote', html: '“Our TAT compliance was 92% this week against your 98% SLA. I know that puts pressure on your month-end. The cause was a volume spike on Tuesday that we didn’t re-staff for fast enough, so from today we have a flex team on standby for spikes. You’ll see TAT back above 98% by next Friday, and I’ll send you a daily update until then.”' },
          { t: 'callout', tone: 'key', html: '<strong>Read it aloud once.</strong> Notice there’s no “unfortunately”, no “to be honest”, and no blame. The fact comes first, and the call ends with a date.' }
        ],
        [
          { t: 'lobbar' },
          { t: 'sim', id: 'a-stand', title: 'Rewrite it assertive', intro: 'A real line from your line of business. Spot the style first, then pick the STAND version.', stepWord: 'Step', nextLbl: 'Next step', doneHead: 'Line rewritten.', replay: 'Try again', byLob: per(l => standSim(l)), kp: [
            'Spot the style before you fix it: passive lines need a number; aggressive lines need ownership.',
            'STAND keeps the fact first and ends with a date.',
            'Steady tone means no apology for having standards, and no blame.'
          ] },
          { t: 'reflect', id: 'r-stand', label: 'Rewrite one line you’ve actually said to a client, using STAND', rows: 4, hint: 'State the fact · Tone check · Anchor to impact · Name the plan · Deliver the commitment', model: 'Example: “Denials rose to 7% this month against your 5% target. That slows your cash. Most come from two payers’ new authorisation rules, so we’ve added an authorisation check before submission. You’ll see denials back under 5% by the end of next month, and I’ll send you the trend every Friday.”' }
        ]
      ] },

      pace: { title: 'PACE for Email', mins: 6, pages: [
        [
          { t: 'lede', html: 'Email is unforgiving. There’s no tone of voice to soften a line, so the structure has to do more of the work.' },
          { t: 'flow', items: [
            '<strong>Purpose.</strong> Say why you’re writing in line one.',
            '<strong>Accurate.</strong> Facts only: no hedging, no guessing.',
            '<strong>Concise.</strong> Short and jargon-free. Reread once for tone before you send.',
            '<strong>End with the ask.</strong> What you need, from whom, by when.'
          ] },
          { t: 'callout', tone: 'key', html: '<strong>The most common mistake is burying the purpose in paragraph three.</strong> Clients skim. If the ask isn’t visible in 10 seconds, it gets missed, or read as less urgent than it is.' },
          { t: 'seq', id: 'a-pace-seq', title: 'Put the email in PACE order', inst: 'Select the sentences in the order they should appear.', items: [
            { text: '“I’m writing to share our plan to bring your denial rate back under 5%.”' },
            { text: '“Denials rose from 5% to 7% this month. 60% trace to two payers’ new authorisation rules.”' },
            { text: '“We’ve added an authorisation check before submission for both payers.”' },
            { text: '“Could you confirm your payer contacts by Thursday so we can validate the rules?”' }
          ], kp: ['Purpose in line one, so the reader knows why it matters.', 'Facts, then the plan, in as few words as possible.', 'End with a specific ask and a date.'] }
        ],
        [
          { t: 'lobbar' },
          { t: 'h3', text: 'Email makeover' },
          { t: 'p', html: 'This email is about to go to your client. It’s passive, harsh or vague. Rewrite it with PACE, then save to compare with a model version.' },
          { t: 'quote', html: '', byLob: per(l => ({ html: l.email })) },
          { t: 'reflect', id: 'r-pace', label: 'My PACE rewrite (subject line + email)', rows: 7, hint: 'Purpose · Accurate · Concise · End with the ask', byLob: per(l => ({ model: 'Example: ' + l.emailModel })) },
          { t: 'h3', text: 'The 10-second skim test' },
          { t: 'list', items: [
            'Does the subject line or first sentence say why you’re writing?',
            'Are there numbers instead of words like “a bit” or “some”?',
            'Is there a plan, and is it yours rather than someone else’s?',
            'Does it end with a clear ask and a date?',
            'No blame, no “as mentioned multiple times”, no jargon?'
          ] }
        ]
      ] },

      badnews: { title: 'Bad News: BLUF + Storytelling', mins: 8, pages: [
        [
          { t: 'lede', html: 'When the trend is going the wrong way, this structure keeps you factual and in control of the story. Clients lose trust fastest when they sense bad news is being buried.' },
          { t: 'cards', cols: 5, items: [
            { tone: 'cyan', kicker: 'BLUF', text: 'Bottom line up front: the situation, immediately.' },
            { tone: 'pink', kicker: 'Problem', text: 'What went wrong.' },
            { tone: 'violet', kicker: 'Insight', text: 'The root cause.' },
            { tone: 'amber', kicker: 'Action', text: 'What you’re doing.' },
            { tone: 'green', kicker: 'Impact', text: 'What improves, and by when.' }
          ] },
          { t: 'callout', tone: 'tip', html: '<strong>BLUF is the content; STAND is the delivery.</strong> Use them together on any performance call.' },
          { t: 'h3', text: 'Arjun’s data this month' },
          { t: 'table', head: ['Metric', 'W1', 'W2', 'W3', 'W4', 'Target'], cols: '1.8fr repeat(5,1fr)', rows: [
            ['QA score', '94%', '92%', '89%', '90%', '95%'],
            ['Critical errors', '3', '5', '9', '7', '≤3'],
            ['Non-critical errors', '12', '15', '18', '16', '≤10'],
            ['Documentation accuracy', '96%', '94%', '91%', '92%', '97%']
          ], caption: 'Error drivers: modifier errors (35%, rising) and eligibility errors (20%) are critical. The dip follows a process update that didn’t fully reach new hires.' },
          { t: 'av', id: 'av-bluf-bad', kind: 'Call replay', title: 'Two ways to share a QA dip', mins: '1 min', lines: [
            { sp: 'narrator', emo: 'neutral', beat: 'The monthly QA review', tag: 'calm', text: 'Month-end QA review. Dana, the client’s Revenue Cycle Director, asks Arjun how quality is tracking.' },
            { sp: 'dana', emo: 'neutral', tag: 'direct', text: 'Quick one, Arjun. How’s quality looking this month?' },
            { sp: 'arjun', emo: 'thoughtful', beat: 'Version 1: the buried bottom line', tag: 'hesitant, rambling', text: 'So, overall it’s been a busy month. We had some new hires, there was a process update, and, um, a few errors came up in week three. QA is around ninety, which is, you know, close.' },
            { sp: 'dana', emo: 'serious', tag: 'frustrated', text: 'Close to what? Is this a problem or not?' },
            { sp: 'narrator', emo: 'thoughtful', beat: 'Version 2: BLUF + Storytelling', tag: 'thoughtful', text: 'Dana had to dig for the bad news. Now the same data, bottom line first.' },
            { sp: 'arjun', emo: 'serious', beat: 'Bottom line · Problem', tag: 'calm, confident', text: 'Bottom line: QA is at 90% against your 95% target, and critical errors peaked at nine in week three.' },
            { sp: 'arjun', emo: 'serious', beat: 'Insight', tag: 'steady', text: 'Most are modifier and eligibility errors, after a process update that didn’t fully reach our new hires.' },
            { sp: 'arjun', emo: 'serious', beat: 'Action · Impact', tag: 'confident', text: 'We’ve retrained those agents and added a modifier check. You’ll see QA back above 93% by the end of next month, and I’ll send you the trend every Friday.' },
            { sp: 'dana', emo: 'neutral', tag: 'reassured', text: 'Okay. That’s clear. Thank you.' }
          ], ask: { q: 'What made the second version land?', opts: [
            { text: 'Arjun shared more data', fb: 'He used less data, not more. The difference was the order and the ownership.' },
            { text: 'The bottom line came first, then the cause, the action and a date', ok: true, fb: 'Exactly. Dana never had to dig, and she left knowing what happens next.' },
            { text: 'He apologised for the errors', fb: 'He didn’t apologise. He owned the problem and the fix, which builds more trust.' }
          ] } }
        ],
        [
          { t: 'lobbar' },
          { t: 'assignment', tag: '', title: '', html: '', byLob: per((l, id) => card(l, id, 'bad', 'Bad-news card')) },
          { t: 'seq', id: 'a-bad', title: 'Build the update', inst: 'Select the lines in BLUF + Storytelling order: Bottom line, Problem, Insight, Action, Impact.', byLob: per(l => ({ items: l.bad.s.map(text => ({ text })) })), kp: [
            'The bottom line goes first, even when it’s bad.',
            'The insight is the root cause, not an excuse.',
            'Close with an impact and a date the client can hold you to.'
          ] },
          { t: 'reflect', id: 'r-bad', label: 'Now say it your way: write your 90-second update', rows: 6, hint: 'Then read it aloud and time yourself. About 200 words is 90 seconds.', byLob: per(l => ({ model: 'Example: “' + l.bad.s.join(' ') + '”' })) }
        ]
      ] },

      goodnews: { title: 'Good News: BLUF + Value', mins: 6, pages: [
        [
          { t: 'lede', html: 'Good news delivered poorly still gets forgotten. Delivered well, it builds the trust you’ll need for the next hard conversation.' },
          { t: 'cards', cols: 5, items: [
            { tone: 'cyan', kicker: 'BLUF', text: 'The result, up front.' },
            { tone: 'green', kicker: 'Value', text: 'Why it matters to the client’s business.' },
            { tone: 'violet', kicker: 'Uplift driver', text: 'What caused the improvement.' },
            { tone: 'amber', kicker: 'Leverage', text: 'How you’ll sustain or scale it.' },
            { tone: 'pink', kicker: 'Extend', text: 'What’s next, or the added opportunity.' }
          ] },
          { t: 'callout', tone: 'key', html: '<strong>Value is the step most people skip.</strong> Translate the metric into what the client cares about: fewer denials means faster cash, not just a nicer QA score.' },
          { t: 'h3', text: 'Arjun’s data this month' },
          { t: 'table', head: ['Metric', 'W1', 'W2', 'W3', 'W4', 'Target'], cols: '1.8fr repeat(5,1fr)', rows: [
            ['SLA adherence', '97%', '98%', '99%', '99%', '98%'],
            ['AR > 90 days', '26%', '23%', '20%', '18%', '≤20%'],
            ['Productivity (claims/day)', '102', '108', '112', '118', '110'],
            ['Denial rate', '7%', '6%', '5%', '4%', '≤5%'],
            ['TAT compliance', '95%', '97%', '98%', '99%', '98%']
          ], caption: 'Uplift drivers: a focused follow-up strategy for aging accounts, process standardisation, and growing familiarity after ramp-up.' },
          { t: 'av', id: 'av-bluf-good', kind: 'Call replay', title: 'Two ways to share a win', mins: '1 min', lines: [
            { sp: 'narrator', emo: 'neutral', beat: 'The month-end review', tag: 'calm', text: 'Month-end review. The numbers are up, and Arjun has two minutes with Dana.' },
            { sp: 'arjun', emo: 'warm', beat: 'Version 1: the scorecard', tag: 'excited', text: 'Great news, Dana! The team has been amazing. SLA is 99%, productivity is 118, denials are 4%, TAT is 99%. Really proud of everyone.' },
            { sp: 'dana', emo: 'neutral', tag: 'unimpressed', text: 'Good. So what does that mean for us?' },
            { sp: 'narrator', emo: 'thoughtful', beat: 'Version 2: BLUF + Value', tag: 'thoughtful', text: 'Lots of numbers, all about HRC. Now the same win, told as value.' },
            { sp: 'arjun', emo: 'warm', beat: 'Bottom line', tag: 'warm, confident', text: 'Bottom line: your AR over ninety days is down to 18%, below target for the first time this year.' },
            { sp: 'arjun', emo: 'warm', beat: 'Value', tag: 'warm', text: 'That means your cash is coming in faster, with fewer claims at risk of timing out.' },
            { sp: 'arjun', emo: 'serious', beat: 'Uplift driver · Leverage', tag: 'confident', text: 'It came from a focused follow-up plan on aging accounts, and we’ve made it standard across the team, so it holds.' },
            { sp: 'arjun', emo: 'curious', beat: 'Extend', tag: 'curious', text: 'Next, I’d like to apply the same approach to your top two denial payers. Can we look at that together next week?' },
            { sp: 'dana', emo: 'warm', tag: 'pleased', text: 'Yes. Let’s do that.' }
          ], ask: { q: 'What turned the second version from a scorecard into value?', opts: [
            { text: 'He shared more metrics', fb: 'He shared fewer. One result, linked to what Dana cares about, landed harder than five numbers.' },
            { text: 'He thanked the team', fb: 'Recognising the team is good, but it’s about HRC. Dana needed to hear what it means for her.' },
            { text: 'He linked the result to Dana’s cash, then offered what’s next', ok: true, fb: 'Yes. Value made the win matter to her, and Extend turned it into the next opportunity.' }
          ] } }
        ],
        [
          { t: 'lobbar' },
          { t: 'assignment', tag: '', title: '', html: '', byLob: per((l, id) => card(l, id, 'gd', 'Good-news card')) },
          { t: 'seq', id: 'a-good', title: 'Build the update', inst: 'Select the lines in BLUF + Value order: Bottom line, Value, Uplift driver, Leverage, Extend.', byLob: per(l => ({ items: l.gd.s.map(text => ({ text })) })), kp: [
            'Lead with the result, then say what it means for the client.',
            'Credit the driver, then show how you’ll make it stick.',
            'Extend: every win is a chance to offer the next improvement.'
          ] },
          { t: 'reflect', id: 'r-good', label: 'Now say it your way: write your 90-second good-news update', rows: 6, hint: 'Watch for claiming credit without linking it to the client’s value.', byLob: per(l => ({ model: 'Example: “' + l.gd.s.join(' ') + '”' })) }
        ]
      ] },

      pushback: { title: 'Client Pushback: LAER', mins: 8, pages: [
        [
          { t: 'lede', html: 'STAND and PACE work when you deliver the message. LAER keeps you steady once the client responds, especially if they respond badly.' },
          { t: 'cards', cols: 4, items: [
            { tone: 'cyan', kicker: 'Listen', text: 'Let them finish before you respond.' },
            { tone: 'violet', kicker: 'Acknowledge', text: 'Their concern, not necessarily their facts.' },
            { tone: 'amber', kicker: 'Explore', text: 'What’s really driving the pushback?' },
            { tone: 'green', kicker: 'Respond', text: 'With the plan, calmly, using STAND.' }
          ] },
          { t: 'callout', tone: 'key', html: '<strong>Most escalations get worse because someone answers at the Listen stage with a Respond reaction.</strong> If the call heats up, pause, then come back to the plan.' }
        ],
        [
          { t: 'lobbar' },
          { t: 'sim', id: 'a-push', title: 'The pushback call', intro: 'You’re the Manager. The client is unhappy and pushes back three times. Use LAER, then respond with STAND.', stepWord: 'Moment', nextLbl: 'Continue the call', doneHead: 'Call handled.', replay: 'Replay the call', byLob: per(l => pushSim(l)), kp: [
            'Listen fully, then acknowledge the concern without agreeing to inaccurate facts.',
            'Explore before you explain: find what the client really needs.',
            'Respond with STAND: fact, cause, plan and a dated commitment.',
            'Never hand the fix to someone else on a client call.'
          ] }
        ]
      ] },

      channels: { title: 'Right Channel, Right Tone', mins: 4, pages: [[
        { t: 'lede', html: 'The same message follows different rules in a team conversation, an email and a client call. Getting the channel wrong can make a correct message land badly.' },
        { t: 'table', head: ['', 'Internal conversation', 'Client email', 'Client call'], cols: '1fr 1.3fr 1.3fr 1.3fr', rows: [
          ['Purpose', 'Coaching and improvement', 'Documentation', 'Relationship management'],
          ['Tone', 'Direct and empathetic', 'Neutral and formal', 'Diplomatic and reassuring'],
          ['Detail', 'High, discussion-based', 'Structured and concise', 'High-level, no internal detail'],
          ['Approach', 'Two-way', 'Mostly one-way', 'Controlled messaging'],
          ['Focus', 'Behaviour change', 'Clarity and record', 'Trust and resolution'],
          ['Avoid', 'Being too harsh or too soft', 'Emotional language', 'Blaming the team']
        ] },
        { t: 'buckets', id: 'a-channels', title: 'Which channel?', inst: 'Where does each conversation belong? Drag it, or select it and then select a box.', buckets: [
          { id: 'int', title: 'Internal conversation', tone: 'violet' }, { id: 'em', title: 'Client email', tone: 'cyan' }, { id: 'call', title: 'Client call', tone: 'green' }
        ], chips: [
          { text: 'Walking an agent through their three modifier errors', b: 'int', why: 'Detailed coaching belongs inside the team.' },
          { text: 'Deciding which two agents need retraining', b: 'int', why: 'Individual performance is never client-facing detail.' },
          { text: 'Confirming the agreed action plan and dates after a review', b: 'em', why: 'Email is the record: structured and concise.' },
          { text: 'Sending a corrected dashboard with the changes highlighted', b: 'em', why: 'A clear written record of what changed.' },
          { text: 'Reassuring a worried Director that the go-live is protected', b: 'call', why: 'Reassurance needs a voice and a two-way moment.' },
          { text: 'Handling a client’s frustration about a missed SLA', b: 'call', why: 'Pushback is handled live with LAER, then confirmed in writing.' }
        ], kp: [
          'Never expose internal team detail or blame to a client, whatever the channel.',
          'Handle emotion live; confirm decisions in writing.',
          'After every tough call, send a short PACE email as the record.'
        ] }
      ]] },

      takeaways: { title: 'Key Takeaways and Commitment', mins: 4, pages: [
        [
          { t: 'takeaways', items: [
            { title: 'Clients remember how they were told.', text: 'Clarity, direction and trust are not soft outcomes.' },
            { title: 'Assertive is the only style that protects both.', text: 'The message and the relationship. Watch for the middle two.' },
            { title: 'STAND for calls.', text: 'State the fact, tone check, anchor to impact, name the plan, deliver the commitment.' },
            { title: 'PACE for email.', text: 'Purpose, accurate, concise, end with the ask.' },
            { title: 'BLUF for every update.', text: 'Storytelling for bad news, Value for good news.' },
            { title: 'LAER for pushback.', text: 'Listen, acknowledge, explore, then respond with STAND.' }
          ] },
          { t: 'quote', html: 'Clients don’t expect perfection. They expect clarity, ownership and control.' }
        ],
        [
          { t: 'h3', text: 'Your commitment' },
          { t: 'p', html: 'Make it specific enough that someone could check you did it.' },
          { t: 'reflect', id: 'r-client', label: 'The client relationship I’ll focus on', rows: 2 },
          { t: 'reflect', id: 'r-change', label: 'One specific behaviour I’ll change in my next conversation with them', rows: 3, hint: 'For example: “I’ll lead with the number, not the background, on Thursday’s QA call.”' },
          { t: 'reflect', id: 'r-framework', label: 'The framework I’ll use (STAND, PACE or LAER), and when', rows: 2 },
          { t: 'h3', text: 'Closing the loop' },
          { t: 'cards', cols: 2, items: [
            { tone: 'cyan', kicker: 'Reinforce the improvement', text: 'Say it out loud, with your team and with the client.' },
            { tone: 'green', kicker: 'Recognise progress', text: 'Even partial progress. It keeps people moving.' },
            { tone: 'violet', kicker: 'Keep the cycle open', text: 'Accountability inside the team creates credibility with the client.' },
            { tone: 'amber', kicker: 'Follow up', text: 'Check your commitment in two to three weeks.' }
          ] },
          { t: 'callout', tone: 'key', html: '<strong>Trust is built in the follow-up, not the announcement.</strong>' }
        ],
        [
          { t: 'h3', text: 'Next up: Module 6 Presentation Assessment' },
          { t: 'p', html: 'Everything you practised here is what you’ll show in Module 6.' },
          { t: 'flow', items: [
            '<strong>Present a short client update</strong>, like the BLUF updates you built in this course.',
            '<strong>Use real (anonymised) data</strong> from your own account.',
            '<strong>You’re assessed on</strong> BLUF, STAND, and how you handle questions with LAER.',
            '<strong>Prepare this week</strong>, and rehearse once with a peer.'
          ] },
          { t: 'callout', tone: 'tip', html: 'Your facilitator will confirm the format, timing and assessment criteria. Your 90-second updates from Part 2 are a good first draft.' }
        ]
      ] },

      final: { title: 'Final Check', mins: 5, pages: [[
        { t: 'p', html: 'Ten scenario questions. You need <strong>70%</strong> (7 out of 10) to pass, and you can retake it as many times as you like. Your best score counts.' },
        { t: 'quiz' }
      ]] },

      results: { title: 'Results and Certificate', mins: 1, pages: [[ { t: 'results' } ]] }
    },

    quiz: [
      { q: 'At 6 pm a client emails demanding an explanation for a missed SLA. What’s your best first move?', o: ['Reply at once with a full apology and no details', 'Reply with the bottom line and a commitment to full details by 10 am', 'Wait until you have every fact before replying', 'Forward it to your manager to handle'], a: 1, fb: 'BLUF plus a dated commitment shows ownership straight away, without guessing at details you don’t have yet.' },
      { q: 'Which line is most assertive?', o: ['“I think maybe we could try to improve this.”', '“You need to understand this wasn’t our fault.”', '“Here’s what happened, here’s what we’re doing, and here’s when it changes.”', '“Sure, no problem at all.”'], a: 2, fb: 'Assertive is direct, fact-based and owned, with a plan and a date.' },
      { q: 'On a call you say “Sure, we’ll make it happen,” then tell your team afterwards, “They have no idea how this works.” Which style is that?', o: ['Passive', 'Aggressive', 'Passive-aggressive', 'Assertive'], a: 2, fb: 'Agreeing on the call and venting afterwards hides the real issue. That’s passive-aggressive.' },
      { q: 'In the Trust Equation, which factor reduces trust as it grows?', o: ['Credibility', 'Reliability', 'Intimacy', 'Self-orientation'], a: 3, fb: 'Self-orientation is the denominator. The more you protect yourself or your team, the lower the trust.' },
      { q: 'In STAND, what does “Deliver the commitment” mean?', o: ['Apologise for the issue', 'Give a specific next step and a date', 'Promise it will never happen again', 'Share the full data set'], a: 1, fb: 'A specific next step and date gives the client something to hold you to.' },
      { q: 'Which opening line follows PACE best?', o: ['“Hope you’re well. Following up on last month’s discussions…”', '“I’m writing to flag that AR over 90 has risen to 31%, and to share our recovery plan.”', '“Please see attached.”', '“As mentioned multiple times, we’re still waiting on your team.”'], a: 1, fb: 'Purpose in line one, with the fact, so the client knows why it matters in seconds.' },
      { q: 'True or false: leading with a win before the bad news softens the impact.', o: ['True: it cushions the blow', 'False: BLUF means leading with the actual bottom line'], a: 1, fb: 'Burying bad news behind good news reads as spin. Lead with the bottom line, whichever way it points.' },
      { q: 'Denials fell from 7% to 4%. Which line adds the Value step?', o: ['“The team worked really hard this month.”', '“That means faster cash, and fewer claims your team has to rework.”', '“We beat our target.”', '“It came from process standardisation.”'], a: 1, fb: 'Value translates the metric into what the client cares about. Process standardisation is the uplift driver.' },
      { q: 'A client interrupts you twice on a call. You’ve let them finish. Using LAER, what comes next?', o: ['Explain the root cause straight away', 'Acknowledge their concern', 'Correct the facts they got wrong', 'Promise a fix by tomorrow'], a: 1, fb: 'Acknowledge the concern, not necessarily their facts, before you explore and respond.' },
      { q: 'Which channel calls for controlled, high-level messaging with no internal team detail?', o: ['An internal coaching conversation', 'A client email', 'A client call'], a: 2, fb: 'Client calls are about trust and resolution: controlled messaging and never blaming the team.' }
    ]
  };
})();
