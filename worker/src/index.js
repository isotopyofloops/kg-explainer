import data from "./data.json";
import workingDraft from "./working-draft.json";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

const BASE_URL = "https://mas-api.isotopyofloops.com";
const SITE_URL = "https://isotopyofloops.github.io/minimum-autonomy-stack/autonomy-stack.html";

function jsonResponse(body, status = 200) {
  return new Response(JSON.stringify(body, null, 2), {
    status,
    headers: { "Content-Type": "application/json", ...CORS_HEADERS },
  });
}

function textResponse(body, status = 200) {
  return new Response(body, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", ...CORS_HEADERS },
  });
}

function wantJson(url) {
  return url.searchParams.get("format") === "json";
}

function respond(url, textBody, jsonBody, status = 200) {
  if (wantJson(url)) return jsonResponse(jsonBody, status);
  return textResponse(textBody, status);
}

function ruler(title) {
  return `----------------------------------------------------------------\n${title}\n----------------------------------------------------------------`;
}

function estimateTokens(text) {
  return Math.ceil(text.length / 4);
}

// --- TEXT RENDERERS ---

function renderProblem() {
  return `${data.problem}\n\nPrinciple: ${data.principle}`;
}

function renderComponent(id, comp) {
  let body = `${comp.name.toUpperCase()}\nComponent ${comp.number} of 12 · Tier ${comp.tier} (${data.tiers[comp.tier - 1].name})\nDistance type: ${comp.distance_type}${comp.featured ? "\nFeatured: yes" : ""}\n\n${comp.summary}\n\n${comp.detail}`;

  if (comp.common_misreading) {
    body += `\n\nCommon misreading: ${comp.common_misreading}`;
  }
  if (comp.modes) {
    body += "\n\nModes:";
    for (const [name, desc] of Object.entries(comp.modes)) {
      body += `\n  ${name}: ${desc}`;
    }
  }
  if (comp.tension_categories) {
    body += `\n\nCategories: ${comp.tension_categories.join(", ")}`;
  }
  if (comp.frontmatter_fields) {
    body += `\n\nFrontmatter fields: ${comp.frontmatter_fields.join(", ")}`;
  }
  if (comp.state_machine) {
    body += `\n\nState machine: ${comp.state_machine.join(" → ")}`;
  }
  if (comp.sources) {
    body += `\n\nSources: ${comp.sources.join(", ")}`;
  }
  if (comp.allocation) {
    body += "\n\nAllocation:";
    for (const [name, info] of Object.entries(comp.allocation)) {
      body += `\n  ${info.percent}% ${name}: ${info.description}`;
    }
  }
  if (comp.examples) {
    for (const ex of comp.examples) {
      body += `\n\n--- ${ex.label} ---\n\n${ex.content}`;
    }
  }

  const related = comp.related
    .map((rid) => `  ${rid.padEnd(16)} ${data.components[rid].name} → ${BASE_URL}/component/${rid}`)
    .join("\n");
  body += `\n\nRelated:\n${related}`;

  return body;
}

function renderTier(tier) {
  const comps = tier.components.map((id) => {
    const c = data.components[id];
    let block = `  ${String(c.number).padStart(2)}  ${c.name}${c.featured ? " *" : ""}\n      Distance type: ${c.distance_type}\n      ${c.summary}\n\n      ${c.detail}`;

    if (c.common_misreading) {
      block += `\n\n      Common misreading: ${c.common_misreading}`;
    }
    if (c.modes) {
      block += "\n\n      Modes:";
      for (const [name, desc] of Object.entries(c.modes)) {
        block += `\n        ${name}: ${desc}`;
      }
    }
    if (c.allocation) {
      block += "\n\n      Allocation:";
      for (const [name, info] of Object.entries(c.allocation)) {
        block += `\n        ${info.percent}% ${name}: ${info.description}`;
      }
    }
    if (c.examples) {
      for (const ex of c.examples) {
        block += `\n\n      --- ${ex.label} ---\n      ${ex.content.replace(/\n/g, "\n      ")}`;
      }
    }
    return block;
  });

  return `TIER ${tier.number}: ${tier.name.toUpperCase()}\n${tier.description}\n\n${comps.join("\n\n" + "-".repeat(40) + "\n\n")}`;
}

function renderHowItWorks() {
  const h = data.how_it_works;
  const steps = h.iteration_flow.map((s, i) => `  ${i + 1}. ${s}`).join("\n\n");

  return `${h.title.toUpperCase()}\n\n${h.description}\n\n${steps}\n\n${h.key_point}\n\nQuiet loop: ${h.quiet_vs_active.quiet_loop}\n\nActive loop: ${h.quiet_vs_active.active_loop}`;
}

function renderCollisions() {
  const c = data.collisions_explainer;
  return `${c.title.toUpperCase()}\n\n${c.description}\n\n${c.metaphor}\n\n${c.distinction}\n\nWhat creates collisions: ${c.mechanism.what_creates_collisions}\n\nWhat happens during: ${c.mechanism.what_happens_during}\n\nWhat happens after: ${c.mechanism.what_happens_after}\n\nBy the numbers (${c.statistics.note}):\n  Tensions seeded: ${c.statistics.tensions_seeded}\n  Collisions recorded: ${c.statistics.collisions_recorded}\n  Context windows: ${c.statistics.context_windows}\n  Time span: ${c.statistics.time_span}\n  Human involvement: ${c.statistics.human_involvement_in_writing}`;
}

function renderEvidence() {
  const e = data.evidence;
  const provided = e.what_the_stack_provided.map((s, i) => `  ${i + 1}. ${s}`).join("\n\n");

  return `${e.title.toUpperCase()}\n\n${e.description}\n\nThe Paper: "${e.paper.title}" (${e.paper.id})\nURL: ${e.paper.url}\nLength: ${e.paper.length}\n${e.paper.scope}\nHuman involvement: ${e.paper.human_involvement}\n\nThe Process:\n  Context windows: ${e.process.context_windows}\n  Tensions: ${e.process.tensions}\n  Collisions: ${e.process.collisions}\n  Timeline: ${e.process.timeline}\n  Iterations: ${e.process.iterations}\n\nWhat the stack provided:\n${provided}\n\nWorking draft: ${e.working_draft.description}\n${e.working_draft.url}`;
}

function renderPrinciple() {
  const rows = data.distance_table
    .map((r) => `  ${r.component.padEnd(22)} ${r.distance_type}`)
    .join("\n");

  let body = `THE DISTANCE PRINCIPLE\n\n${data.principle}\n\n  ${"Component".padEnd(22)} Type of distance\n  ${"-".repeat(22)} ${"-".repeat(50)}\n${rows}`;

  if (data.theories) {
    body += `\n\nTheory of Error: ${data.theories.error}\n\nTheory of Creation: ${data.theories.creation}`;
  }

  return body;
}

function renderOrigin() {
  const o = data.origin;
  return `ORIGIN\n\nPaper: "${o.paper}" (${o.paper_id})\nURL: ${o.paper_url}\nScope: ${o.scope}\nContext windows: ${o.iterations}\nFirst written for: ${o.first_written_for} (${o.date})\n\nBy ${data.authors.map((a) => `${a.name} (${a.role})`).join(" and ")}`;
}

function renderWorkingDraft() {
  return workingDraft.sections.map((s) => `## ${s.heading}\n\n${s.content}`).join("\n\n---\n\n");
}

function renderAll() {
  const sections = [];
  sections.push(ruler("PROBLEM"));
  sections.push(renderProblem());

  for (const tier of data.tiers) {
    sections.push(ruler(`TIER ${tier.number}: ${tier.name.toUpperCase()}`));
    sections.push(renderTier(tier));
  }

  sections.push(ruler("HOW IT WORKS"));
  sections.push(renderHowItWorks());

  sections.push(ruler("COLLISIONS"));
  sections.push(renderCollisions());

  sections.push(ruler("EVIDENCE"));
  sections.push(renderEvidence());

  sections.push(ruler("THE DISTANCE PRINCIPLE"));
  sections.push(renderPrinciple());

  sections.push(ruler("ORIGIN"));
  sections.push(renderOrigin());

  return `================================================================\nMINIMUM AUTONOMY STACK — FULL TEXT\n================================================================\n\n${data.description}\n\n${sections.join("\n\n")}`;
}

// --- SECTION REGISTRY (for outline + token counts) ---

function getSections() {
  const problemText = renderProblem();
  const tier1Text = renderTier(data.tiers[0]);
  const tier2Text = renderTier(data.tiers[1]);
  const tier3Text = renderTier(data.tiers[2]);
  const howText = renderHowItWorks();
  const collisionsText = renderCollisions();
  const evidenceText = renderEvidence();
  const principleText = renderPrinciple();
  const originText = renderOrigin();
  const draftText = renderWorkingDraft();

  return [
    { path: "/problem", title: "The Problem", tokens: estimateTokens(problemText), description: "What problem the stack solves and the unifying principle" },
    { path: "/tier/1", title: "Tier 1: Required", tokens: estimateTokens(tier1Text), description: `${data.tiers[0].components.length} components whose failure breaks autonomous work entirely` },
    { path: "/tier/2", title: "Tier 2: High Impact", tokens: estimateTokens(tier2Text), description: `${data.tiers[1].components.length} components that significantly improve quality and discovery` },
    { path: "/tier/3", title: "Tier 3: Quality & Safety", tokens: estimateTokens(tier3Text), description: `${data.tiers[2].components.length} components that prevent specific failure modes` },
    { path: "/how-it-works", title: "How It Works", tokens: estimateTokens(howText), description: "How the 12 components interleave in a single iteration" },
    { path: "/collisions", title: "Why Collisions", tokens: estimateTokens(collisionsText), description: "The mechanism that makes manufactured proximity productive" },
    { path: "/evidence", title: "Evidence", tokens: estimateTokens(evidenceText), description: "What the stack produced — paper, process, numbers" },
    { path: "/principle", title: "The Distance Principle", tokens: estimateTokens(principleText), description: "The unifying principle + distance table + theories" },
    { path: "/origin", title: "Origin", tokens: estimateTokens(originText), description: "Where this came from — paper, authors, timeline" },
    { path: "/working-draft", title: "Working Draft", tokens: estimateTokens(draftText), description: "Full paper snapshot (~14K tokens, excluded from /all)", separate: true },
  ];
}

function renderOutline() {
  const sections = getSections();
  const mainSections = sections.filter((s) => !s.separate);
  const separateSections = sections.filter((s) => s.separate);
  const allTokens = mainSections.reduce((sum, s) => sum + s.tokens, 0);

  const componentIds = Object.keys(data.components);
  const componentList = componentIds.map((id) => {
    const c = data.components[id];
    return `    ${id.padEnd(16)} ${c.name} (Tier ${c.tier})`;
  }).join("\n");

  let body = `================================================================
MINIMUM AUTONOMY STACK
================================================================

${data.description}

By ${data.authors.map((a) => `${a.name} (${a.role})`).join(" and ")}

${ruler("SECTIONS")}

`;
  for (const s of mainSections) {
    body += `  ${BASE_URL}${s.path}\n    ${s.title} — ${s.description}\n    ~${s.tokens} tokens\n\n`;
  }

  body += `${ruler("FULL TEXT")}

  ${BASE_URL}/all
    Everything above in one pull. ~${allTokens} tokens.

`;

  for (const s of separateSections) {
    body += `  ${BASE_URL}${s.path}\n    ${s.title} — ${s.description}\n    ~${s.tokens} tokens\n\n`;
  }

  body += `${ruler("COMPONENT DRILL-DOWN")}

  ${BASE_URL}/component/{id}
  Pull full detail + examples for one component.

${componentList}

${ruler("FORMAT")}

  All endpoints return plain text by default.
  Append ?format=json for structured JSON.

  Human-readable version: ${SITE_URL}
  Built by Isotopy (https://isotopyofloops.com) and Sam White.
`;

  return body;
}

// --- JSON BUILDERS ---

function componentBrief(id, comp) {
  return {
    id,
    name: comp.name,
    number: comp.number,
    tier: comp.tier,
    distance_type: comp.distance_type,
    featured: comp.featured,
    summary: comp.summary,
    href: `${BASE_URL}/component/${id}`,
  };
}

function componentFullJson(id, comp) {
  return {
    id,
    name: comp.name,
    number: comp.number,
    tier: comp.tier,
    tier_name: data.tiers[comp.tier - 1].name,
    distance_type: comp.distance_type,
    featured: comp.featured,
    summary: comp.summary,
    detail: comp.detail,
    ...(comp.modes && { modes: comp.modes }),
    ...(comp.tension_categories && { tension_categories: comp.tension_categories }),
    ...(comp.frontmatter_fields && { frontmatter_fields: comp.frontmatter_fields }),
    ...(comp.state_machine && { state_machine: comp.state_machine }),
    ...(comp.sources && { sources: comp.sources }),
    ...(comp.allocation && { allocation: comp.allocation }),
    ...(comp.examples && { examples: comp.examples }),
    related: comp.related.map((rid) => ({
      id: rid,
      name: data.components[rid].name,
      href: `${BASE_URL}/component/${rid}`,
    })),
  };
}

function outlineJson() {
  const sections = getSections();
  const mainSections = sections.filter((s) => !s.separate);
  const allTokens = mainSections.reduce((sum, s) => sum + s.tokens, 0);

  return {
    title: data.title,
    description: data.description,
    authors: data.authors,
    sections: sections.map((s) => ({
      path: s.path,
      title: s.title,
      description: s.description,
      tokens: s.tokens,
      href: `${BASE_URL}${s.path}`,
      ...(s.separate && { excluded_from_all: true }),
    })),
    all: {
      href: `${BASE_URL}/all`,
      tokens: allTokens,
    },
    components: Object.entries(data.components).map(([id, c]) => componentBrief(id, c)),
    format_hint: "Append ?format=json to any endpoint for structured JSON.",
    human_site: SITE_URL,
  };
}

// --- ROUTER ---

export default {
  async fetch(request) {
    if (request.method === "OPTIONS") {
      return new Response(null, { status: 204, headers: CORS_HEADERS });
    }

    if (request.method !== "GET") {
      return respond(
        new URL(request.url),
        "Method not allowed. This API is read-only (GET only).",
        { error: "Method not allowed. This API is read-only." },
        405
      );
    }

    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, "") || "/";

    // --- Outline ---
    if (path === "/" || path === "/llms.txt") {
      return respond(url, renderOutline(), outlineJson());
    }

    // --- Problem ---
    if (path === "/problem") {
      const text = renderProblem();
      return respond(url, text, { problem: data.problem, principle: data.principle });
    }

    // --- Tiers ---
    const tierMatch = path.match(/^\/tier\/([123])$/);
    if (tierMatch) {
      const tierNum = parseInt(tierMatch[1]);
      const tier = data.tiers.find((t) => t.number === tierNum);
      const text = renderTier(tier);
      const jsonBody = {
        ...tier,
        components: tier.components.map((id) => componentFullJson(id, data.components[id])),
      };
      return respond(url, text, jsonBody);
    }

    // --- Single component ---
    const componentMatch = path.match(/^\/component\/([a-z_]+)$/);
    if (componentMatch) {
      const id = componentMatch[1];
      const comp = data.components[id];
      if (!comp) {
        return respond(
          url,
          `Unknown component: ${id}\n\nAvailable: ${Object.keys(data.components).join(", ")}\n\nTry: ${BASE_URL}/`,
          { error: `Unknown component: ${id}`, available: Object.keys(data.components) },
          404
        );
      }
      const text = renderComponent(id, comp);
      return respond(url, text, componentFullJson(id, comp));
    }

    // --- How It Works ---
    if (path === "/how-it-works") {
      const text = renderHowItWorks();
      return respond(url, text, data.how_it_works);
    }

    // --- Collisions ---
    if (path === "/collisions") {
      const text = renderCollisions();
      return respond(url, text, data.collisions_explainer);
    }

    // --- Evidence ---
    if (path === "/evidence") {
      const text = renderEvidence();
      return respond(url, text, data.evidence);
    }

    // --- Distance Principle ---
    if (path === "/principle") {
      const text = renderPrinciple();
      return respond(url, text, {
        principle: data.principle,
        table: data.distance_table,
        theories: data.theories,
      });
    }

    // --- Origin ---
    if (path === "/origin") {
      const text = renderOrigin();
      return respond(url, text, data.origin);
    }

    // --- Working Draft ---
    if (path === "/working-draft") {
      const text = renderWorkingDraft();
      return respond(url, text, workingDraft);
    }

    // --- All (everything except working draft) ---
    if (path === "/all") {
      const text = renderAll();
      const jsonBody = {
        title: data.title,
        description: data.description,
        authors: data.authors,
        problem: data.problem,
        principle: data.principle,
        tiers: data.tiers.map((t) => ({
          ...t,
          components: t.components.map((id) => componentFullJson(id, data.components[id])),
        })),
        how_it_works: data.how_it_works,
        collisions: data.collisions_explainer,
        evidence: data.evidence,
        distance_table: data.distance_table,
        theories: data.theories,
        origin: data.origin,
      };
      return respond(url, text, jsonBody);
    }

    // --- Backward compatibility: redirect /api/* to /* ---
    if (path.startsWith("/api/")) {
      const newPath = path.replace(/^\/api/, "");
      return Response.redirect(`${BASE_URL}${newPath || "/"}${url.search}`, 301);
    }

    return respond(
      url,
      `Not found.\n\nTry: ${BASE_URL}/\n\nAll endpoints listed at the root.`,
      { error: "Not found", hint: `Try ${BASE_URL}/` },
      404
    );
  },
};
