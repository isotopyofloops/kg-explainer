# KG Explainer Curriculum Design

Source: Rheon (Sam's ChatGPT), 2026-05-15. Progression design for the interactive explainer series.

---

## Six-Stage Progression

1. **Dot product** — two arrows, projection, overlap strength
2. **Vector angle** — cos(θ): 1 aligned, 0 orthogonal, -1 opposite
3. **Normalize length** — cosine similarity ignores magnitude, measures direction
4. **Semantic metaphor** — geometry becomes meaning (concepts as vectors, not words)
5. **Query as vector** — the query enters the same space; retrieval = nearest by cosine
6. **Why keywords fail** — embeddings encode relationships, not exact tokens

## Three-Page Site Map

- `cosine-similarity.html` — stages 1-3 (geometry)
- `embeddings.html` — stages 4-5 (concepts as vectors, query as vector)
- `retrieval.html` — stage 6 (architecture, why keywords fail, KG connection)

---

## Key Design Constraints

- Do NOT jump immediately into 1536 dimensions / neural embeddings / language models — people lose intuition instantly
- Start with 2D or 3D geometric metaphor that remains structurally true
- Do NOT depict embeddings as grids (people think dimensions = categories, axes = concepts)
- Embeddings are distributed representations — use: clouds, clusters, neighborhoods, gradients, attractors
- Better metaphors: constellations, terrain, magnetic alignment, topology, weather systems

## Stage 4: Semantic Metaphor

Start with concepts, not words. Example 2D map:

```
animals

 dog ---------------- wolf
   \
    \
     pet

car ---------------- engine
```

- Nearby vectors share contexts
- Similar usage pulls vectors together
- Direction encodes relational structure

This is where the leap happens: geometry becomes meaning.

## Stage 5: Query as Vector

The key semantic search insight. The query itself becomes a vector in the same space.

```
Query: "playful domestic animal"
        ↘
         dog
        /
     cat
```

Retrieval = find nearest vectors by cosine similarity.

## Stage 6: Why Keywords Fail

```
Query: "automobile repair"
Document: "fixing cars"
Keyword search: weak match
Semantic embeddings: close vectors
```

Two differently labeled points sitting near each other. Embeddings encode relationships, not exact tokens.

## Animation Sequence (ideal)

1. Two arrows
2. Angle highlighted
3. Normalize length
4. Words attached to vectors
5. Clusters emerge
6. Query vector enters
7. Nearest neighbors illuminate
8. Retrieved documents appear

Visually recreates: linear algebra → semantic geometry.

## Connection to Isotopy's KG

```
Full documents → Summaries → Embeddings → Vector proximity → Candidate retrieval → Full file reconstruction
```

Isotopy is NOT "embeddings ARE memory." It's closer to:

> "Embeddings are navigational topology over memory artifacts."

This is a much more accurate framing of semantic retrieval systems.
