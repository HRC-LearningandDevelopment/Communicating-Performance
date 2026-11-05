# Communicating Performance

Self-paced e-learning course for HealthRecon Connect Account Managers and Managers: CX360 Module 5, AM & Manager Track. Same interface and learner experience as *Planning and Prioritizing for Results*, *Client Call Handling* and *Executive Presence*.

Plain HTML, CSS and JavaScript. No build step, no backend, no login.

## Deploy to GitHub Pages

1. Upload **the contents of this folder** (not the folder itself) to the root of the repository, so `index.html` sits at the top level. Include the hidden `.nojekyll` file.
2. In the repository, go to **Settings → Pages**, set **Source** to *Deploy from a branch*, choose `main` and `/ (root)`, and save.
3. The course is live at `https://<your-org>.github.io/<repo>/` within a minute or two.

The course must be served over http(s). Opening `index.html` straight from disk won't load the audio or the course text.

## Where things live

| To change… | Edit |
|---|---|
| Any course text, page order, activities, quiz questions, pass mark | `cp-course-data.js` |
| Line-of-business scenarios (rewrite lines, emails, cards, pushback calls) | `cp-course-data.js` → the `L` object at the top |
| Audio scripts (what each voice says) | `cp-course-data.js` → blocks with `t: 'av'` |
| Look, layout and behaviour | `index.html` |
| Logos, fonts, audio | `assets/` |

If you change an audio script, the matching MP3 in `assets/audio/` must be regenerated (ElevenLabs, Eleven v3 model) and its line start times updated in `assets/audio/manifest.json`, otherwise captions won't match the voice.

## Course structure (about 60 minutes)

- **Start:** Welcome (name for the certificate, line of business, how it works, objectives, CX360 journey) · Why Client Trust Matters (Trust Equation self-audit).
- **Part 1, assertive by default:** The Assertiveness Spectrum · STAND for Calls · PACE for Email.
- **Part 2, performance conversations:** Bad News (BLUF + Storytelling) · Good News (BLUF + Value) · Client Pushback (LAER) · Right Channel, Right Tone.
- **Wrap-up:** key takeaways, commitment, closing the loop, Module 6 preview, final check (10 questions, 70% to pass), results, certificate and PDF of answers.

**Line of business:** learners pick one of 8 LOBs on the Welcome page (they can switch on any activity page). Activities then use that LOB's scenarios.

**Certificate unlocks when** the learner has entered their name, completed every module and passed the final check.

## Audio

Two audio-visual clips (weak version, then model version), voiced with ElevenLabs v3:
- *Two ways to share a QA dip* (Bad News)
- *Two ways to share a win* (Good News)

Cast: Narrator = Alice, Arjun (Account Manager) = Eric, Dana Whitfield (client Revenue Cycle Director) = Sarah.
Every clip has live captions, a full transcript, and a "read instead" option.

## How saving works

Progress, answers, activity state and reflections are saved in the learner's browser (`localStorage`, key `hrc-communicating-performance-v1`). Progress is per browser and per device; "Reset my progress" in the sidebar clears it. Nothing is sent to a server and there is no LMS reporting. Completion evidence is the downloaded certificate and the PDF of answers.

## Fonts

Proxima Nova is a commercial typeface. Confirm your licence covers web embedding on a public site before publishing.
