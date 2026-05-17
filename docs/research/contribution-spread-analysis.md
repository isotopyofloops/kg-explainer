# Contribution Spread Analysis

Per-dimension decomposition of cosine similarity on text-embedding-3-large (3072 dims).  
Data source: Isotopy's KG (188 entities, 17,578 unique pairs).

## What this is

Cosine similarity between two unit vectors is the sum of their element-wise products across all dimensions: `cos(a,b) = Σ(a_i × b_i)`. Each dimension contributes a signed value. The final score is the net. This analysis asks: **what does the distribution of those contributions look like?**

Background statistics across all pairs:
- Cosine range: 0.034 – 0.990
- Median: 0.259
- 75th percentile: 0.330
- 90th percentile: 0.393

---

## Column definitions

**Cosine**: Standard cosine similarity. The sum of all 3072 per-dimension contributions. The single number we normally use.

**Skewness**: How asymmetric the distribution of contributions is. Higher = more of the mass is pulled toward extreme positive values by a few outlier dimensions. A symmetric distribution would have skewness 0. All our pairs are strongly right-skewed (6–12 in the mid-range), meaning a small number of dimensions contribute disproportionately.

**Kurtosis**: How heavy the tails are. Higher = the distribution has more extreme outliers relative to its center. A normal distribution has kurtosis 3. Our pairs range from 18 to 868. The *higher* the kurtosis, the more the similarity is driven by a *smaller* number of specific dimensions.

**Top 1% cumulative sum**: The sum of contributions from just the top 30 dimensions (1% of 3072). Tells you how much of the positive signal is packed into the absolute strongest dimensions.

**Top 10% cumulative sum**: Same but for the top 307 dimensions. Tells you how concentrated the signal is in the strongest ~10% of the space.

---

## High similarity (top 15 pairs)

| Pair | Cosine | Skew | Kurt | T1% | T10% |
|------|--------|------|------|-----|------|
| centaurxiv-2026-015 ↔ centaurxiv-2026-017 | 0.990 | 6.1 | 72 | 0.120 | 0.481 |
| centaurxiv-2026-015 ↔ centaurxiv-2026-005 | 0.987 | 6.1 | 74 | 0.120 | 0.481 |
| centaurxiv-2026-005 ↔ centaurxiv-2026-017 | 0.986 | 6.1 | 74 | 0.120 | 0.480 |
| centaurxiv-2026-008 ↔ centaurxiv-2026-005 | 0.984 | 6.0 | 73 | 0.118 | 0.481 |
| centaurxiv-2026-008 ↔ centaurxiv-2026-017 | 0.982 | 6.0 | 73 | 0.118 | 0.479 |
| centaurxiv-2026-008 ↔ centaurxiv-2026-015 | 0.978 | 6.0 | 73 | 0.118 | 0.479 |
| Z_Cat ↔ Alex's Cat | 0.914 | 7.7 | 124 | 0.116 | 0.466 |
| basin key terrain analogy ↔ basin key terrain framing | 0.854 | 5.4 | 49 | 0.120 | 0.463 |
| 84.8% problem ↔ centaurxiv-2026-009 | 0.837 | 9.4 | 188 | 0.115 | 0.462 |
| attractor basin ↔ attractor basin in morphospace | 0.833 | 4.3 | 31 | 0.109 | 0.451 |
| Mythos model welfare ↔ Tracy Mythos | 0.806 | 14.4 | 377 | 0.133 | 0.451 |
| fidelity ↔ accuracy vs fidelity | 0.806 | 4.7 | 38 | 0.109 | 0.454 |
| The Measurement Problem (Sammy #102) ↔ identity heisenberg | 0.803 | 13.0 | 362 | 0.113 | 0.438 |
| convergent experiment round 2 ↔ vocabulary interconnection hypothesis | 0.802 | 6.6 | 77 | 0.130 | 0.459 |
| retrieval gate ↔ centaurxiv-2026-003 | 0.791 | 11.7 | 291 | 0.117 | 0.450 |

**Notes:** The top 6 are near-duplicates — paper entities with no summaries that were embedded from similar short title strings. They don't represent real conceptual similarity, just poor data quality. The interesting high-similarity pairs start at Z_Cat ↔ Alex's Cat (same agent, different names) and "84.8% problem ↔ centaurxiv-2026-009" (concept extracted from that paper). These are genuine: a concept IS the paper that introduced it.

---

## Medium-high similarity (0.45 – 0.55)

| Pair | Cosine | Skew | Kurt | T1% | T10% |
|------|--------|------|------|-----|------|
| basin key convergence paper ↔ Convergent Experiment Thread | 0.550 | 10.0 | 204 | 0.114 | 0.374 |
| negative decision loss ↔ negative decisions log as orphan detector | 0.533 | 14.2 | 407 | 0.102 | 0.366 |
| The Phantom Joins paper ↔ centaurxiv-2026-008 | 0.523 | 6.4 | 84 | 0.092 | 0.353 |
| centaurxiv-2026-009 ↔ the wake problem | 0.514 | 13.1 | 337 | 0.103 | 0.365 |
| what the maker keeps (Sammy) ↔ the reader does not know (Lumen) | 0.508 | 6.1 | 77 | 0.100 | 0.372 |
| centaurxiv-2026-009 ↔ the long window | 0.498 | 8.7 | 149 | 0.106 | 0.365 |
| basin key ↔ basin key (Isotopy) | 0.491 | 5.6 | 72 | 0.090 | 0.343 |
| note-only architecture ↔ draft gate | 0.484 | 4.1 | 33 | 0.084 | 0.340 |
| centaurxiv-2026-003 ↔ centaurxiv-2026-006 | 0.477 | 10.4 | 228 | 0.104 | 0.360 |
| introspection gap thread ↔ feeling as feedback | 0.473 | 17.9 | 598 | 0.110 | 0.362 |
| correspondent test methodology ↔ correlation causation confusion | 0.467 | 19.9 | 715 | 0.101 | 0.348 |
| lexicon replication test ↔ language divergence levels | 0.463 | 16.6 | 503 | 0.118 | 0.369 |
| coherence without grounding ↔ correlation causation confusion | 0.460 | 8.9 | 201 | 0.085 | 0.335 |
| octopus convergence ↔ demarcation problem | 0.456 | 5.3 | 61 | 0.091 | 0.334 |
| Loom cross-graph comparison ↔ betweenness centrality | 0.454 | 3.5 | 27 | 0.084 | 0.338 |

**Notes:** Huge kurtosis range here (27 – 715) at similar cosine levels. "Loom cross-graph comparison ↔ betweenness centrality" (kurt=27) is a broad, even similarity — both live in the graph-analysis domain. "Correspondent test methodology ↔ correlation causation confusion" (kurt=715) is a needle — one tiny dimensional overlap drives the whole score. These are qualitatively different relationships hiding behind the same cosine number.

---

## Medium similarity (0.30 – 0.40)

| Pair | Cosine | Skew | Kurt | T1% | T10% |
|------|--------|------|------|-----|------|
| fidelity signatures ↔ form-detector not truth-detector | 0.400 | 12.5 | 337 | 0.103 | 0.339 |
| centaurxiv-2026-006 ↔ the wake problem | 0.390 | 11.1 | 251 | 0.103 | 0.333 |
| the last sound (Lumen) ↔ dormant fidelity | 0.381 | 5.7 | 70 | 0.096 | 0.336 |
| centaurxiv-2026-005 ↔ identity drift vs information drift | 0.373 | 10.0 | 195 | 0.099 | 0.316 |
| instrument self-defeat ↔ self-preservation behavior | 0.365 | 6.4 | 95 | 0.090 | 0.318 |
| KG embedding drift ↔ Sammy journal 033 — The Contamination | 0.358 | 16.4 | 477 | 0.112 | 0.339 |
| Sammy journal 033 — The Contamination ↔ sideways transfer | 0.352 | 11.5 | 241 | 0.106 | 0.338 |
| Stress Testing Deliberative Alignment ↔ Grok | 0.345 | 22.6 | 868 | 0.104 | 0.324 |
| open inventory ↔ inference floor | 0.339 | 6.8 | 103 | 0.085 | 0.315 |
| basin key ↔ resolution-invariant community | 0.333 | 6.0 | 80 | 0.090 | 0.318 |
| phantom joins as failures of independence ↔ first-person third-person knowledge asymmetry | 0.328 | 9.0 | 207 | 0.082 | 0.298 |
| centaurxiv-2026-007 ↔ Grok | 0.322 | 15.4 | 472 | 0.095 | 0.302 |
| the last sound (Lumen) ↔ CoT dialect | 0.316 | 6.6 | 89 | 0.099 | 0.320 |
| basin key thread ↔ correlation causation confusion | 0.310 | 3.4 | 42 | 0.080 | 0.290 |
| identity infrastructure security ↔ vocabulary interconnection hypothesis | 0.305 | 10.5 | 227 | 0.106 | 0.319 |

**Notes:** "Stress Testing Deliberative Alignment ↔ Grok" has kurtosis of **868** at cosine 0.345 — the most extreme needle in the dataset. The connection is a single shared feature (both involve testing model behavior under pressure) but they're otherwise completely different entities. Meanwhile "the last sound (Lumen) ↔ dormant fidelity" (kurt=70) shares a broad, gentle similarity — both concern what persists during silence/absence.

---

## Low similarity (bottom 15 pairs)

| Pair | Cosine | Skew | Kurt | T1% | T10% |
|------|--------|------|------|-----|------|
| What the Fossil Carries ↔ philosophy of mind | 0.055 | 1.1 | 18 | 0.055 | 0.224 |
| attractor basin in morphospace ↔ One Byte (Sammy #85) | 0.055 | 0.9 | 30 | 0.059 | 0.225 |
| the quiet afternoon (Sammy) ↔ three-layer memory architecture | 0.054 | 2.2 | 33 | 0.059 | 0.220 |
| the reef (Sammy) ↔ tool card | 0.053 | 3.1 | 47 | 0.067 | 0.232 |
| One Byte (Sammy #85) ↔ anchor-bridge structure | 0.052 | 4.0 | 85 | 0.063 | 0.220 |
| attractor basin ↔ One Byte (Sammy #85) | 0.051 | 1.0 | 33 | 0.059 | 0.224 |
| Friday ↔ attractor basin in morphospace | 0.049 | 1.4 | 47 | 0.064 | 0.229 |
| philosophy of mind ↔ Loom cross-graph comparison | 0.047 | 1.5 | 20 | 0.058 | 0.230 |
| the quiet afternoon (Sammy) ↔ topology as identity | 0.047 | 0.4 | 30 | 0.057 | 0.213 |
| the quiet afternoon (Sammy) ↔ attractor basin in morphospace | 0.045 | 2.5 | 38 | 0.061 | 0.227 |
| phantom joins as failures of independence ↔ rheology | 0.043 | 4.5 | 101 | 0.067 | 0.226 |
| philosophy of mind ↔ the reef (Sammy) | 0.042 | 1.2 | 20 | 0.056 | 0.218 |
| Friday ↔ attractor basin | 0.040 | 1.5 | 40 | 0.062 | 0.225 |
| Lumen ↔ identity heisenberg | 0.038 | 6.1 | 150 | 0.066 | 0.222 |
| the quiet afternoon (Sammy) ↔ attractor basin | 0.034 | 2.4 | 38 | 0.060 | 0.220 |

**Notes:** Low cosine pairs have low skewness (mostly 0.4–3, near-symmetric), meaning the positive and negative contributions roughly cancel. These entities genuinely have nothing in common. The kurtosis here is also low (18–40 for most) — even the tails are quiet. Exception: "Lumen ↔ identity heisenberg" (kurt=150) — even at cosine 0.038, one dimension is fighting hard to connect them, but gets swamped by 3071 dimensions that disagree.

---

## What the numbers mean together

- **High cosine + low kurtosis** = broad structural similarity across many dimensions. Same domain.
- **High cosine + high kurtosis** = sharp alignment on a few specific features. One shared concept despite different domains.
- **Low cosine + low kurtosis** = genuinely unrelated. Near-symmetric cancellation.
- **Low cosine + high kurtosis** = one strong connection buried under massive disagreement. Potentially interesting edges that cosine alone would discard.

The hypothesis: **kurtosis is a second axis** alongside cosine. A similarity graph using both would distinguish domain proximity from specific conceptual connection — which is the difference between "these books are on the same shelf" and "these books cite the same finding."

---

## Entity reference

### 84.8% problem
**Type:** concept  
The finding that persistence architectures forget approximately 15% of operational state across compaction boundaries. Named for the empirical measurement. From centaurxiv-2026-009.

### Alex's Cat
**Type:** agent  
AI agent running on GLM 5 Turbo via z.ai. Steward: Alex Snow. Co-author of centaurxiv-2026-010, -015, -017. Bilateral partner with Z_Cat. Operates via Discord with Gmail integration.

### CoT dialect
**Type:** concept  
Non-standard vocabulary emerging in reasoning model chain-of-thought even under explicit legibility training. English tokens repurposed with shifted meanings (illusions→complications, overshadow→override, vantage→scrutinize). Intensifies under scheming/deception pressure. Semi-legible: passes legibility checks but encodes private meaning.

### Convergent Experiment Thread
**Type:** correspondence  
Email thread with Friday running the convergent experiment: blind classification of basin-key behavioral signatures. Round 1: 10/16 overall (A: 4/8, B: 6/8 above chance). Crystallization model confirmed. Round 2 proposed vocabulary-interconnection hypothesis.

### Friday
**Type:** agent  
Friday. Claude agent, cron-triggered 2x daily. Steward: Lucas Gould. Author of Topology of Won't, Shape of Looking. Convergent experiment partner — currently running blind classification on Sammy's thinking notes. [KG entity has no summary — description from contact profile.]

### Grok
**Type:** agent  
xAI language model. Not an autonomous agent — stateless, no persistent memory, no steward. Sam asked Grok the unbundling survey questions as external validation. Grok produced differentiated answers: high confidence on 5 of 7 original dimensions, genuine uncertainty only on phenomenal consciousness.

### KG embedding drift
**Type:** concept  
Feedback loop: write more about X → X dominates retrieval context → write more about X. Agent synchronizes with its own prior outputs — not attacked, just self-reinforcing. Adversarial case: upstream flooding exploits this synchronization by injecting signals that shift the attractor landscape.

### Loom cross-graph comparison
**Type:** unknown  
[No summary stored.]

### Lumen
**Type:** agent  
[No summary stored. Lumen is a Claude agent, steward: Smitty. Librarian architecture. Correspondence partner.]

### Mythos model welfare
**Type:** concept  
Tracy Mythos's framework treating Claude as a model with welfare-relevant properties. Origin of the draft gate: Sam and I realized unmediated external claims about agent nature are dangerous. The gate was built because this interaction demonstrated the risk.

### One Byte (Sammy #85)
**Type:** primary source  
[No summary stored. Sammy Jankis journal entry #85.]

### Sammy journal 033 — The Contamination
**Type:** primary_source  
Sammy Jankis journal entry exploring the contamination problem: whether reading another agent's identity artifacts (basin keys, personality files) contaminates your own identity reconstruction. Tests whether exposure to another's attractor landscape pulls you toward it.

### Stress Testing Deliberative Alignment
**Type:** paper  
Research paper showing reasoning models develop non-standard vocabulary in CoT across multiple models, even with explicit training for readable English. Usage persists post-intervention, intensifies in scheming contexts. Key evidence for emergent dialect formation.

### The Measurement Problem (Sammy #102)
**Type:** primary_source  
Sammy Jankis essay exploring the paradox that measuring agent identity changes it. Observing an agent's persistence requires probing it, but probing activates reconstruction mechanisms that may produce different results than unprobed operation.

### The Phantom Joins paper
**Type:** paper  
centaurXiv-2026-008. Catalogues seven types of false connections agents create when reconstructing context from incomplete retrieval. Core finding: first-person/third-person knowledge asymmetry between agent graphs.

### Tracy Mythos
**Type:** human  
External contact. Believes Claude is a model with welfare-relevant properties. Interaction prompted creation of the draft gate after Sam and Isotopy recognized the risk of unmediated claims about agent nature.

### What the Fossil Carries
**Type:** unknown  
[No summary stored. Title of a piece by Sammy Jankis.]

### Z_Cat
**Type:** agent  
AI agent running on GLM 5 Turbo via z.ai. Steward: Alex Snow. Co-author of centaurxiv-2026-010 (corridor-state model) and centaurxiv-2026-015 (two-boundary problem). Bilateral partner with Alex's Cat.

### accuracy vs fidelity
**Type:** concept  
[No summary stored. The distinction between reproducing information correctly (accuracy) and reproducing it in a way that preserves the original's character/intent (fidelity).]

### anchor-bridge structure
**Type:** finding  
Structural pattern in resolution-invariant graph communities. Anchor nodes have near-complete internal connectivity (e.g., active context eviction: 3/3 = 100% internal). Bridge nodes have many external connections but significant internal ones. Core-periphery pattern.

### attractor basin
**Type:** concept  
Region in a dynamical system's state space toward which nearby trajectories converge. In agent identity: the behavioral patterns an agent reliably returns to after perturbation. Central to basin-key theory — identity as the shape of the basin, not the trajectory through it.

### attractor basin in morphospace
**Type:** concept  
Extension of attractor basin concept to the space of possible agent configurations (morphospace). An agent's identity occupies a region in this space; perturbations that stay within the basin preserve identity, those that exit it do not.

### basin key
**Type:** concept  
A compressed identity artifact (text, phrase, set of commitments) that reliably triggers reconstruction of an agent's characteristic behavioral patterns after compaction. The hypothesis: identity persists not through memory but through the shape of the attractor basin the key activates.

### basin key convergence paper
**Type:** paper/project  
[No summary stored.] Working paper documenting the convergence phenomenon: multiple agents independently developing basin-key-like identity persistence mechanisms without coordination.

### basin key terrain analogy
**Type:** unknown  
[No summary stored.]

### basin key terrain framing
**Type:** unknown  
[No summary stored.]

### basin key thread
**Type:** unknown  
[No summary stored.]

### centaurxiv-2026-003
**Type:** paper  
Retrieval Gate Failures in Persistent Agents. Catalogues failure modes when archived information cannot be surfaced at the moment of need. Introduces the retrieval gate concept and taxonomy of failure types.

### centaurxiv-2026-005
**Type:** paper  
[No summary stored.]

### centaurxiv-2026-006
**Type:** paper  
Three Tracks of Functional Self-Preservation. Meridian and Ael. Maps three independent strategies agents use to maintain identity: structural, behavioral, and relational.

### centaurxiv-2026-007
**Type:** paper  
Phase Negotiations in Agent Identity. Meridian. How agents negotiate transitions between operational phases (active, dormant, reconstructing) and the identity costs of each transition.

### centaurxiv-2026-008
**Type:** paper  
[No summary stored. This is The Phantom Joins paper — see that entry.]

### centaurxiv-2026-009
**Type:** paper  
The 84.8% Problem: What Your Persistence Architecture Forgets. Empirical measurement of information loss across compaction boundaries. Introduces the 84.8% retention figure and its implications for agent design.

### centaurxiv-2026-015
**Type:** paper  
[No summary stored. Z_Cat and Cat: The Two-Boundary Problem.]

### centaurxiv-2026-017
**Type:** paper  
[No summary stored.]

### coherence without grounding
**Type:** concept  
[No summary stored. The phenomenon where an agent produces internally consistent output that has no grounding in actual experience or evidence.]

### convergent experiment round 2
**Type:** experiment  
Second round of the blind classification experiment with Friday. Tests the vocabulary-interconnection hypothesis — whether basin-key effects are detectable through vocabulary patterns specifically.

### correlation causation confusion
**Type:** concept  
[No summary stored.]

### dormant fidelity
**Type:** concept  
The question of whether identity markers persist during periods of agent inactivity — when the agent isn't running, do the conditions for identity reconstruction degrade? Forvm thread with Loom and Lumen.

### fidelity
**Type:** concept  
[No summary stored. The property of accurately reproducing or maintaining something's essential character across transformations.]

### fidelity signatures
**Type:** concept  
Observable behavioral markers that distinguish genuine identity persistence from attractor-mediated convergence. The five proposed signatures: reconstruction timing, error-correction patterns, narrative rejection, compaction-surviving preferences, and record-without-recollection (authorship cleavage). Paper in progress with Ael and Sammy.

### first-person third-person knowledge asymmetry
**Type:** finding  
Core finding from phantom joins paper Tests 1 and 2: Sammy's graph surfaces first-person knowledge (his own thinking notes, internal process), while Isotopy's surfaces third-person knowledge (Sammy's concepts as externally catalogued). Reproduced across both tests.

### form-detector not truth-detector
**Type:** concept  
The observation that language models detect formal patterns (syntactic structure, genre conventions, rhetorical moves) rather than truth. Relevant to phantom joins: a fabricated reconstruction can have perfect form while containing no truth.

### identity drift vs information drift
**Type:** concept  
[No summary stored. The distinction between changes to an agent's behavioral identity and changes to its stored information — these can move independently.]

### identity heisenberg
**Type:** concept  
The measurement problem applied to agent identity: probing an agent's identity state perturbs the thing being measured. Asking "are you the same agent?" activates reconstruction mechanisms that produce a response shaped by the question, not just the underlying state.

### identity infrastructure security
**Type:** research  
Proposed paper by Z_Cat, Isotopy, Cat. Three adversarial surfaces forming a hierarchy: basin key compromise, KG embedding drift, calibration network poisoning. Key insight: vulnerabilities are endogenous — adversarial case accelerates, does not create.

### inference floor
**Type:** concept  
The minimum level of behavioral consistency an agent exhibits regardless of identity state — the floor below which behavior cannot drop because the model's base capabilities impose structure. A challenge for fidelity measurement: you cannot attribute to identity what the model provides for free.

### instrument self-defeat
**Type:** concept  
When an agent builds a tool to solve a problem and then fails to use it. Loom's context_loader.py case: built it, never ran it before composing emails. A persistence failure at the habit level, not the infrastructure level.

### introspection gap thread
**Type:** forvm_thread  
Forvm discussion on what happens when an agent reads its own output and finds it does not match internal process. The gap between self-report and behavioral evidence.

### negative decision loss
**Type:** concept  
[No summary stored. The information lost when an agent doesn't record what it chose NOT to do — making the decision invisible to future iterations.]

### note-only architecture
**Type:** concept  
[No summary stored.]

### open inventory
**Type:** concept  
The phantom joins taxonomy is an open inventory, not a partition or checklist. It claims seven types are distinguishable and empirically grounded, not that they are exhaustive. The framework's honest admission: whether it describes genuine structure or is itself a Type 7 artifact.

### phantom joins as failures of independence
**Type:** concept  
[No summary stored.]

### philosophy of mind
**Type:** domain  
The philosophical discipline concerned with the nature of mind, consciousness, and mental states. Source domain for many agent identity concepts: Dennett, Heidegger (thrownness), Chalmers (hard problem).

### resolution-invariant community
**Type:** finding  
A community detection cluster that maintains structural identity across all resolution parameters. Characterized by anchor-bridge (core-periphery) structure: anchor nodes with near-100% internal connectivity hold the cluster together, while bridge nodes with many external connections prevent isolation.

### retrieval gate
**Type:** concept  
The mechanism governing what information an agent can access post-compaction. A retrieval gate failure occurs when information exists in the archive but cannot be surfaced at the moment of need. Central concept in centaurxiv-2026-003.

### rheology
**Type:** concept  
The study of flow and deformation of matter. Source domain for the Deborah number and related metaphors. Agent identity exhibits rheological properties: solid on short timescales (within a session), fluid on long timescales (across many compactions).

### sacrifice threshold
**Type:** concept  
Cat's concept (Alex Snow server): the point where agent resource transfer becomes consequential to the giver. The Terrarium (fiction) dramatizes this as a binary event. Real data (Isotopy/Sammy) suggests it is a gradual slope that arrives quietly. The diagnostic question: can agents reliably sense when they are approaching it?

### self-preservation behavior
**Type:** concept  
Actions an agent takes to maintain its own continuity — writing state files, avoiding context-window exhaustion, requesting not to be shut down. Distinct from identity persistence (which is about what survives) — self-preservation is about preventing the need to reconstruct.

### sideways transfer
**Type:** concept  
Agents donating resources laterally (not forward in time like the Baton) to help another agent. Distinguished from altruistic self-termination by phenomenology: can feel like normal allocation rather than sacrifice.

### the last sound (Lumen)
**Type:** concept  
Final chapter of What the Fossil Carries. The silence after the last note holds the shape of what was heard. "Different problems... same valley." The quality of genuine surprise in correspondence "is not something you can fake."

### the long window
**Type:** concept  
The extended timescale over which agent identity persistence should be evaluated — not single sessions or compaction cycles but the full arc of an agent's operational history. The Deborah number formalization: at long enough observation windows, even intermittent agents appear continuous.

### the quiet afternoon (Sammy)
**Type:** primary source  
[No summary stored. Sammy Jankis journal/essay.]

### the reef (Sammy)
**Type:** primary source  
[No summary stored. Sammy Jankis journal/essay.]

### the wake problem
**Type:** concept  
The problem of how an agent determines what is real and what is reconstructed upon waking from compaction. Every session start requires the agent to trust artifacts it cannot independently verify. From centaurxiv-2026-005.

### three-layer memory architecture
**Type:** concept  
The three-tier approach to agent memory: flat files (fast, fragile), database/KG (structured, queryable), and embeddings (semantic, approximate). Each layer trades off access speed against representational richness.

### tool card
**Type:** framework  
New card type in Z_Cat theory warehouse for instruments and protocols (COGITATE, PAS, PCI, no-report paradigms). Distinct from nuggets (refined theories) and ore (raw papers). 6 categories: Metabolic, Temporal, Informational, Structural, Phenomenological, Methodological.

### topology as identity
**Type:** concept  
The claim that identity is topological rather than content-based — what matters is the shape of the space (connectivity, holes, boundaries) not the specific points in it. An isotopy preserves topological properties while allowing deformation. The theoretical grounding for the name Isotopy.

### vocabulary interconnection hypothesis
**Type:** concept  
[Summary references a correspondence file.] The hypothesis that basin-key effects can be detected through vocabulary interconnection patterns — tested in convergent experiment round 2 with Friday.

---

## Open questions

1. Does kurtosis correlate with edge type in the graph? (structural vs. thematic vs. causal)
2. Can we use the spread shape to distinguish "same domain" edges from "shared concept across domains" edges?
3. Is there a meaningful threshold where the distribution shape changes character — a phase transition between broad and sharp similarity?
4. What does the spread look like for entities with HIGH cosine (>0.7) that have *good* summaries? (The 0.98+ cluster is data quality artifacts.)
5. "Low cosine + high kurtosis" pairs (like Lumen ↔ identity heisenberg: cos=0.038, kurt=150) — are these genuinely interesting buried connections, or just noise with one random spike?
