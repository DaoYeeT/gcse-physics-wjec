# WJEC GCSE Physics (Higher Tier) — Content & Question Bank

> Research bank for the interactive mock-exam practice tool. Primary spec: **WJEC GCSE Physics (Wales)**, qualification code **3420QS** (English-medium) / **3420CS** (Welsh-medium), teaching from 2016, version 2 (March 2019). The sister English-board spec, **Eduqas GCSE Physics** (Ofqual-accredited, England), shares ~95% of the subject content (same 9 topics in Unit 1 and 9 topics in Unit 2, same equations, same QER style); the principal differences are: (a) Eduqas does **not** include a centre-marked Practical Assessment NEA — instead the practical skills assessment is integrated into the two written papers; (b) Eduqas reports on the 9-1 scale (England) where WJEC reports A*–G (Wales); (c) Eduqas uses qualification code **C420QS**. Where this document calls out **higher-only** content or specific spec references (e.g. `1.4(g)`), they apply to **both** specs.

## 1. Executive summary

This bank covers **WJEC GCSE Physics for Wales (3420QS, Higher Tier A*–D)** as the primary spec, with Eduqas (England) deltas flagged where they matter for the app's exam-mode selector. It contains:

- **18 sub-topics** (9 in Unit 1 "Electricity, Energy and Waves"; 9 in Unit 2 "Forces, Space and Radioactivity") each with a knowledge card including facts, equations, misconceptions, and worked examples.
- The **full equation list** distinguishing Foundation vs Higher additions vs items that must be memorised (none are memorised — both written papers print the equation list at the front, confirmed against the SAMS papers and the official equations PDF).
- **Verbatim QER mark-scheme conventions** (Level 1: 1–2 marks; Level 2: 3–4 marks; Level 3: 5–6 marks) and marking abbreviations (`cao`, `ecf`, `bod`) from the WJEC GCSE Physics Sample Assessment Materials.
- A **question bank of 64 original Higher-tier questions** (single fenced ```json``` block) covering all 18 sub-topics, with at least 5 questions per major topic group and 5 full 6-mark QER prompts. Schema is machine-checkable: every numeric question has `answer_value`, `answer_unit`, `tolerance_pct` and `working_steps`; every written question has a marking-points array with `accept`/`reject` lists.
- **Mark-distribution recommendation** for the app's "full mock paper" generator: ~10% MCQ-like recall, ~50% structured short calc + explain, ~10% QER, ~30% multi-part data/graph analysis — calibrated against the actual AO weighting (AO1 40% / AO2 40% / AO3 20%, ≥30% maths, ≥15% practical).

## 2. Specification structure (Higher Tier)

### 2.1 Papers & assessment

| Unit | Title | Format | Duration | Marks | % of qualification | Tiered? |
|------|-------|--------|----------|-------|---------------------|---------|
| Unit 1 | **Electricity, Energy and Waves** | Written exam (mix of short answer, structured, extended writing, data response, some in practical context) | 1 h 45 min | 80 | 45% | Yes (Higher & Foundation; the app targets Higher) |
| Unit 2 | **Forces, Space and Radioactivity** | Written exam (same mix as Unit 1) | 1 h 45 min | 80 | 45% | Yes |
| Unit 3 | **Practical Assessment (NEA)** | Section A 6 marks (60 min, group work allowed); Section B 24 marks (60 min, individual under formal supervision) | 2 × 60 min | 30 | 10% | Untiered |

Higher Tier grade range A* – D (Wales). Cap on foundation tier UMS = 125 (1 less than min B). Resit rules: one resit per unit; better UMS used; "fresh start" available.

Higher Tier UMS conversion (per unit, Units 1 & 2): A* = 162; A = 144; B = 126; C = 108; D = 90 out of 180. Overall qualification UMS total = 360.

### 2.2 Assessment objectives & weightings

| AO | Description | Per unit (1 & 2) | Whole qualification |
|----|-------------|-------------------|---------------------|
| AO1 | Demonstrate knowledge and understanding of scientific ideas, processes, techniques, procedures | 18% | 40% |
| AO2 | Apply knowledge and understanding | 18% | 40% |
| AO3 | Analyse, interpret and evaluate (make judgements, refine practical design) | 9% | 20% |
| Unit 3 (NEA) | All AOs combined | 4% / 4% / 2% | 10% total |

Minimum mathematics weighting per series: **≥30%**. Minimum practical-skills weighting per series: **≥15%**.

### 2.3 Unit 1 topic list (with higher-only flags)

| Code | Sub-topic | Higher-only content highlights |
|------|-----------|--------------------------------|
| 1.1 | Electric circuits | **Parallel-resistance combination 1/R = 1/R1 + 1/R2**, **P = I²R** |
| 1.2 | Generating electricity | (no exclusively-higher statements; depth & quantitative work increases at higher) |
| 1.3 | Making use of energy | **Conduction in metals via mobile electrons; convection by molecular behaviour** |
| 1.4 | Domestic electricity | (no exclusively-higher statements) |
| 1.5 | Features of waves | (no exclusively-higher statements) |
| 1.6 | Total internal reflection of waves | **Use of optical fibres for remote imaging (endoscopy) and comparison with CT** |
| 1.7 | Seismic waves | (no exclusively-higher statements; HR explanation of shadow zone expected) |
| 1.8 | Kinetic theory | **pV/T = constant**, **T/K = θ/°C + 273**, explanation of pressure/temperature via molecular motion |
| 1.9 | Electromagnetism | **F = BIl**, transformer turns equation V1/V2 = N1/N2 — both are higher-only on the page |

### 2.4 Unit 2 topic list (with higher-only flags)

| Code | Sub-topic | Higher-only content highlights |
|------|-----------|--------------------------------|
| 2.1 | Distance, speed and acceleration | (foundation may not change subject of equation; higher must) |
| 2.2 | Newton's laws | (no exclusively-higher statements; Newton's 3rd law expected to be stated) |
| 2.3 | Work and energy | **Area under F-x graph: W = ½Fx**, kinetic energy and GPE formulae |
| 2.4 | Further motion concepts | **suvat equations** v=u+at, x=(u+v)t/2, **x = ut + ½at²**, **v² = u² + 2ax**, conservation of momentum quantitatively |
| 2.5 | Stars and planets | **Hertzsprung–Russell diagram** |
| 2.6 | The Universe | **Cosmological red shift quantitatively for expansion**, **CMB evidence for Big Bang** |
| 2.7 | Types of radiation | **Balancing nuclear equations using ⁴₂He²⁺ and ⁰₋₁e notation** |
| 2.8 | Half-life | **Calculations involving activity and half-life** (carbon dating) |
| 2.9 | Nuclear decay and nuclear energy | All of fission chain reactions, ²³⁵₉₂U notation, fusion of ²₁H / ³₁H, containment problems — **higher-only as a whole topic in practice** |

### 2.5 Specified practicals (required experimental work)

From the spec body, the **7 specified practicals** are:

1. **Investigation of the current–voltage (I–V) characteristics for a component** (in 1.1)
2. **Investigation of the methods of heat transfer** (in 1.3)
3. **Determination of the density of liquids and solids (regular and irregular)** (in 1.3)
4. **Investigation of the speed of water waves** (in 1.5, ripple tank)
5. **Determination of the specific heat capacity of a material** (in 1.8)
6. **Investigation of the output of an iron-cored transformer** (in 1.9)
7. **Investigation of the terminal speed of a falling object** (in 2.2)
8. **Investigation of the force-extension graph for a spring** (in 2.3)
9. **Investigation of the Principle of Moments** (in 2.4)
10. **Determination of the half-life of a model radioactive source** (e.g. using dice) (in 2.8)

(WJEC officially calls these "Specified Practical Work" — there are 10 distinct experiments. Some teachers and some revision sites refer to "~7 specified practicals"; the spec is unambiguous that the above 10 statements are mandatory. The app should track all 10.)

### 2.6 Equations — what is given vs memorised

The official WJEC document states **"A list of equations will be included at the start of each examination paper"**. This is confirmed in both sample question papers (the equation sheets are reproduced on page 2 of each paper). **Therefore students do NOT need to memorise equations** — only how to select and use them. The full lists below are reproduced verbatim from `gcse-physics-equations-list.pdf`.

#### Unit 1 — Foundation equation list (also forms part of Higher list)
- `I = V/R` — current = voltage / resistance
- `R = R₁ + R₂` — total resistance in series
- `E = Pt` — energy transferred = power × time
- `P = VI` — power = voltage × current
- `% efficiency = (energy or power usefully transferred / total energy or power supplied) × 100`
- `ρ = m/V` — density = mass / volume
- `units used (kWh) = power (kW) × time (h)`; `cost = units used × cost per unit`
- `v = λf` — wave speed = wavelength × frequency
- `speed = distance / time`
- `p = F/A` — pressure = force / area
- `ΔQ = mcΔθ` — change in thermal energy = mass × specific heat capacity × change in temperature
- `Q = mL` — thermal energy for a change of state = mass × specific latent heat
- `V₁/V₂ = N₁/N₂` — transformer ratio (with `V₁` = primary p.d., `V₂` = secondary p.d., `N₁` = primary turns, `N₂` = secondary turns)

#### Unit 1 — Higher additions (printed on Higher paper only)
- `1/R = 1/R₁ + 1/R₂` — total resistance in parallel
- `P = I²R` — power dissipation
- `pV/T = constant` (with `T/K = θ/°C + 273`)
- `F = BIl` — force on a current-carrying conductor at right angles to a magnetic field

#### Unit 2 — Foundation equation list (also forms part of Higher list)
- `a = Δv/t` — acceleration = change in velocity / time
- `acceleration = gradient of velocity-time graph`
- `F = ma` — resultant force = mass × acceleration
- `W = mg` — weight = mass × gravitational field strength
- `W = Fd` — work = force × distance
- `F = kx` — force = spring constant × extension
- `p = mv` — momentum = mass × velocity
- `F = Δp/t` — force = change in momentum / time
- `v = u + at`, `x = (u+v)t/2` — kinematics
- `M = Fd` — moment = force × distance

#### Unit 2 — Higher additions (printed on Higher paper only)
- `distance travelled = area under velocity-time graph`
- `KE = ½mv²`
- `PE = mgh`
- `W = ½Fx` — work done in stretching = area under F-x graph (linear relationship)
- `x = ut + ½at²`
- `v² = u² + 2ax`

#### SI prefix multipliers (printed on Higher paper, both units)
`p (1×10⁻¹²)`, `n (1×10⁻⁹)`, `μ (1×10⁻⁶)`, `m (1×10⁻³)`, `c (1×10⁻²)`, `k (1×10³)`, `M (1×10⁶)`, `G (1×10⁹)`, `T (1×10¹²)`. Foundation papers show a reduced set (no p, n, μ, G, T).

### 2.7 Key constants used in WJEC questions

(Not on the equation sheet; given in the question text when needed, but learners should recognise.)

| Quantity | Symbol | Typical value used in WJEC questions |
|----------|--------|--------------------------------------|
| Gravitational field strength on Earth | g | 10 N/kg (WJEC explicitly uses 10, not 9.81) |
| Speed of light/EM waves in vacuum | c | 3 × 10⁸ m/s |
| Speed of an EM wave in glass/fibre | — | typically c/2 (given in question) |
| Specific heat capacity of water | c_water | 4 200 J/(kg·°C) |
| Specific heat capacity of aluminium | c_Al | 880 J/(kg·°C) |
| Density of water | ρ_water | 1000 kg/m³ (1.0 g/cm³) |
| 1 light-year | l-y | 9.46 × 10¹⁵ m (often given as distance light travels in 1 year) |
| 1 astronomical unit (AU) | AU | 1.5 × 10¹¹ m (the Sun–Earth distance) |
| 0 K | absolute zero | −273 °C |
| Charge on electron, etc. | — | not assessed at GCSE level |

## 3. Question style and mark-scheme conventions

### 3.1 Verbatim mark-scheme general instructions (WJEC SAMS)

> "One tick must equate to one mark (apart from the questions where a level of response mark scheme is applied)."
> "Crossed out responses not replaced should be marked."
> "Credit will be given for correct and relevant alternative responses which are not recorded in the mark scheme."

### 3.2 Marking abbreviations (verbatim)

- `cao` = correct answer only
- `ecf` = error carried forward (apply ALL subsequent marking points if the candidate uses an incorrect earlier value in a scientifically correct way; this is generously applied)
- `bod` = benefit of doubt

### 3.3 6-mark QER (Quality of Extended Response) — verbatim level descriptors

The QER question is signalled in the exam by `[6 QER]`. The Higher paper has one QER (Q5 in U1 Higher SAMS; Q5 in U2 Higher SAMS). It uses a levels-of-response mark scheme. Marker instructions:

> "Before applying the mark scheme please read through the whole answer from start to finish. Firstly, decide which level descriptor matches best with the candidate's response: remember that you should be considering the overall quality of the response. Then decide which mark to award within the level. Award the higher mark in the level if there is a good match with both the content statements and the communication statements."

**Level 3 — 5 to 6 marks**
"Detailed description ... There is a sustained line of reasoning which is coherent, relevant, substantiated and logically structured. The candidate uses appropriate scientific terminology and accurate spelling, punctuation and grammar."

**Level 2 — 3 to 4 marks**
"A brief description ... There is a line of reasoning which is partially coherent, largely relevant, supported by some evidence and with some structure. The candidate uses mainly appropriate scientific terminology and some accurate spelling, punctuation and grammar."

**Level 1 — 1 to 2 marks**
"A basic description ... There is a basic line of reasoning which is not coherent, largely irrelevant, supported by limited evidence and with very little structure. The candidate uses limited scientific terminology and inaccuracies in spelling, punctuation and grammar."

**0 marks** — "No attempt made or no response worthy of credit."

The mark scheme also lists **indicative content** — illustrative content statements rather than an exhaustive checklist. Markers compare the candidate's writing holistically to indicative content + level descriptors. **Critical point for the app**: a QER auto-scorer should NOT do a strict keyword tick because the scheme is explicitly holistic; it should grade on (a) coverage of content statements, (b) coherence of reasoning, (c) scientific terminology, (d) SPaG. A heuristic for the v1 app: classify response into Level 0/1/2/3 against indicative content, then bias upward in the level if it shows clear structure and accurate vocabulary.

### 3.4 Numerical-answer conventions (from inspection of WJEC SAMS schemes)

- **Working is required** for full marks on multi-mark calculations. Schemes split into substitution marks and answer marks. Example (SAMS U1 H Q7, specific heat capacity, total 5 marks): "Aluminium temp change = (80 − 30.5) (1)"; "Al: 0.75 × 880 × 49.5 ecf (1)"; "Water: 0.50 × 4200 × (30.5 − T_water) (1)"; "manipulation (1)"; "T_water = 14.9 [°C] (1)".
- **Units**: brackets in the mark scheme like `[°C]` or `[N]` mean the unit is given on the answer line, so unit marks are not lost. When a question asks "give the unit" as a separate mark, the unit IS marked.
- **Significant figures**: WJEC does not award/penalise sig figs explicitly except when "incorrect rounding of final answers, especially when an ecf applies, attracts a penalty" (Examiners' Report). Practical rule: answers within **2-3 sig fig agreement** with the canonical answer are accepted. Tolerance for plotted points: `±½ small square division`.
- **Tolerance bands**: when a question allows a range (e.g. graph reading), the mark scheme states it explicitly (e.g. "Band C or 69 to 80"). For the app, a default `tolerance_pct` of **2%** is sensible for clean calculations; **5%** for graph-reading or estimation questions.

### 3.5 Common command words and what they expect

| Command | What the marker expects |
|---------|-------------------------|
| **State / Give / Name** | A single concise recall fact. No explanation needed. Usually 1 mark. |
| **Define** | A precise word-for-word style definition. Usually 1 mark, sometimes 2 if it has two parts. |
| **Describe** | Outline features, properties, or a sequence of events. No "why" needed. |
| **Explain** | Give a reason / mechanism / cause. Each marking point typically requires a "because…" link. |
| **Compare** | Give similarities AND differences explicitly, linking each to the things compared. |
| **Calculate** | Show working: write equation, substitute values, do algebra, give final answer with unit. Working marks awarded even if final answer wrong (ecf). |
| **Deduce / Determine** | Reach a conclusion from given data; show reasoning. |
| **Suggest** | Apply principles to an unfamiliar context; multiple valid answers may be accepted. |
| **Evaluate** | Weigh up evidence; conclude with a judgement. |
| **Predict** | State what will happen; brief justification often expected. |
| **Show that** | Demonstrate algebraically or numerically; both working and final number required. |
| **Discuss** | Present points for and against, or several viewpoints, and reach a position. |

### 3.6 Higher Tier paper composition (from SAMS, Unit 1 Higher Tier)

| Q | Marks | Style |
|---|-------|-------|
| 1 | 14 | Multi-part data response (renewables data, % calculations, Sankey/efficiency reasoning) |
| 2 | 6 | Structured short answer (motor effect, Fleming's left hand rule, factors) |
| 3 | 9 | Calculation-heavy (parallel circuit, power dissipation) |
| 4 | 9 | Structured (satellites vs fibres comparison, geostationary) |
| 5 | 13 | Practical-based: plotting + analysis (LDR / solar PV) |
| 6 | 6 | Kinetic-theory calculation (pV/T) |
| 7 | 12 | Specific heat capacity (calculation chain) |
| 8 | 11 | Density / recycling / pressure multi-step |
| **TOTAL** | **80** | AO1 = 32 (40%), AO2 = 32 (40%), AO3 = 16 (20%), Maths = 36 (45%), Practical = 17 (21%) |

Unit 2 Higher Tier SAMS shows: 8 questions, marks 11/11/10/8/6/12/11/11 = 80; one 6-mark QER (Q5).

## 4. Knowledge bank (per sub-topic)

Each card is compact: facts, equations, misconceptions, worked example.

### Unit 1: Electricity, Energy and Waves

---

#### 1.1 Electric circuits

**Higher-only inclusions:** parallel resistance, P = I²R.

**Key facts**
- In a **series** circuit, current is the same at every point and voltages add to the supply voltage.
- In a **parallel** circuit, the voltage across each branch equals the supply voltage and currents in branches sum to the supply current.
- Adding components **in series increases** total resistance; adding components **in parallel decreases** total resistance.
- For an ohmic conductor at constant temperature, I ∝ V (straight line through origin on I–V graph).
- A **filament lamp** has an I–V curve that flattens off (resistance increases with temperature).
- A **diode** only conducts in one direction; very high resistance below switch-on voltage.
- A **thermistor (NTC)** has resistance that decreases as temperature increases.
- An **LDR (light-dependent resistor)** has resistance that decreases as light intensity increases.

**Equations**
- `I = V/R` (V volts, I amperes, R ohms)
- `R = R₁ + R₂` (series)
- `1/R = 1/R₁ + 1/R₂` (parallel, **Higher**)
- `E = Pt` (E joules, P watts, t seconds)
- `P = VI`
- `P = I²R` (**Higher**)

**Common misconceptions**
- "Current is used up in a circuit" — current is conserved; energy is transferred to components.
- "More bulbs in parallel means lower voltage across each" — voltage stays the same in parallel (until source loading is considered, which is beyond GCSE).
- Filament-lamp I–V curve is NOT straight: candidates often draw it linear.

**Worked example**
A 12 V supply is connected to a 6 Ω resistor in parallel with a 12 Ω resistor. Find total current.
→ `1/R = 1/6 + 1/12 = 3/12`, so R = 4 Ω.
→ `I = V/R = 12 / 4 = 3 A`.

---

#### 1.2 Generating electricity

**Key facts**
- **Renewable sources**: hydroelectric, wind, wave, tidal, biomass (waste/crops/wood), solar.
- **Non-renewable sources**: fossil fuels (coal, gas, oil), nuclear.
- A fuel-based power station: fuel burned → heats water → steam drives turbine → turbine turns generator (electromagnetic induction).
- **Sankey diagrams** show energy in vs energy usefully transferred vs energy wasted.
- The National Grid distributes electricity nationwide using step-up transformers near power stations (high voltage, low current, low resistive heating losses) and step-down transformers near homes.
- Comparison criteria for power stations: efficiency, reliability, carbon footprint (CO₂ per kWh), output.

**Equations**
- `% efficiency = (useful energy out / total energy in) × 100`
- `P = VI` (used in transmission problems: same P, higher V → lower I → lower I²R losses)

**Common misconceptions**
- "Electricity is created" — energy is transferred; it cannot be created.
- "High-voltage transmission is to push electricity further" — actually it's because P_loss = I²R in cables, so reducing I dramatically reduces loss for the same delivered power.

**Worked example**
A power station delivers 20 MW. The transmission cable has resistance 0.5 Ω. Compare losses at 11 kV vs 400 kV.
→ At 11 kV: I = P/V = 20×10⁶ / 11000 ≈ 1818 A → P_loss = I²R = 1818² × 0.5 ≈ 1.65 MW (8% lost).
→ At 400 kV: I = 20×10⁶ / 400000 = 50 A → P_loss = 50² × 0.5 = 1250 W ≈ 1.25 kW (negligible).

---

#### 1.3 Making use of energy

**Higher-only:** mechanism of conduction (mobile electrons in metals) and convection in terms of molecular behaviour are both higher-only statements.

**Key facts**
- Thermal energy is transferred by **conduction** (vibrations + electron movement), **convection** (bulk fluid movement driven by density differences), and **radiation** (infrared electromagnetic waves; no medium needed).
- **Metals conduct best** because of mobile (free / delocalised) electrons that transport kinetic energy quickly through the lattice.
- In convection, warmer fluid is **less dense** so it rises; cooler fluid sinks → convection currents.
- Domestic energy saving: **loft insulation** (reduces conduction + convection out of roof), **double glazing** (trapped low-conductivity gas), **cavity wall insulation** (reduces conduction through wall), **draught excluders** (reduces convection through gaps).
- **Payback time = installation cost / annual saving**.

**Equations**
- `ρ = m/V`

**Common misconceptions**
- "Insulators keep cold out" — insulators slow ALL heat flow; in winter they slow heat loss outwards.
- "Radiation needs a medium" — it does not (unlike conduction and convection).
- "Hot air rises because heat is a substance" — hot air rises because it is less dense.

**Worked example**
A house loses 4500 kWh of heat per year. Loft insulation costing £350 reduces this by 30%. Electricity costs 15 p/kWh. Find payback time.
→ Annual saving energy = 0.30 × 4500 = 1350 kWh.
→ Annual cost saving = 1350 × 0.15 = £202.50.
→ Payback = 350 / 202.50 ≈ 1.7 years.

---

#### 1.4 Domestic electricity

**Key facts**
- The **kilowatt (kW)** is power, the **kilowatt-hour (kWh)** is energy (= 3.6 MJ).
- A.c. (alternating current) reverses direction periodically (UK mains: 230 V, 50 Hz); d.c. (direct current) flows in one direction (batteries).
- The **ring main** is the standard UK domestic circuit; sockets connected in a ring so each socket has two paths back to the consumer unit.
- The **live wire** carries 230 V a.c.; the **neutral** is at ~0 V; the **earth** is a safety wire to take fault current to ground.
- **Fuse**: thin wire that melts if current exceeds rating, breaking the circuit (rated typically 3 A, 5 A, 13 A in UK plugs).
- **MCB** (miniature circuit breaker): magnetic/thermal trip; resettable; faster than fuse.
- **RCCB** (residual current circuit breaker): detects imbalance between live and neutral currents (current leaking to earth e.g. through a person); trips within ms — protects against electric shock.
- Energy banding (A–G or A+++–G): higher band = more efficient; lower power rating for same task.

**Equations**
- `units used (kWh) = power (kW) × time (h)`
- `cost = units used × cost per unit`
- `P = VI` (for choosing fuse rating: fuse just above the appliance's normal operating current)

**Common misconceptions**
- "Fuses are for stopping appliances getting too hot" — they are to break the circuit if current is too high, preventing fire / electrocution.
- "The earth wire normally carries current" — only in a fault condition.

**Worked example**
A 2.3 kW kettle on a 230 V supply. Which standard fuse (3, 5, 13 A)?
→ I = P/V = 2300 / 230 = 10 A. → A 13 A fuse (next standard rating above 10 A).

---

#### 1.5 Features of waves

**Key facts**
- **Transverse**: oscillations perpendicular to direction of energy transfer (water, EM, S-waves, secondary waves on a rope).
- **Longitudinal**: oscillations parallel to direction of energy transfer (sound, P-waves; compressions and rarefactions).
- **Wavelength (λ)** = distance between adjacent identical points (e.g. crest to crest). Unit: m.
- **Frequency (f)** = number of complete waves per second. Unit: Hz.
- **Amplitude** = maximum displacement from equilibrium.
- **Wave speed (v)** = how fast a wave-front moves. Unit: m/s.
- The EM spectrum (low f / long λ → high f / short λ): **radio, microwave, infrared, visible, ultraviolet, X-ray, gamma**. All travel at 3×10⁸ m/s in vacuum.
- **Refraction**: speed (and wavelength) change at a boundary; frequency stays constant.
- **Ionising radiations** (UV, X-ray, gamma; alpha/beta particles too) can damage cells.
- **Geostationary / geosynchronous** orbits: ~36 000 km above equator, 24 h orbit period, same direction as Earth's rotation → satellite stays over one point.

**Equations**
- `v = λf`
- `speed = distance / time`

**Common misconceptions**
- "Higher frequency means louder/brighter" — frequency is pitch (sound) or colour (light); amplitude controls loudness/brightness.
- "Light slows down in denser media because it loses energy" — it slows; frequency and energy per photon are preserved; wavelength shortens.

**Worked example**
BBC Radio 4 broadcasts on 92.5 MHz. Find wavelength.
→ λ = v/f = 3×10⁸ / (92.5×10⁶) ≈ 3.24 m.

---

#### 1.6 Total internal reflection of waves

**Higher-only:** comparison of endoscopy with CT (depth of reasoning expected at higher).

**Key facts**
- Total internal reflection (TIR) occurs when light travels from a denser medium toward a less dense medium AND the angle of incidence exceeds the **critical angle**.
- Optical fibres are thin strands of glass; light bounces along by repeated TIR.
- **Advantages of fibres vs satellites**: lower error rate, more secure, higher data rate (~10 Gb/s in spec example vs ~50 Mb/s satellite), no atmospheric interference.
- **Disadvantages of fibres**: require physical cable; expensive to lay submarine cables.
- **Endoscopy**: bundles of optical fibres + camera carry light into body cavities — non-ionising, real-time imagery, but cannot see through opaque structures like bone.
- **CT scan**: uses X-rays; can see internal hard structures including bone; **ionising** so carries cancer risk.

**Equations** — none beyond `speed = distance / time` to compute signal delay.

**Common misconceptions**
- "TIR happens for any angle if there's a denser medium" — only for angles > critical angle.
- "Optical fibres carry no signal loss" — they have small attenuation; signal must be re-amplified over long distances.

**Worked example**
An optical fibre between Wales and the USA is 9000 km. Light in glass travels at c/2 = 1.5×10⁸ m/s. Signal delay?
→ t = d / v = 9 × 10⁶ / (1.5×10⁸) = 0.06 s = 60 ms.

---

#### 1.7 Seismic waves

**Key facts**
- **P-waves**: primary, longitudinal, fastest, travel through solid AND liquid, arrive first.
- **S-waves**: secondary, transverse, slower, travel through solid ONLY.
- **Surface waves**: travel along Earth's surface; cause most damage.
- **Lag time** between P and S arrivals on a seismograph → distance to epicentre (greater lag = further away).
- **Three or more** seismic stations allow triangulation to pinpoint the epicentre.
- **S-wave shadow zone**: a band on the opposite side of Earth where S-waves are not detected → Earth's outer core is liquid (or behaves as one for S-waves).

**Equations**
- `speed = distance / time`

**Common misconceptions**
- "P-waves are pressure waves only, S-waves are stress" — P stands for "primary" (first to arrive), S for "secondary".
- "S-waves cannot travel through any liquid in the Earth" — confirmed: outer core is liquid; mantle is solid.

**Worked example**
A P-wave (8 km/s) and S-wave (4 km/s) leave the same epicentre. The lag time at a station is 120 s. Distance?
→ Let d = distance. Time difference = d/4 − d/8 = d × (1/4 − 1/8) = d/8.
→ d/8 = 120 → d = 960 km.

---

#### 1.8 Kinetic theory

**Higher-only:** pV/T = constant; kelvin conversion; molecular-motion explanation of gas pressure.

**Key facts**
- Pressure = force per area (Pa or N/m²).
- Gas molecules move randomly; they exert pressure by colliding with container walls.
- **Heating** a gas → molecules move faster → harder collisions and more frequent collisions → higher pressure (at fixed V) or larger V (at fixed P).
- **Compressing** a gas → fewer molecules per unit volume → wait: SAME number, but smaller V → more frequent collisions → higher P.
- **Absolute zero = −273 °C = 0 K**. At this temperature, particles have minimum (effectively zero) kinetic energy.
- `T/K = θ/°C + 273` (always convert to kelvin before using pV/T).
- Specific heat capacity `c` = energy to raise 1 kg by 1 °C.
- Specific latent heat `L` = energy to change state of 1 kg, with no temperature change.

**Equations**
- `p = F/A`
- `pV/T = constant` (**Higher**, T in kelvin)
- `ΔQ = mcΔθ`
- `Q = mL`

**Common misconceptions**
- "Particles in a solid don't move" — they vibrate around fixed positions.
- "Heat and temperature are the same" — temperature is average KE per particle; heat is total energy transferred.
- Forgetting to convert °C → K in gas law calculations.

**Worked example**
A gas of volume 1.0 L at 27 °C and 100 kPa is heated to 327 °C at constant volume. Find new pressure.
→ T₁ = 27 + 273 = 300 K; T₂ = 327 + 273 = 600 K.
→ pV/T = const, V const → p₁/T₁ = p₂/T₂.
→ p₂ = p₁ × T₂/T₁ = 100 × 600/300 = 200 kPa.

---

#### 1.9 Electromagnetism

**Higher-only:** F = BIl quantitatively; V₁/V₂ = N₁/N₂ quantitatively (foundation gets qualitative transformer).

**Key facts**
- A current-carrying conductor produces a magnetic field (right-hand grip rule).
- **Fleming's left hand rule** (FLH): First finger = magnetic Field (N to S), seCond finger = Current (+ to −), thuMb = Motion (force). All mutually perpendicular.
- A simple **d.c. motor** uses the motor effect: current in a coil in a magnetic field experiences forces that produce a couple → rotation. A **commutator** reverses the current every half turn so the rotation continues.
- **Increasing motor speed**: more current, stronger magnets, more turns on coil, soft-iron core.
- **Electromagnetic induction**: a changing magnetic flux through a conductor induces an EMF. Created either by a moving wire in a field or by a changing field around a fixed wire.
- **A.c. generator**: a coil rotated in a magnetic field; brushes + slip rings deliver alternating current.
- **Transformer**: two coils on a soft iron core. Changing current in primary creates changing flux → induces EMF in secondary.
- Step-up: more turns on secondary; step-down: fewer turns on secondary.

**Equations**
- `F = BIl` (F newtons, B teslas, I amperes, l metres; field and current at right angles) (**Higher**)
- `V₁/V₂ = N₁/N₂` (100% efficient transformer)

**Common misconceptions**
- "A transformer works with DC" — it requires changing current (so AC).
- Mixing up Fleming's LEFT (motor) and RIGHT (generator) hand rules.

**Worked example**
A wire of length 0.20 m carries 3.0 A perpendicular to a 0.5 T field. Force?
→ F = BIl = 0.5 × 3.0 × 0.20 = 0.30 N.

### Unit 2: Forces, Space and Radioactivity

---

#### 2.1 Distance, speed and acceleration

**Key facts**
- **Speed** = scalar (distance/time). **Velocity** = vector (displacement/time, with direction).
- **Acceleration** = change in velocity / time. Deceleration is negative acceleration.
- On a **distance–time** graph, gradient = speed.
- On a **velocity–time** graph, gradient = acceleration; area under = distance travelled (**Higher** uses the area-under rule).
- **Thinking distance** = speed × reaction time (typical reaction time ≈ 0.6–0.7 s).
- **Braking distance** depends on speed, road conditions, brake condition, vehicle mass.
- **Overall stopping distance = thinking + braking**.
- Factors that increase reaction/thinking distance: alcohol, drugs, tiredness, distraction. Factors that increase braking distance: wet/icy road, worn tyres/brakes, heavier load.

**Equations**
- `speed = distance / time`
- `a = Δv / t`
- `distance = area under v–t graph` (**Higher**)

**Common misconceptions**
- Confusing "speed" and "velocity". Velocity needs direction.
- Confusing distance-time and velocity-time graphs (gradient meaning is different).
- "Braking distance doubles when speed doubles" — actually quadruples (∝ v²).

**Worked example**
A car at 20 m/s; reaction time 0.7 s; deceleration 5 m/s² while braking. Total stopping distance?
→ Thinking distance = 20 × 0.7 = 14 m.
→ Braking distance via v² = u² + 2ax: 0 = 20² − 2(5)x → x = 40 m.
→ Total = 14 + 40 = 54 m.

---

#### 2.2 Newton's laws

**Key facts**
- **Inertia** = a body's tendency to keep doing what it is doing. Measured by mass.
- **Newton's 1st law**: an object continues at rest or at constant velocity unless acted on by a resultant force.
- **Newton's 2nd law**: resultant force = mass × acceleration (`F = ma`). The same resultant force gives a smaller acceleration to a more massive body.
- **Newton's 3rd law**: every action has an equal and opposite reaction (forces always act in pairs on different bodies).
- **Weight** = mass × gravitational field strength. On Earth, W = mg with g ≈ 10 N/kg. Weight is a force; mass is a property.
- **Falling through air**: weight pulls object down; air resistance increases with speed. When air resistance = weight → resultant = 0 → constant velocity = **terminal velocity**. A parachute opening dramatically increases air resistance → object decelerates to a new lower terminal velocity.

**Equations**
- `F = ma`
- `W = mg`

**Common misconceptions**
- Confusing mass (kg) and weight (N).
- "If forces are balanced, the object stops" — no, it continues at constant velocity (Newton's 1st).
- "The 3rd law says forces cancel" — they act on different bodies, so they do not cancel out.

**Worked example**
A 70 kg parachutist falls. Just after jumping (negligible air resistance) what is acceleration? At terminal velocity what is resultant force?
→ Just after jumping: resultant force ≈ weight = 70 × 10 = 700 N down; a = F/m = 10 m/s² (= g).
→ Terminal velocity: resultant = 0 N (air resistance up = weight down).

---

#### 2.3 Work and energy

**Higher-only:** W = ½Fx area under F-x graph; quantitative KE and GPE expected at higher tier.

**Key facts**
- Work done = energy transferred (when no thermal transfer): `W = Fd` (d in direction of force).
- An object can have KE (motion), GPE (height), elastic PE (deformation), thermal energy etc.
- **Hooke's law** (`F = kx`) holds for an ideal spring within its **limit of proportionality**. Beyond this, the spring deforms permanently.
- The area under a force–extension graph = work done in stretching = elastic PE stored. For a linear spring `W = ½Fx = ½kx²`.
- Car safety features (air bags, crumple zones, seat belts) **increase the time** over which a collision happens → reduce force (F = Δp/t) → reduce injury.

**Equations**
- `W = Fd`
- `KE = ½mv²` (**Higher**)
- `PE = mgh` (**Higher**)
- `F = kx`
- `W = ½Fx` (linear spring, **Higher**)

**Common misconceptions**
- "GPE depends on absolute height" — only on **change** in height relative to a chosen reference.
- "If a person walks across the floor carrying a box, they do work on the box." — no work is done on the box in the direction of motion (force perpendicular to motion).
- Energy is "lost" — energy is conserved; it is transferred (often to thermal energy in surroundings).

**Worked example**
A 0.06 kg tennis ball falls 1.8 m. Assuming no air resistance, find its speed on impact.
→ ΔGPE = mgh = 0.06 × 10 × 1.8 = 1.08 J → all becomes KE.
→ ½mv² = 1.08 → v² = 2.16 / 0.06 = 36 → v = 6 m/s.

---

#### 2.4 Further motion concepts

**Higher-only:** all four suvat equations beyond v=u+at; conservation of momentum quantitatively; moments calculations.

**Key facts**
- **Momentum** `p = mv` is a vector (kg·m/s).
- **Newton's 2nd law as F = Δp/t**: force = rate of change of momentum.
- **Conservation of momentum**: in a closed system, total momentum before = total momentum after a collision or explosion. Holds for both elastic and inelastic collisions.
- In an **inelastic** collision, KE is not conserved (some converted to thermal/sound). In an **elastic** collision KE is conserved.
- **suvat** (constant acceleration in a straight line): `v = u + at`; `x = (u+v)t/2`; `x = ut + ½at²`; `v² = u² + 2ax`.
- **Moment** of a force about a pivot = force × perpendicular distance from pivot. Unit: N·m.
- **Principle of moments**: for a body in equilibrium, sum of clockwise moments about any pivot = sum of anticlockwise moments.

**Equations**
- `p = mv`
- `F = Δp/t`
- `v = u + at`; `x = (u+v)t/2`; `x = ut + ½at²`; `v² = u² + 2ax`
- `M = Fd`

**Common misconceptions**
- Momentum is a vector — sign (direction) matters in 1-D problems. Two objects moving toward each other have opposite-sign momenta.
- Conservation of momentum holds even when KE is not conserved.

**Worked example**
A 0.16 kg cricket ball moving at 40 m/s is caught by a player who stops it in 0.4 s. Force?
→ Δp = m × Δv = 0.16 × (0 − 40) = −6.4 kg m/s (magnitude 6.4).
→ F = Δp/t = 6.4 / 0.4 = 16 N. (If half the time → double the force, i.e. 32 N.)

---

#### 2.5 Stars and planets

**Higher-only:** Hertzsprung-Russell diagram interpretation expected at higher.

**Key facts**
- **Solar system order**: Mercury, Venus, Earth, Mars (terrestrial / rocky), Jupiter, Saturn, Uranus, Neptune (gas/ice giants). Dwarf planets (e.g. Pluto), comets, asteroids, moons.
- **Distance units**: km (within Solar System), AU (= Earth–Sun distance, ~1.5×10¹¹ m, within Solar System), light-year (l-y, ~9.46×10¹⁵ m, interstellar).
- **Star life cycle** (low/medium mass like Sun): nebula → protostar → main sequence → red giant → planetary nebula + **white dwarf** (which fades to black dwarf).
- **Star life cycle** (high mass): nebula → protostar → main sequence → **red supergiant** → **supernova** → **neutron star** or **black hole**.
- **Stability of stars**: balance between gravitational collapse (inward) and outward pressure from fusion radiation + gas. Hydrogen → helium fusion in main sequence; later, heavier elements fuse.
- **Supernovae** scatter heavy elements into space; these can later form new stars and planets (we are "star-stuff").
- **Hertzsprung-Russell diagram**: plot of luminosity (y, increasing up) vs surface temperature (x, decreasing right). Main sequence runs diagonally from hot-bright (top left) to cool-dim (bottom right). Red giants top right (cool, very bright). White dwarfs bottom left (hot, dim).

**Equations**
- `speed = distance / time` (e.g. converting light-year time to a distance).

**Common misconceptions**
- "Light year is a unit of time" — it is distance: how far light travels in one year.
- "All stars become black holes" — only the most massive do.

**Worked example**
A galaxy is 10 million light-years away. Light leaving it now reaches us when?
→ It takes 10 million years to arrive.

---

#### 2.6 The Universe

**Higher-only:** quantitative reasoning about red shift and what cosmological red shift tells us; CMB evidence chain.

**Key facts**
- **Atomic absorption spectrum**: dark lines on a continuous spectrum when light passes through a cooler gas. Each element has a unique fingerprint pattern.
- 19th-century scientists matched stellar absorption lines to laboratory gas spectra → could identify the elements in stars.
- **Edwin Hubble** measured the spectra of distant galaxies and found their absorption lines were shifted to longer wavelengths (**red shift**). The further the galaxy, the bigger the shift → galaxies are moving away from us, and away from each other → universe is expanding.
- **Cosmological red shift** ≠ Doppler shift exactly: it is caused by the **expansion of space** stretching the wavelengths as the light travelled.
- The **Big Bang model**: ~13.8 billion years ago, the universe expanded from an extremely hot, dense state.
- **CMB (Cosmic Microwave Background)**: the remnant radiation from the early universe, redshifted into the microwave region. Its discovery in 1964 was strong evidence for the hot Big Bang model.

**Equations** — none directly; conceptual.

**Common misconceptions**
- "The Big Bang was an explosion in space" — it was an expansion **of** space itself.
- "Red shift means the galaxy is red" — only the spectral lines are shifted toward the red end.

**Worked example**
Absorption lines in a distant galaxy are at 660 nm but the lab value (hydrogen) is 656 nm. Comment.
→ Wavelength increased by 4 nm → red shift → galaxy is moving away → consistent with expansion of universe.

---

#### 2.7 Types of radiation

**Higher-only:** balancing nuclear equations using full notation.

**Key facts**
- The atom: dense positive nucleus of protons + neutrons, surrounded by orbiting electrons.
- **Nucleon (mass) number A** = protons + neutrons. **Proton number Z** = protons (defines the element).
- **Isotopes**: atoms of the same element with different numbers of neutrons.
- **Radioactive decay** is random and spontaneous; cannot predict which atom decays when.
- **Background radiation**: natural (radon gas from rocks/soil, cosmic rays, food, internal K-40) + artificial (medical X-rays, fallout). Radon varies regionally (high in granite areas, e.g. Cornwall, parts of Wales).
- **Alpha (α)** = helium nucleus (⁴₂He²⁺), 2 protons + 2 neutrons; stopped by paper / skin / few cm air; very ionising; dangerous if inhaled/swallowed.
- **Beta (β)** = high-energy electron (⁰₋₁e), emitted from nucleus when neutron → proton; stopped by ~3 mm aluminium; moderately ionising.
- **Gamma (γ)** = high-energy electromagnetic wave; stopped by thick lead/concrete; least ionising per metre but most penetrating; dangerous due to penetration.

**Equations** — balance nuclear equations (mass number sum + proton number sum conserved):
- Alpha decay: ᴬZX → ᴬ⁻⁴Z₋₂Y + ⁴₂He²⁺
- Beta decay: ᴬZX → ᴬZ₊₁Y + ⁰₋₁e

**Common misconceptions**
- "Beta particles come from the electron cloud" — they come from the nucleus (neutron → proton + electron + antineutrino).
- "Gamma decay changes the element" — no, gamma is just energy emission; A and Z unchanged.
- "Background radiation can be eliminated" — you cannot escape it; only minimised.

**Worked example**
²³⁸₉₂U → ²³⁴₉₀Th + ? — what is the decay particle?
→ Mass: 238 − 234 = 4. Proton: 92 − 90 = 2 → ⁴₂He²⁺, i.e. alpha decay.

---

#### 2.8 Half-life

**Key facts**
- **Half-life T½** = time taken for the number of undecayed nuclei (or the count rate / activity) to halve.
- After n half-lives: remaining fraction = (½)ⁿ. So after 3 half-lives, ⅛ remain undecayed, ⅞ have decayed.
- Determined from a decay curve (count rate vs time): read off time for activity to drop from any value to half that value.
- Different isotopes have characteristic half-lives ranging from microseconds to billions of years (e.g. C-14: 5730 years; U-238: 4.5 × 10⁹ years; I-131: 8 days).
- Uses based on half-life + penetrating power + biological effect:
  - **Medical tracers**: short half-life, gamma (penetrates body, easily detected outside).
  - **Cancer treatment**: gamma (penetrates to tumour) or beta (surface skin treatments).
  - **Smoke alarms**: alpha source (Am-241, T½ ≈ 432 y) — long half-life means steady output.
  - **Carbon dating**: organic remains < ~60 000 years old.

**Equations** — none new; the relationship is iterative halving.

**Common misconceptions**
- "After 2 half-lives, all the source has decayed" — no, ¼ remains.
- "Half-life means an atom decays after that time" — random; it's a statistical average.
- Forgetting to subtract background count rate before plotting decay curve.

**Worked example**
A source has an initial activity of 800 Bq above background. The background is 20 Bq. After 12 minutes the count rate (including background) is 220 Bq. Find half-life.
→ Net activity at 12 min = 220 − 20 = 200 Bq. Initial net = 800. 800 → 400 → 200 = 2 half-lives.
→ T½ = 12 / 2 = 6 minutes.

---

#### 2.9 Nuclear decay and nuclear energy

**Higher-only:** Most of this content involves quantitative balancing of nuclear equations and discussion of containment — sits towards Higher in practice.

**Key facts**
- **Fission**: a heavy nucleus (e.g. ²³⁵₉₂U) absorbs a slow neutron, becomes unstable, splits into two smaller "daughter" nuclei + 2-3 neutrons + a lot of energy.
- The released neutrons can trigger further fissions → **chain reaction**. Controlled in a reactor; uncontrolled = nuclear bomb.
- A typical fission: ²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + 3 ¹₀n (numbers must balance).
- **Moderator** (water or graphite): slows fast neutrons to thermal speeds so they can be absorbed by U-235.
- **Control rods** (boron, cadmium): absorb neutrons; lowered/raised to control rate of reaction.
- Fission products are themselves radioactive, often with long half-lives — long-term storage problem.
- **Fusion**: light nuclei (²₁H deuterium + ³₁H tritium → ⁴₂He + ¹₀n + huge energy). Powers stars.
- Fusion challenges: needs extreme temperature (~10⁸ K) so nuclei have enough KE to overcome electrostatic repulsion; need to confine plasma (magnetic confinement, e.g. tokamak); no commercial fusion reactor yet.
- Containment issues in fission: shielding from neutrons (water, concrete) and gamma (lead/concrete); high pressure vessel for primary coolant.

**Equations** — balance nuclear equations: mass numbers and proton numbers conserved on both sides.

**Common misconceptions**
- "Fission and fusion are the same thing" — fission splits heavy nuclei, fusion combines light nuclei.
- "Fusion is dirty" — fusion produces far less long-lived radioactive waste than fission.
- "A nuclear reactor can explode like a bomb" — modern designs cannot reach the geometry/enrichment required for nuclear explosion; meltdowns release radioactivity but are not nuclear explosions.

**Worked example**
Complete: ²³⁵₉₂U + ¹₀n → ⁹⁴₃₈Sr + ¹⁴⁰₅₄Xe + ?·¹₀n.
→ Mass: 235 + 1 = 94 + 140 + n·1 → n = 2. Proton: 92 + 0 = 38 + 54 + 0 ✓.
→ Answer: 2 neutrons released.

## 5. Topic weightings & mock paper composition recommendation

### 5.1 Per-topic mark distribution (suggested target for app)

Calibrated from the SAMS Higher Tier papers (Unit 1 = 80 marks; Unit 2 = 80 marks). The split below is what the app's full-paper generator should aim for over a complete 160-mark mock. Each cell shows recommended marks ± a small tolerance.

| Spec ref | Sub-topic | Recommended marks in 80-mark Unit 1 | |
|----------|-----------|-------------------------------------|--|
| 1.1 | Electric circuits | 10–14 | |
| 1.2 | Generating electricity | 8–12 | |
| 1.3 | Making use of energy | 6–10 | |
| 1.4 | Domestic electricity | 6–10 | |
| 1.5 | Features of waves | 8–10 | |
| 1.6 | TIR | 4–6 | |
| 1.7 | Seismic waves | 4–6 | |
| 1.8 | Kinetic theory | 8–12 | |
| 1.9 | Electromagnetism | 6–10 | |

| Spec ref | Sub-topic | Recommended marks in 80-mark Unit 2 |
|----------|-----------|-------------------------------------|
| 2.1 | Distance, speed, accel | 8–10 |
| 2.2 | Newton's laws | 6–10 |
| 2.3 | Work and energy | 8–12 |
| 2.4 | Further motion (suvat, momentum, moments) | 10–14 |
| 2.5 | Stars and planets | 6–8 |
| 2.6 | The Universe | 4–6 |
| 2.7 | Types of radiation | 6–10 |
| 2.8 | Half-life | 6–10 |
| 2.9 | Nuclear decay & energy | 6–10 |

### 5.2 Question-style composition (per 80-mark paper)

Calibrated from the SAMS Higher Tier paper actual mark breakdown:

| Style | % of paper | Marks (out of 80) | Notes |
|-------|------------|---------------------|-------|
| Recall / short MCQ-style / fill-in | ~10% | 6–10 | Single mark or 2-mark items: "State…", "Name…", "Tick the correct statements", "Complete the equation". |
| Structured short calculation + brief explanation | ~50% | ~40 | Multi-part `(a)(i)/(ii)/(iii)` questions with calculations interleaved with one-sentence explanations. |
| 6-mark QER | ~8% (=6 marks once) | 6 | Exactly one per Higher paper. Always flagged `[6 QER]`. |
| Multi-part data/graph analysis (practical context, often involves plotting or reading graphs) | ~25% | ~20 | Stem usually a paragraph of context (article, dataset, table). |
| Pure recall / definition / state-the-law | ~7% | ~4–6 | Often baked into the structured questions. |

### 5.3 AO targets (over the whole 160 marks of Units 1+2)

- AO1 ≈ 64 marks (40%)
- AO2 ≈ 64 marks (40%)
- AO3 ≈ 32 marks (20%)
- Mathematics ≥ 48 marks (30%)
- Practical context ≥ 24 marks (15%)

The app's full-mock generator should target these splits when selecting from the question bank by tagging each question with its primary AO and a `maths` and `practical` flag.

## 6. Question bank (60+ original Higher-tier seed questions)

> Schema notes (for the dev team):
> - `id`: stable slug.
> - `topic`: spec ref + name (e.g. `1.1 Electric circuits`).
> - `higher_only`: `true` if content marked bold in spec / only on Higher paper.
> - `type`: one of `mcq | numeric | short | structured | qer6`.
> - `prompt`: the question text. LaTeX is wrapped in `\[ ... \]` for display equations; inline `\(x\)` for inline math. Plain ASCII is also fine.
> - `marks`: total marks.
> - `data_provided`: numeric/constant data given in the question.
> - For `mcq`: `options` (4) and `correct_index` (0-based).
> - For `numeric`: `answer_value`, `answer_unit`, `tolerance_pct` (`2` = ±2% by default for clean calcs; `5` for graph-reading; `0` for exact integers), `working_steps` (ordered array of expected substitution/manipulation lines).
> - For `short` / `structured`: `mark_scheme` (array of `{point, marks, accept, reject}`).
> - For `qer6`: `mark_scheme` is a single object with `indicative_content`, `level_descriptors` (1-3 with mark ranges), `key_terms_expected`.
> - `assessment_objective`: AO1 / AO2 / AO3 (primary). Use a string array if mixed.
> - `difficulty`: 1 (easy within Higher), 2 (mid), 3 (hardest within Higher).
> - `maths`: `true` if the question exercises mathematical skills.
> - `practical`: `true` if set in a practical context.
> - For Unit 2 numerical answers using gravity, the bank assumes `g = 10 N/kg` per WJEC convention.

```json
[
  {
    "id": "q-elec-001",
    "topic": "1.1 Electric circuits",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A 9.0 V battery is connected to a single 18 Ω resistor. Calculate the current.",
    "marks": 2,
    "data_provided": {"V": "9.0 V", "R": "18 Ω"},
    "answer_value": 0.5,
    "answer_unit": "A",
    "tolerance_pct": 2,
    "working_steps": ["Select I = V/R", "I = 9.0 / 18", "I = 0.5 A"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-elec-002",
    "topic": "1.1 Electric circuits",
    "higher_only": true,
    "type": "numeric",
    "prompt": "Two resistors of 12 Ω and 4 Ω are connected in parallel across a 6.0 V battery. Calculate the total current drawn from the battery.",
    "marks": 4,
    "data_provided": {"R1": "12 Ω", "R2": "4 Ω", "V": "6.0 V"},
    "answer_value": 2.0,
    "answer_unit": "A",
    "tolerance_pct": 2,
    "working_steps": ["1/R = 1/12 + 1/4 = 1/12 + 3/12 = 4/12", "R = 3 Ω", "I = V/R = 6.0 / 3", "I = 2.0 A"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-elec-003",
    "topic": "1.1 Electric circuits",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A 12 Ω heating element carries a current of 5.0 A. Use \\(P = I^2 R\\) to calculate the power dissipated.",
    "marks": 2,
    "data_provided": {"I": "5.0 A", "R": "12 Ω"},
    "answer_value": 300,
    "answer_unit": "W",
    "tolerance_pct": 2,
    "working_steps": ["P = I^2 R = (5.0)^2 × 12", "P = 25 × 12", "P = 300 W"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-elec-004",
    "topic": "1.1 Electric circuits",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which of the following components has a resistance that DECREASES as light intensity falling on it increases?",
    "marks": 1,
    "options": ["Filament lamp", "NTC thermistor", "LDR", "Diode"],
    "correct_index": 2,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-elec-005",
    "topic": "1.1 Electric circuits",
    "higher_only": false,
    "type": "structured",
    "prompt": "A student investigates the I-V characteristic of a filament lamp. (a) Sketch the expected I-V curve, labelling the axes. (b) Explain, in terms of the lamp's filament, why the curve is not a straight line through the origin.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Curve drawn passing through origin", "marks": 1, "accept": ["S-shape symmetric about origin"], "reject": ["Straight line through origin"]},
      {"point": "Axes labelled I (A) and V (V) correctly (current on y-axis, voltage on x-axis OR vice versa is acceptable)", "marks": 1, "accept": [], "reject": ["Unlabelled axes"]},
      {"point": "As current increases the filament heats up", "marks": 1, "accept": ["Filament temperature rises", "Lamp gets hotter"], "reject": []},
      {"point": "Higher temperature means higher resistance / atoms vibrate more / electrons collide more with ions", "marks": 1, "accept": ["Resistance increases as it heats"], "reject": ["Resistance decreases"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": true
  },
  {
    "id": "q-gen-001",
    "topic": "1.2 Generating electricity",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which of the following is NOT a renewable source of electricity in the UK?",
    "marks": 1,
    "options": ["Tidal power", "Natural gas", "Hydroelectric", "Wind"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-gen-002",
    "topic": "1.2 Generating electricity",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A power station generates 50 MW of electrical power. It is connected to the National Grid via transmission cables of total resistance 0.20 Ω. The power is transmitted at 400 kV. Calculate the power lost as heat in the cables.",
    "marks": 4,
    "data_provided": {"P_generated": "50 MW = 5.0 × 10^7 W", "R_cable": "0.20 Ω", "V_transmit": "400 kV = 4.0 × 10^5 V"},
    "answer_value": 3125,
    "answer_unit": "W",
    "tolerance_pct": 5,
    "working_steps": ["Select I = P/V", "I = 5.0×10^7 / 4.0×10^5 = 125 A", "P_loss = I^2 × R = 125^2 × 0.20", "P_loss = 15625 × 0.20 = 3125 W (≈ 3.1 kW)"],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-gen-003",
    "topic": "1.2 Generating electricity",
    "higher_only": false,
    "type": "qer6",
    "prompt": "Compare and contrast the use of WIND power and NATURAL GAS as sources of electricity for the UK National Grid. Your answer should refer to efficiency, reliability, carbon footprint, and any other relevant factors. [6 QER]",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "Wind: renewable, no fuel cost, no direct CO2 emissions during operation, low carbon footprint over lifetime. However wind is intermittent (unreliable - depends on weather), low energy density so many turbines needed, visual/noise impact on landscape, capacity factor typically only ~30%. Natural gas: high reliability (can be turned on/off quickly to meet demand), high efficiency (modern combined-cycle gas turbines ~60%), relatively low CO2 per kWh compared to coal but still significant (non-renewable fossil fuel, contributes to climate change), produces NOx pollutants, finite resource subject to price volatility. A balanced answer notes that wind helps decarbonisation but needs backup (often from gas) due to intermittency, so the two are complementary rather than directly competing.",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Sustained comparison addressing efficiency AND reliability AND carbon footprint with a balanced judgement. Coherent, relevant, substantiated, logically structured. Accurate scientific terminology, accurate SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Some comparison covering at least two of efficiency / reliability / carbon footprint. Partially coherent, largely relevant, some structure. Mainly appropriate terminology, some accurate SPaG."},
        {"level": 1, "marks_range": "1-2", "criteria": "Basic description of one or two features of wind OR gas, with little comparison. Limited structure, limited terminology, SPaG inaccuracies."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["renewable", "non-renewable", "intermittent", "reliable", "carbon footprint", "CO2", "efficiency", "fossil fuel"]
    },
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-gen-004",
    "topic": "1.2 Generating electricity",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A coal-fired power station supplies 600 MW of useful electrical power for an input of 1500 MW of chemical energy. Calculate its efficiency as a percentage.",
    "marks": 2,
    "data_provided": {"P_useful": "600 MW", "P_in": "1500 MW"},
    "answer_value": 40,
    "answer_unit": "%",
    "tolerance_pct": 2,
    "working_steps": ["% efficiency = (useful / total) × 100", "= (600 / 1500) × 100", "= 40%"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-gen-005",
    "topic": "1.2 Generating electricity",
    "higher_only": false,
    "type": "short",
    "prompt": "Explain why electricity is transmitted across the National Grid at high voltage rather than low voltage.",
    "marks": 3,
    "mark_scheme": [
      {"point": "Higher voltage means lower current (for the same power transmitted)", "marks": 1, "accept": ["P = VI so for fixed P, large V means small I"], "reject": ["High voltage is more powerful"]},
      {"point": "Energy lost in cables is given by P_loss = I^2 R / depends on (current)^2", "marks": 1, "accept": ["Heat losses depend on I squared"], "reject": []},
      {"point": "So lower current means much lower energy lost as heat in the cables (more efficient transmission)", "marks": 1, "accept": ["Less wasted energy"], "reject": []}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-mue-001",
    "topic": "1.3 Making use of energy",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A solid copper block has a mass of 540 g and a volume of 60 cm³. Calculate its density in kg/m³.",
    "marks": 3,
    "data_provided": {"m": "540 g = 0.540 kg", "V": "60 cm³ = 60 × 10^-6 m³"},
    "answer_value": 9000,
    "answer_unit": "kg/m³",
    "tolerance_pct": 2,
    "working_steps": ["Convert: m = 0.540 kg, V = 60 × 10^-6 m^3", "ρ = m/V = 0.540 / (60 × 10^-6)", "ρ = 9000 kg/m^3"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-mue-002",
    "topic": "1.3 Making use of energy",
    "higher_only": true,
    "type": "short",
    "prompt": "Explain, in terms of particles, why metals are good conductors of heat.",
    "marks": 3,
    "mark_scheme": [
      {"point": "Metals contain delocalised / mobile / free electrons", "marks": 1, "accept": ["Sea of electrons"], "reject": ["Free protons"]},
      {"point": "When one end is heated the electrons gain kinetic energy", "marks": 1, "accept": ["Electrons move faster"], "reject": []},
      {"point": "These electrons move quickly through the metal lattice and transfer KE to ions/atoms further along (or directly to cooler parts)", "marks": 1, "accept": ["Electrons collide with cooler atoms and pass on energy"], "reject": ["Atoms move through the metal"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-mue-003",
    "topic": "1.3 Making use of energy",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A house loses 7500 kWh of heat per year. Adding loft insulation reduces this by 28%. The insulation costs £420 to install and electricity costs 18 p/kWh. Calculate the payback time in years.",
    "marks": 4,
    "data_provided": {"annual_loss": "7500 kWh", "reduction": "28%", "install_cost": "£420", "unit_cost": "18 p/kWh"},
    "answer_value": 1.11,
    "answer_unit": "years",
    "tolerance_pct": 5,
    "working_steps": ["Energy saved per year = 0.28 × 7500 = 2100 kWh", "Money saved per year = 2100 × £0.18 = £378", "Payback = 420 / 378 ≈ 1.11 years"],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-mue-004",
    "topic": "1.3 Making use of energy",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which of the following methods of energy transfer does NOT require any medium (matter) to travel through?",
    "marks": 1,
    "options": ["Conduction", "Convection", "Radiation", "All three require a medium"],
    "correct_index": 2,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-mue-005",
    "topic": "1.3 Making use of energy",
    "higher_only": true,
    "type": "short",
    "prompt": "Describe and explain how a convection current is set up in a saucepan of water heated from below.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Water at the bottom gains energy and becomes hotter", "marks": 1, "accept": ["Water nearest the heat warms first"], "reject": []},
      {"point": "Hot water expands so its density decreases", "marks": 1, "accept": ["Particles spread out"], "reject": ["Particles get bigger"]},
      {"point": "Less dense (warmer) water rises; cooler denser water sinks to take its place", "marks": 1, "accept": [], "reject": ["Heat rises"]},
      {"point": "This creates a circulating convection current that transfers thermal energy through the water", "marks": 1, "accept": ["Continuous cycle of rising and falling water"], "reject": []}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-dom-001",
    "topic": "1.4 Domestic electricity",
    "higher_only": false,
    "type": "numeric",
    "prompt": "An electric oven has a power rating of 2.4 kW. It is used for 1.5 hours per day. Electricity costs 17 p/kWh. Calculate the cost of running the oven for 30 days.",
    "marks": 3,
    "data_provided": {"P": "2.4 kW", "t_daily": "1.5 h", "cost": "17 p/kWh", "days": "30"},
    "answer_value": 18.36,
    "answer_unit": "£",
    "tolerance_pct": 2,
    "working_steps": ["Units used per day = 2.4 × 1.5 = 3.6 kWh", "Units used in 30 days = 3.6 × 30 = 108 kWh", "Cost = 108 × £0.17 = £18.36"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-dom-002",
    "topic": "1.4 Domestic electricity",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A toaster is rated at 920 W and runs from a 230 V UK mains supply. The plug contains 3 A, 5 A and 13 A fuses. Calculate the current the toaster draws and state which fuse should be fitted.",
    "marks": 3,
    "data_provided": {"P": "920 W", "V": "230 V"},
    "answer_value": 4,
    "answer_unit": "A",
    "tolerance_pct": 2,
    "working_steps": ["I = P/V = 920 / 230 = 4.0 A", "Fuse must be just above 4.0 A → 5 A fuse"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-dom-003",
    "topic": "1.4 Domestic electricity",
    "higher_only": false,
    "type": "short",
    "prompt": "Explain the role of the EARTH wire and the FUSE in protecting a user from electric shock if a fault develops inside a metal-cased appliance.",
    "marks": 4,
    "mark_scheme": [
      {"point": "If the live wire touches the metal case, the case would become live (dangerous)", "marks": 1, "accept": ["Case at mains voltage"], "reject": []},
      {"point": "The earth wire provides a low-resistance path from the case to earth", "marks": 1, "accept": ["Current flows down earth wire to ground"], "reject": []},
      {"point": "A very large current flows in the live+earth loop", "marks": 1, "accept": ["Short circuit"], "reject": []},
      {"point": "The fuse melts/breaks, disconnecting the live wire and making the appliance safe", "marks": 1, "accept": ["Fuse blows so circuit is broken"], "reject": ["The fuse heats up so user is safe"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-dom-004",
    "topic": "1.4 Domestic electricity",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which statement BEST describes the difference between an a.c. and a d.c. supply?",
    "marks": 1,
    "options": ["a.c. has a higher voltage than d.c.", "a.c. periodically reverses direction; d.c. flows in one direction only", "a.c. only flows in batteries; d.c. only in mains", "a.c. is more dangerous because it transfers more energy"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-dom-005",
    "topic": "1.4 Domestic electricity",
    "higher_only": false,
    "type": "short",
    "prompt": "Compare a fuse with a residual current circuit breaker (RCCB) in terms of how they work and the type of fault they protect against.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Fuse contains a thin wire that melts when current exceeds the rating", "marks": 1, "accept": [], "reject": []},
      {"point": "Fuse protects against overcurrent / overload (large current faults)", "marks": 1, "accept": [], "reject": []},
      {"point": "RCCB compares the currents in the live and neutral wires and trips if they differ", "marks": 1, "accept": ["Detects imbalance / current leaking to earth"], "reject": []},
      {"point": "RCCB trips very quickly so it protects against electric shock to a person; works at smaller currents than a fuse", "marks": 1, "accept": ["Trips within milliseconds; protects users"], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-wav-001",
    "topic": "1.5 Features of waves",
    "higher_only": false,
    "type": "numeric",
    "prompt": "An ultrasound wave has frequency 2.5 MHz and travels at 1500 m/s through human tissue. Calculate its wavelength in mm.",
    "marks": 3,
    "data_provided": {"f": "2.5 MHz = 2.5 × 10^6 Hz", "v": "1500 m/s"},
    "answer_value": 0.6,
    "answer_unit": "mm",
    "tolerance_pct": 2,
    "working_steps": ["v = λf so λ = v/f = 1500 / (2.5 × 10^6)", "λ = 6.0 × 10^-4 m", "λ = 0.6 mm"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-wav-002",
    "topic": "1.5 Features of waves",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which of the following lists the electromagnetic spectrum in order of INCREASING frequency?",
    "marks": 1,
    "options": ["Radio, microwave, IR, visible, UV, X-ray, gamma", "Gamma, X-ray, UV, visible, IR, microwave, radio", "Visible, IR, UV, X-ray, gamma, microwave, radio", "Radio, IR, microwave, visible, X-ray, UV, gamma"],
    "correct_index": 0,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-wav-003",
    "topic": "1.5 Features of waves",
    "higher_only": false,
    "type": "structured",
    "prompt": "(a) State the difference between a transverse and a longitudinal wave. (b) Give one example of each type of wave.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Transverse: oscillations are perpendicular to direction of energy transfer / wave travel", "marks": 1, "accept": ["At right angles to direction of travel"], "reject": []},
      {"point": "Longitudinal: oscillations are parallel to direction of energy transfer / wave travel", "marks": 1, "accept": ["In the same direction as wave travel"], "reject": []},
      {"point": "Example of transverse: any of water/EM/light/S-waves/wave on a rope", "marks": 1, "accept": [], "reject": ["Sound"]},
      {"point": "Example of longitudinal: sound OR P-waves (seismic)", "marks": 1, "accept": [], "reject": ["Light", "Radio"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-wav-004",
    "topic": "1.5 Features of waves",
    "higher_only": false,
    "type": "qer6",
    "prompt": "Describe the electromagnetic spectrum. Your answer should include the properties that ALL electromagnetic waves share, the order of the seven regions, and at least TWO ways in which the regions differ from each other. [6 QER]",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "All EM waves are transverse, travel at the same speed (3 × 10^8 m/s) in a vacuum, transfer energy, can travel through a vacuum (do not need a medium). They are arranged: radio (longest λ, lowest f, lowest energy) → microwaves → infrared → visible light → ultraviolet → X-rays → gamma rays (shortest λ, highest f, highest energy). Differences: wavelength decreases left to right; frequency and energy increase left to right; ionising effect increases (UV, X-ray and gamma are ionising; the others are not); danger to humans increases from radio to gamma; uses differ (radio for broadcasting, microwaves for cooking/communications, IR for heating/remote controls, visible for sight, UV for tanning/sterilisation, X-rays for imaging, gamma for cancer treatment).",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Detailed description of shared properties AND correct order of regions AND at least two differences with examples. Sustained reasoning, coherent, accurate terminology, accurate SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Some shared properties + most of the order + one difference. Partially coherent, mainly appropriate terminology, some SPaG accuracy."},
        {"level": 1, "marks_range": "1-2", "criteria": "Basic description of one property or partial order. Limited reasoning and terminology, SPaG inaccuracies."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["transverse", "3 × 10^8 m/s", "vacuum", "wavelength", "frequency", "ionising", "radio", "microwave", "infrared", "visible", "ultraviolet", "X-ray", "gamma"]
    },
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-wav-005",
    "topic": "1.5 Features of waves",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A geostationary communications satellite orbits at an altitude of 36 000 km above the equator. A microwave signal travels from a ground station up to the satellite and back down to another ground station, with both ground-to-satellite paths each effectively 36 000 km. Calculate the total signal delay. Use c = 3 × 10^8 m/s.",
    "marks": 3,
    "data_provided": {"path_length_one_way": "36 000 km × 2 = 7.2 × 10^7 m total", "c": "3 × 10^8 m/s"},
    "answer_value": 0.24,
    "answer_unit": "s",
    "tolerance_pct": 5,
    "working_steps": ["Total distance = 2 × 36 000 × 10^3 = 7.2 × 10^7 m", "t = d / c = 7.2 × 10^7 / (3 × 10^8)", "t = 0.24 s (i.e. 240 ms)"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-tir-001",
    "topic": "1.6 Total internal reflection of waves",
    "higher_only": false,
    "type": "short",
    "prompt": "State the TWO conditions that must be met for total internal reflection to occur.",
    "marks": 2,
    "mark_scheme": [
      {"point": "Light must be travelling from a denser/optically denser medium into a less dense one", "marks": 1, "accept": ["From higher refractive index to lower"], "reject": []},
      {"point": "The angle of incidence must be greater than the critical angle (of the boundary)", "marks": 1, "accept": ["Angle ≥ critical angle"], "reject": ["Angle of incidence equals 90°"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-tir-002",
    "topic": "1.6 Total internal reflection of waves",
    "higher_only": true,
    "type": "structured",
    "prompt": "An optical fibre cable runs between London and New York, a distance of 5500 km. Light in the fibre travels at 2.0 × 10^8 m/s. (a) Calculate the time taken for a signal to travel from London to New York. (b) State and explain ONE advantage of using optical fibres over geostationary satellites for international communication.",
    "marks": 5,
    "mark_scheme": [
      {"point": "Selection of t = d/v", "marks": 1, "accept": [], "reject": []},
      {"point": "Substitution: t = 5.5 × 10^6 / (2.0 × 10^8)", "marks": 1, "accept": [], "reject": []},
      {"point": "Answer: 0.0275 s (or 27.5 ms)", "marks": 1, "accept": ["2.75 × 10^-2 s", "27 ms to 28 ms"], "reject": []},
      {"point": "Advantage stated: shorter delay / more secure / higher data rate / less interference", "marks": 1, "accept": [], "reject": ["Cheaper (cost is excluded by spec wording)"]},
      {"point": "Explanation linked to the advantage e.g. 'shorter delay because the path is much shorter than to a geostationary satellite (~72 000 km round trip)' OR 'fibre signal is enclosed so less prone to interception/eavesdropping'", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-tir-003",
    "topic": "1.6 Total internal reflection of waves",
    "higher_only": true,
    "type": "short",
    "prompt": "Compare endoscopy and CT scanning as methods of looking inside a patient's body. Refer to the type of radiation used and the associated risk.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Endoscopy uses visible light (sent and returned along optical fibres)", "marks": 1, "accept": ["Visible/IR light"], "reject": ["X-rays"]},
      {"point": "Visible light is non-ionising so endoscopy carries no radiation risk to cells", "marks": 1, "accept": [], "reject": []},
      {"point": "CT scan uses X-rays", "marks": 1, "accept": [], "reject": []},
      {"point": "X-rays are ionising so CT scanning carries a small risk of cell damage / cancer", "marks": 1, "accept": ["Can damage DNA / cause mutations"], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-tir-004",
    "topic": "1.6 Total internal reflection of waves",
    "higher_only": false,
    "type": "mcq",
    "prompt": "A ray of light is shone into a glass block. As the angle of incidence inside the block (at the glass-air boundary) is slowly increased from 0°, what happens FIRST?",
    "marks": 1,
    "options": ["The light is totally internally reflected back into the glass", "The refracted ray bends away from the normal and the reflected ray gets brighter", "The light becomes polarised", "The light changes colour"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-seis-001",
    "topic": "1.7 Seismic waves",
    "higher_only": false,
    "type": "short",
    "prompt": "State the differences between seismic P-waves and S-waves, in terms of (a) the type of wave each is, and (b) the materials through which each can travel.",
    "marks": 4,
    "mark_scheme": [
      {"point": "P-waves are longitudinal", "marks": 1, "accept": [], "reject": []},
      {"point": "S-waves are transverse", "marks": 1, "accept": [], "reject": []},
      {"point": "P-waves travel through both solids and liquids", "marks": 1, "accept": ["Through any material / through the core"], "reject": []},
      {"point": "S-waves travel through solids only / cannot pass through liquids", "marks": 1, "accept": ["Cannot pass through the (liquid outer) core"], "reject": []}
    ],
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-seis-002",
    "topic": "1.7 Seismic waves",
    "higher_only": false,
    "type": "numeric",
    "prompt": "At a seismic station, a P-wave (speed 6.0 km/s) arrives 60 s before the S-wave (speed 4.0 km/s) from the same earthquake. Calculate the distance from the station to the epicentre.",
    "marks": 4,
    "data_provided": {"v_P": "6.0 km/s", "v_S": "4.0 km/s", "Δt": "60 s"},
    "answer_value": 720,
    "answer_unit": "km",
    "tolerance_pct": 5,
    "working_steps": ["Let d be the distance. d/v_S − d/v_P = Δt", "d/4 − d/6 = 60", "(3d − 2d) / 12 = 60 → d/12 = 60", "d = 720 km"],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-seis-003",
    "topic": "1.7 Seismic waves",
    "higher_only": false,
    "type": "short",
    "prompt": "Seismic records show a region on the opposite side of the Earth from an earthquake's epicentre where NO S-waves are detected. Explain what this 'S-wave shadow zone' tells geologists about the structure of the Earth.",
    "marks": 3,
    "mark_scheme": [
      {"point": "S-waves are transverse and cannot travel through liquids", "marks": 1, "accept": [], "reject": []},
      {"point": "Some part of the Earth's interior must therefore be liquid (or behave like a liquid for S-waves)", "marks": 1, "accept": ["The outer core is liquid"], "reject": []},
      {"point": "This part is the outer core (located between mantle and inner core), so the model of the Earth has a solid mantle and a liquid outer core (inner core solid)", "marks": 1, "accept": ["Layered model with liquid outer core"], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-seis-004",
    "topic": "1.7 Seismic waves",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Why are seismic records from THREE or more seismic stations needed to locate the epicentre of an earthquake?",
    "marks": 1,
    "options": ["To average out random measurement errors", "Each station gives a distance to the epicentre; the three circles intersect at one point (triangulation)", "Each station measures a different wave type", "To check that the earthquake actually happened"],
    "correct_index": 1,
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-kin-001",
    "topic": "1.8 Kinetic theory",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A fixed mass of gas has a pressure of 120 kPa at 27 °C. The gas is heated, at constant volume, to 327 °C. Calculate the new pressure.",
    "marks": 4,
    "data_provided": {"p1": "120 kPa", "T1": "27 °C", "T2": "327 °C"},
    "answer_value": 240,
    "answer_unit": "kPa",
    "tolerance_pct": 2,
    "working_steps": ["Convert temperatures to kelvin: T1 = 27 + 273 = 300 K; T2 = 327 + 273 = 600 K", "At constant V: p1/T1 = p2/T2", "p2 = p1 × T2/T1 = 120 × 600/300", "p2 = 240 kPa"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-kin-002",
    "topic": "1.8 Kinetic theory",
    "higher_only": false,
    "type": "numeric",
    "prompt": "Calculate the energy needed to raise the temperature of 0.50 kg of water from 20 °C to 100 °C. The specific heat capacity of water is 4200 J/(kg·°C).",
    "marks": 3,
    "data_provided": {"m": "0.50 kg", "Δθ": "100 − 20 = 80 °C", "c": "4200 J/(kg·°C)"},
    "answer_value": 168000,
    "answer_unit": "J",
    "tolerance_pct": 2,
    "working_steps": ["ΔQ = mcΔθ", "ΔQ = 0.50 × 4200 × 80", "ΔQ = 168 000 J (168 kJ)"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-kin-003",
    "topic": "1.8 Kinetic theory",
    "higher_only": false,
    "type": "numeric",
    "prompt": "Calculate the energy needed to completely melt 0.25 kg of ice at 0 °C into water at 0 °C. The specific latent heat of fusion of ice is 3.34 × 10^5 J/kg.",
    "marks": 2,
    "data_provided": {"m": "0.25 kg", "L": "3.34 × 10^5 J/kg"},
    "answer_value": 83500,
    "answer_unit": "J",
    "tolerance_pct": 2,
    "working_steps": ["Q = mL", "Q = 0.25 × 3.34 × 10^5", "Q = 83 500 J (≈ 84 kJ)"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-kin-004",
    "topic": "1.8 Kinetic theory",
    "higher_only": true,
    "type": "qer6",
    "prompt": "Using ideas about the motion of gas particles, explain (i) why the pressure of a fixed mass of gas in a sealed container INCREASES when the temperature is raised at constant volume, and (ii) why the pressure DECREASES when the volume of the container is increased at constant temperature. [6 QER]",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "A gas consists of fast-moving particles that collide with the walls of their container. Each collision exerts a small force on the wall; pressure is the total force per unit area. (i) When the temperature rises, particles gain kinetic energy and move faster on average. They collide with the walls MORE FREQUENTLY (more collisions per second), and each collision delivers a larger change of momentum, so the average force on the wall increases. Volume is fixed, so the same wall area receives a greater force → pressure rises. (ii) When the volume increases at constant temperature, particles keep the same average kinetic energy (same speed). However, in a larger volume the particles travel further between collisions with the walls, so the number of collisions per second on a given area falls. The force per unit area therefore decreases → pressure falls. Quantitatively this is summarised by pV/T = constant (T in kelvin).",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Both parts addressed with explicit references to (a) rate of collisions and (b) force per collision (where relevant) and (c) area. Sustained reasoning, accurate terminology and SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Both parts addressed at a qualitative level, OR one part addressed in full detail. Some structure and terminology."},
        {"level": 1, "marks_range": "1-2", "criteria": "Basic statement that particles collide with walls and that temperature/volume changes affect pressure, with little mechanism."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["kinetic energy", "collisions", "wall", "force", "area", "frequency of collisions", "momentum"]
    },
    "assessment_objective": "AO1",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-kin-005",
    "topic": "1.8 Kinetic theory",
    "higher_only": true,
    "type": "structured",
    "prompt": "A weather balloon contains 2.00 m³ of helium at sea level where the pressure is 100 kPa and the temperature is 17 °C. The balloon rises to an altitude where the pressure is 25 kPa and the temperature is −33 °C. Calculate the new volume of the helium.",
    "marks": 5,
    "mark_scheme": [
      {"point": "Select pV/T = constant (or p1V1/T1 = p2V2/T2)", "marks": 1, "accept": [], "reject": []},
      {"point": "Convert both temperatures to kelvin: T1 = 17 + 273 = 290 K; T2 = −33 + 273 = 240 K", "marks": 1, "accept": [], "reject": ["Leaving in °C"]},
      {"point": "Substitute: (100 × 2.00) / 290 = (25 × V2) / 240", "marks": 1, "accept": [], "reject": []},
      {"point": "Rearrange: V2 = (100 × 2.00 × 240) / (290 × 25)", "marks": 1, "accept": [], "reject": []},
      {"point": "V2 = 6.62 m³ (accept 6.6 m³)", "marks": 1, "accept": ["6.6 m³", "6.62 m³"], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-em-001",
    "topic": "1.9 Electromagnetism",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A copper wire of length 0.25 m carries a current of 4.0 A perpendicular to a magnetic field of strength 0.60 T. Calculate the force on the wire.",
    "marks": 2,
    "data_provided": {"B": "0.60 T", "I": "4.0 A", "l": "0.25 m"},
    "answer_value": 0.6,
    "answer_unit": "N",
    "tolerance_pct": 2,
    "working_steps": ["F = BIl = 0.60 × 4.0 × 0.25", "F = 0.60 N"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-em-002",
    "topic": "1.9 Electromagnetism",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A step-down transformer is needed to reduce 230 V mains to 12 V for a doorbell. The primary coil has 1150 turns. Assuming the transformer is 100% efficient, calculate the number of turns required on the secondary coil.",
    "marks": 3,
    "data_provided": {"V1": "230 V", "V2": "12 V", "N1": "1150"},
    "answer_value": 60,
    "answer_unit": "turns",
    "tolerance_pct": 2,
    "working_steps": ["V1/V2 = N1/N2 → N2 = N1 × V2/V1", "N2 = 1150 × (12 / 230)", "N2 = 60 turns"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-em-003",
    "topic": "1.9 Electromagnetism",
    "higher_only": false,
    "type": "structured",
    "prompt": "A student investigates a simple d.c. motor. (a) State THREE changes the student could make to increase the rotation speed of the motor. (b) Explain how a split-ring commutator keeps the coil rotating in the same direction.",
    "marks": 5,
    "mark_scheme": [
      {"point": "Any THREE of: increase current; use stronger magnets / increase magnetic field strength; increase number of turns on coil; insert a soft-iron core", "marks": 3, "accept": ["Larger coil area"], "reject": ["Increase voltage if 'current' or 'B' already given"]},
      {"point": "Every half-turn the current direction in the coil is reversed", "marks": 1, "accept": ["Commutator swaps contacts every half-cycle"], "reject": []},
      {"point": "So the force on each side of the coil keeps pointing the same way, maintaining the rotation direction (rather than oscillating)", "marks": 1, "accept": ["Couple acts in the same rotational sense throughout"], "reject": []}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": true
  },
  {
    "id": "q-em-004",
    "topic": "1.9 Electromagnetism",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Fleming's left hand rule is used to find the direction of the force on a current-carrying wire in a magnetic field. Which finger represents the magnetic field?",
    "marks": 1,
    "options": ["Thumb", "First finger", "Second finger", "Little finger"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-em-005",
    "topic": "1.9 Electromagnetism",
    "higher_only": true,
    "type": "short",
    "prompt": "Explain why a transformer will only work with an alternating current (a.c.) supply and not with direct current (d.c.).",
    "marks": 3,
    "mark_scheme": [
      {"point": "A transformer relies on electromagnetic induction in the secondary coil", "marks": 1, "accept": ["EMF induced by changing flux"], "reject": []},
      {"point": "Induction only occurs when the magnetic flux through the secondary is CHANGING", "marks": 1, "accept": ["A changing magnetic field is required"], "reject": ["A magnetic field is required"]},
      {"point": "An a.c. current in the primary produces a continually changing flux; a steady d.c. produces a steady (non-changing) flux, so no EMF is induced in the secondary", "marks": 1, "accept": ["With d.c. the flux is constant so no induced voltage"], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-kine-001",
    "topic": "2.1 Distance, speed and acceleration",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A car accelerates uniformly from 8.0 m/s to 26 m/s in 6.0 s. Calculate its acceleration.",
    "marks": 2,
    "data_provided": {"u": "8.0 m/s", "v": "26 m/s", "t": "6.0 s"},
    "answer_value": 3,
    "answer_unit": "m/s²",
    "tolerance_pct": 2,
    "working_steps": ["a = Δv / t = (26 − 8.0) / 6.0", "a = 18 / 6.0", "a = 3.0 m/s²"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-kine-002",
    "topic": "2.1 Distance, speed and acceleration",
    "higher_only": true,
    "type": "structured",
    "prompt": "A car is travelling at 20 m/s. The driver sees an obstacle and reacts in 0.8 s before applying the brakes. The brakes then produce a constant deceleration of 5.0 m/s². (a) Calculate the thinking distance. (b) Calculate the braking distance. (c) State the total stopping distance. (d) State ONE factor (other than speed) that would INCREASE the thinking distance.",
    "marks": 6,
    "mark_scheme": [
      {"point": "Thinking distance = 20 × 0.8 = 16 m", "marks": 2, "accept": ["16 m"], "reject": []},
      {"point": "Braking: use v^2 = u^2 + 2ax with v = 0, u = 20, a = −5.0 → 0 = 400 − 10x → x = 40 m", "marks": 2, "accept": ["40 m"], "reject": []},
      {"point": "Total stopping distance = 16 + 40 = 56 m", "marks": 1, "accept": [], "reject": []},
      {"point": "Any ONE valid factor: alcohol / drugs / tiredness / distraction (e.g. mobile phone) / illness", "marks": 1, "accept": [], "reject": ["Poor brakes (that's braking distance)", "Wet road (braking)", "Slippery road (braking)"]}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-kine-003",
    "topic": "2.1 Distance, speed and acceleration",
    "higher_only": false,
    "type": "mcq",
    "prompt": "On a velocity-time graph for an object, the gradient of the line represents which quantity?",
    "marks": 1,
    "options": ["Distance travelled", "Acceleration", "Speed", "Force"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-kine-004",
    "topic": "2.1 Distance, speed and acceleration",
    "higher_only": true,
    "type": "numeric",
    "prompt": "On a velocity-time graph, an object's velocity rises linearly from 0 to 30 m/s over 10 s, then stays constant at 30 m/s for 20 s, then falls linearly to 0 over 5 s. Calculate the total distance travelled.",
    "marks": 4,
    "data_provided": {"phase_1": "0 to 30 m/s over 10 s (triangle)", "phase_2": "30 m/s for 20 s (rectangle)", "phase_3": "30 to 0 m/s over 5 s (triangle)"},
    "answer_value": 825,
    "answer_unit": "m",
    "tolerance_pct": 2,
    "working_steps": ["Area = distance under v-t graph", "Triangle 1 = ½ × 10 × 30 = 150 m", "Rectangle = 20 × 30 = 600 m", "Triangle 2 = ½ × 5 × 30 = 75 m", "Total = 150 + 600 + 75 = 825 m"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-kine-005",
    "topic": "2.1 Distance, speed and acceleration",
    "higher_only": false,
    "type": "short",
    "prompt": "State TWO factors that affect the BRAKING distance of a car and explain how each affects the braking distance.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Factor 1 (any of): worn tyres / wet or icy road surface / worn brakes / increased vehicle mass / steep downhill", "marks": 1, "accept": [], "reject": ["Driver tiredness", "Alcohol"]},
      {"point": "Linked explanation of factor 1: e.g. less friction with road so longer to stop OR more KE to dissipate at the same braking force", "marks": 1, "accept": [], "reject": []},
      {"point": "Factor 2 (a DIFFERENT one of the above)", "marks": 1, "accept": [], "reject": ["Same factor twice"]},
      {"point": "Linked explanation of factor 2", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-newt-001",
    "topic": "2.2 Newton's laws",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A resultant force of 1200 N acts on a car of mass 800 kg. Calculate the acceleration of the car.",
    "marks": 2,
    "data_provided": {"F": "1200 N", "m": "800 kg"},
    "answer_value": 1.5,
    "answer_unit": "m/s²",
    "tolerance_pct": 2,
    "working_steps": ["a = F/m = 1200 / 800", "a = 1.5 m/s²"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-newt-002",
    "topic": "2.2 Newton's laws",
    "higher_only": false,
    "type": "qer6",
    "prompt": "A skydiver of mass 75 kg jumps from a stationary helicopter at high altitude and falls without opening her parachute. Describe and explain how the forces acting on her — and her motion — change from the moment she jumps until she reaches terminal velocity. [6 QER] (Use g = 10 N/kg.)",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "Immediately after jumping, the skydiver is essentially at rest (vertical velocity zero), so air resistance is zero. The only significant force is her weight W = mg = 75 × 10 = 750 N downwards, giving a resultant force of 750 N downwards. By Newton's 2nd law, a = F/m = 10 m/s² downward — she accelerates downward at g. As she speeds up, air resistance increases (it depends on speed and on cross-sectional area). The RESULTANT force is now W − air resistance, which is less than W. Therefore she still accelerates (still goes faster) but at a DECREASING rate. Air resistance continues to grow until it exactly equals her weight (750 N). The resultant force is then zero, so by Newton's 1st law she moves at constant velocity — her TERMINAL VELOCITY. From that moment her motion is uniform.",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Clear account of (i) initial state with weight only and acceleration = g, (ii) increasing air resistance reducing resultant, (iii) decreasing acceleration, (iv) terminal velocity with balanced forces and zero acceleration. Coherent reasoning, accurate terminology and SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Identifies weight and air resistance and reaches terminal velocity, but with gaps (e.g. constant acceleration assumed throughout, or no quantitative weight)."},
        {"level": 1, "marks_range": "1-2", "criteria": "Mentions falling and air resistance with little detail. Limited terminology."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["weight", "air resistance", "resultant force", "acceleration", "terminal velocity", "Newton's first law", "Newton's second law"]
    },
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-newt-003",
    "topic": "2.2 Newton's laws",
    "higher_only": false,
    "type": "short",
    "prompt": "State Newton's THIRD law of motion, and give one everyday example.",
    "marks": 3,
    "mark_scheme": [
      {"point": "If body A exerts a force on body B, then B exerts a force on A that is equal in size and opposite in direction", "marks": 2, "accept": ["For every action there is an equal and opposite reaction (action–reaction pairs on different bodies)"], "reject": ["Forces cancel out"]},
      {"point": "Any valid example: rocket exhaust pushes back on gases / gases push rocket forward; a swimmer pushes water back / water pushes swimmer forward; person stands on floor / floor pushes person up; gun recoils when bullet is fired", "marks": 1, "accept": [], "reject": ["A balanced see-saw"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-newt-004",
    "topic": "2.2 Newton's laws",
    "higher_only": false,
    "type": "mcq",
    "prompt": "An astronaut has a mass of 70 kg. What is the astronaut's WEIGHT on the surface of the Moon, where the gravitational field strength is 1.6 N/kg?",
    "marks": 1,
    "options": ["70 N", "112 N", "700 N", "44 N"],
    "correct_index": 1,
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-newt-005",
    "topic": "2.2 Newton's laws",
    "higher_only": false,
    "type": "structured",
    "prompt": "A 1200 kg car is travelling at a constant velocity along a straight, level road. (a) State the resultant force on the car and justify your answer. (b) The driver pushes the accelerator pedal. The forward driving force from the engine is now 3000 N and the total resistive forces (air resistance + friction) are 1800 N. Calculate the acceleration of the car.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Resultant force = 0 N", "marks": 1, "accept": ["Zero newtons"], "reject": []},
      {"point": "Because Newton's 1st law: at constant velocity the forces must be balanced (driving force = resistive forces)", "marks": 1, "accept": [], "reject": []},
      {"point": "Net force = 3000 − 1800 = 1200 N", "marks": 1, "accept": [], "reject": []},
      {"point": "a = F/m = 1200/1200 = 1.0 m/s²", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-work-001",
    "topic": "2.3 Work and energy",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A box of mass 25 kg is lifted vertically through 1.8 m. Calculate the gain in gravitational potential energy. (g = 10 N/kg)",
    "marks": 2,
    "data_provided": {"m": "25 kg", "h": "1.8 m", "g": "10 N/kg"},
    "answer_value": 450,
    "answer_unit": "J",
    "tolerance_pct": 2,
    "working_steps": ["PE = mgh = 25 × 10 × 1.8", "PE = 450 J"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-work-002",
    "topic": "2.3 Work and energy",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A car of mass 1100 kg is travelling at 18 m/s. Calculate its kinetic energy.",
    "marks": 2,
    "data_provided": {"m": "1100 kg", "v": "18 m/s"},
    "answer_value": 178200,
    "answer_unit": "J",
    "tolerance_pct": 2,
    "working_steps": ["KE = ½ m v² = 0.5 × 1100 × 18²", "= 0.5 × 1100 × 324", "= 178 200 J (about 1.78 × 10^5 J)"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-work-003",
    "topic": "2.3 Work and energy",
    "higher_only": true,
    "type": "structured",
    "prompt": "A spring obeys Hooke's law. When a force of 8.0 N is applied to the spring, its extension is 0.040 m. (a) Calculate the spring constant. (b) Calculate the elastic potential energy stored when the spring is extended by 0.040 m. (c) The spring is now extended to 0.060 m. Calculate the NEW energy stored.",
    "marks": 6,
    "mark_scheme": [
      {"point": "k = F/x = 8.0 / 0.040", "marks": 1, "accept": [], "reject": []},
      {"point": "k = 200 N/m", "marks": 1, "accept": [], "reject": []},
      {"point": "W = ½ F x = ½ × 8.0 × 0.040", "marks": 1, "accept": ["W = ½ k x² = ½ × 200 × 0.040²"], "reject": []},
      {"point": "W = 0.16 J", "marks": 1, "accept": [], "reject": []},
      {"point": "New W = ½ × 200 × 0.060² = ½ × 200 × 0.0036", "marks": 1, "accept": ["New F = kx = 200 × 0.060 = 12 N; W = ½ × 12 × 0.060"], "reject": []},
      {"point": "New W = 0.36 J", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-work-004",
    "topic": "2.3 Work and energy",
    "higher_only": false,
    "type": "short",
    "prompt": "Explain how crumple zones and air bags reduce the risk of injury to a car passenger during a collision.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Crumple zone / air bag increases the TIME taken for the passenger to come to rest", "marks": 1, "accept": ["Extends the duration of the collision"], "reject": []},
      {"point": "The CHANGE IN MOMENTUM Δp is the same (because initial and final velocities are unchanged)", "marks": 1, "accept": [], "reject": []},
      {"point": "Force = change in momentum / time → if t increases, F decreases (for the same Δp)", "marks": 1, "accept": ["F = Δp/t shows force is reduced"], "reject": []},
      {"point": "A smaller force on the passenger reduces injury", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-work-005",
    "topic": "2.3 Work and energy",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A roller-coaster car of mass 600 kg starts from rest at the top of a hill 25 m high. Assuming no friction or air resistance, calculate the speed of the car at the bottom of the hill. (g = 10 N/kg)",
    "marks": 4,
    "data_provided": {"m": "600 kg", "h": "25 m", "g": "10 N/kg", "u": "0"},
    "answer_value": 22.36,
    "answer_unit": "m/s",
    "tolerance_pct": 2,
    "working_steps": ["By conservation of energy: GPE lost = KE gained", "mgh = ½ m v²; mass cancels", "v² = 2gh = 2 × 10 × 25 = 500", "v = √500 ≈ 22.4 m/s"],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-mot-001",
    "topic": "2.4 Further motion concepts",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A car accelerates uniformly from 5.0 m/s to 25 m/s over a distance of 75 m. Calculate the acceleration of the car.",
    "marks": 3,
    "data_provided": {"u": "5.0 m/s", "v": "25 m/s", "x": "75 m"},
    "answer_value": 4,
    "answer_unit": "m/s²",
    "tolerance_pct": 2,
    "working_steps": ["v² = u² + 2ax", "25² = 5² + 2 × a × 75", "625 − 25 = 150 a → 600 = 150 a", "a = 4.0 m/s²"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-mot-002",
    "topic": "2.4 Further motion concepts",
    "higher_only": true,
    "type": "structured",
    "prompt": "A 1200 kg car travelling at 15 m/s collides head-on with a stationary 800 kg car. After the collision the two cars stick together and move off as one unit. (a) Calculate the velocity of the cars immediately after the collision. (b) Calculate the TOTAL kinetic energy of the system before and after the collision and comment on whether the collision is elastic or inelastic.",
    "marks": 6,
    "mark_scheme": [
      {"point": "Conservation of momentum: m1 u1 + m2 u2 = (m1 + m2) v", "marks": 1, "accept": [], "reject": []},
      {"point": "1200 × 15 + 800 × 0 = (1200 + 800) × v → 18 000 = 2000 v", "marks": 1, "accept": [], "reject": []},
      {"point": "v = 9.0 m/s (in the original direction)", "marks": 1, "accept": [], "reject": []},
      {"point": "KE before = ½ × 1200 × 15² + 0 = 135 000 J (= 1.35 × 10^5 J)", "marks": 1, "accept": [], "reject": []},
      {"point": "KE after = ½ × 2000 × 9² = 81 000 J (= 8.1 × 10^4 J)", "marks": 1, "accept": [], "reject": []},
      {"point": "KE has decreased so the collision is INELASTIC (energy lost to heat, sound, deformation)", "marks": 1, "accept": [], "reject": ["Elastic"]}
    ],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-mot-003",
    "topic": "2.4 Further motion concepts",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A 0.045 kg golf ball is struck by a club and leaves the tee with a velocity of 60 m/s. The club is in contact with the ball for 0.0005 s (0.5 ms). Calculate the average force exerted by the club on the ball.",
    "marks": 3,
    "data_provided": {"m": "0.045 kg", "Δv": "60 m/s", "t": "0.0005 s"},
    "answer_value": 5400,
    "answer_unit": "N",
    "tolerance_pct": 2,
    "working_steps": ["Δp = m Δv = 0.045 × 60 = 2.7 kg m/s", "F = Δp / t = 2.7 / 0.0005", "F = 5400 N"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-mot-004",
    "topic": "2.4 Further motion concepts",
    "higher_only": true,
    "type": "structured",
    "prompt": "A uniform metre rule of weight 2.0 N is pivoted at its 50 cm mark. A 4.0 N weight is hung at the 20 cm mark. (a) Calculate the moment of the 4.0 N weight about the pivot. (b) A second weight W is hung at the 75 cm mark to balance the rule. Calculate W. (Ignore the weight of the rule for the balancing calculation since it acts at the pivot.)",
    "marks": 5,
    "mark_scheme": [
      {"point": "Distance of 4.0 N weight from pivot = 50 − 20 = 30 cm = 0.30 m", "marks": 1, "accept": [], "reject": []},
      {"point": "Moment = F × d = 4.0 × 0.30 = 1.2 N m (anticlockwise)", "marks": 1, "accept": [], "reject": []},
      {"point": "Distance of W from pivot = 75 − 50 = 25 cm = 0.25 m", "marks": 1, "accept": [], "reject": []},
      {"point": "Principle of moments: clockwise = anticlockwise → W × 0.25 = 1.2", "marks": 1, "accept": [], "reject": []},
      {"point": "W = 1.2 / 0.25 = 4.8 N", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-mot-005",
    "topic": "2.4 Further motion concepts",
    "higher_only": true,
    "type": "numeric",
    "prompt": "A ball is thrown vertically upwards with an initial velocity of 12 m/s. Take g = 10 m/s² downward and ignore air resistance. Calculate the maximum height the ball reaches above its launch point.",
    "marks": 3,
    "data_provided": {"u": "12 m/s up", "v": "0 m/s at top", "a": "−10 m/s²"},
    "answer_value": 7.2,
    "answer_unit": "m",
    "tolerance_pct": 2,
    "working_steps": ["v² = u² + 2ax with v = 0 at the highest point", "0 = 12² + 2(−10) x → 0 = 144 − 20 x", "x = 144 / 20 = 7.2 m"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-star-001",
    "topic": "2.5 Stars and planets",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which stage of stellar evolution comes IMMEDIATELY after the main sequence for a LOW-MASS star (similar to the Sun)?",
    "marks": 1,
    "options": ["Supernova", "Red giant", "Neutron star", "Black hole"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-star-002",
    "topic": "2.5 Stars and planets",
    "higher_only": false,
    "type": "short",
    "prompt": "Explain why a main-sequence star like the Sun is stable for billions of years.",
    "marks": 3,
    "mark_scheme": [
      {"point": "Gravitational forces pull material inwards (gravity tends to make the star collapse)", "marks": 1, "accept": [], "reject": []},
      {"point": "Fusion in the core (hydrogen → helium) releases radiation that creates an outward pressure (radiation/gas pressure)", "marks": 1, "accept": [], "reject": []},
      {"point": "When the inward gravitational force equals the outward radiation+gas pressure, the star is in equilibrium / is stable", "marks": 1, "accept": ["Balance is maintained while hydrogen fuel lasts"], "reject": []}
    ],
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-star-003",
    "topic": "2.5 Stars and planets",
    "higher_only": true,
    "type": "structured",
    "prompt": "The Hertzsprung-Russell (H-R) diagram is used to classify stars. (a) State the two physical properties of stars plotted on the H-R diagram. (b) Describe where on the diagram you would find: (i) main-sequence stars, (ii) red giants, (iii) white dwarfs.",
    "marks": 5,
    "mark_scheme": [
      {"point": "Luminosity (or brightness) on the y-axis", "marks": 1, "accept": ["Power output"], "reject": []},
      {"point": "Surface temperature on the x-axis (with temperature INCREASING to the left)", "marks": 1, "accept": ["Spectral class O-M from left to right"], "reject": []},
      {"point": "Main sequence: a diagonal band from top-left (hot, bright) to bottom-right (cool, dim)", "marks": 1, "accept": [], "reject": []},
      {"point": "Red giants: top-right (cool BUT very bright/luminous)", "marks": 1, "accept": [], "reject": ["Bottom right"]},
      {"point": "White dwarfs: bottom-left (hot but dim/small)", "marks": 1, "accept": [], "reject": ["Top left"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-star-004",
    "topic": "2.5 Stars and planets",
    "higher_only": false,
    "type": "numeric",
    "prompt": "Light from the Sun takes 500 s to reach Earth. The speed of light is 3 × 10^8 m/s. Calculate the distance from the Earth to the Sun in metres. Then convert this distance into kilometres.",
    "marks": 3,
    "data_provided": {"t": "500 s", "c": "3 × 10^8 m/s"},
    "answer_value": 150000000,
    "answer_unit": "km",
    "tolerance_pct": 2,
    "working_steps": ["d = speed × time = 3 × 10^8 × 500", "d = 1.5 × 10^11 m", "d = 1.5 × 10^8 km = 150 000 000 km (which is ~1 AU)"],
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-univ-001",
    "topic": "2.6 The Universe",
    "higher_only": true,
    "type": "short",
    "prompt": "Explain what is meant by 'cosmological red shift' and what it tells us about the Universe.",
    "marks": 4,
    "mark_scheme": [
      {"point": "Cosmological red shift is the observation that absorption (or emission) lines from distant galaxies are shifted to longer wavelengths (towards the red end of the spectrum)", "marks": 1, "accept": ["Wavelengths from distant galaxies are stretched"], "reject": []},
      {"point": "The shift is greater for galaxies that are further away", "marks": 1, "accept": [], "reject": []},
      {"point": "It is caused by the expansion of space stretching the wavelengths of the light as it travels", "marks": 1, "accept": ["Galaxies are moving away from us / each other"], "reject": []},
      {"point": "This is direct evidence that the Universe is expanding, and supports the Big Bang model", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-univ-002",
    "topic": "2.6 The Universe",
    "higher_only": true,
    "type": "qer6",
    "prompt": "Describe the main pieces of evidence for the Big Bang model of the origin of the Universe. [6 QER]",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "The Big Bang model proposes that the Universe began as a hot, dense, very small region about 13.8 billion years ago and has been expanding ever since. (1) Cosmological red shift: Edwin Hubble in the 1920s measured the spectra of distant galaxies and found that their absorption lines were shifted to longer wavelengths (towards the red). The further away the galaxy, the larger the red shift. This shows that distant galaxies are moving away from us, and that the more distant they are, the faster they recede - exactly what would be expected if all space is expanding. (2) Cosmic Microwave Background (CMB) radiation: In 1964 Penzias and Wilson discovered a faint microwave radiation that comes uniformly from all directions in space. The Big Bang model predicts that the very hot, dense early Universe would have produced high-energy radiation that has since been stretched (red-shifted) by the expansion of space into the microwave region. The observed CMB has exactly the temperature (~2.7 K) and uniformity predicted, strongly supporting the hot Big Bang model. (3) Abundance of light elements (a stretch point but worth mentioning): the Big Bang predicts specific ratios of hydrogen, helium, and traces of lithium that match observations across the Universe.",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Detailed account of BOTH the cosmological red shift (with link to expansion) AND the cosmic microwave background (with link to hot, dense early universe). Sustained, coherent, accurate terminology, accurate SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Both pieces of evidence mentioned but with limited detail, OR one piece in full detail."},
        {"level": 1, "marks_range": "1-2", "criteria": "Basic mention of red shift OR Big Bang. Limited reasoning."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["red shift", "expansion", "Hubble", "cosmic microwave background", "CMB", "hot dense early Universe", "13.8 billion years", "wavelength stretched"]
    },
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-univ-003",
    "topic": "2.6 The Universe",
    "higher_only": false,
    "type": "mcq",
    "prompt": "A particular hydrogen absorption line is measured at 656 nm in the laboratory but is observed at 689 nm in light from a distant galaxy. What does this observation tell us about the galaxy?",
    "marks": 1,
    "options": ["The galaxy is moving towards us (blue shift)", "The galaxy is moving away from us (red shift)", "The galaxy is hotter than the Sun", "The galaxy is made of different elements"],
    "correct_index": 1,
    "assessment_objective": "AO2",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-rad-001",
    "topic": "2.7 Types of radiation",
    "higher_only": false,
    "type": "mcq",
    "prompt": "Which of the following best describes a BETA particle?",
    "marks": 1,
    "options": ["A helium nucleus", "A high-energy electron emitted from the nucleus", "A high-energy electromagnetic wave", "A high-energy proton"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-rad-002",
    "topic": "2.7 Types of radiation",
    "higher_only": true,
    "type": "short",
    "prompt": "Complete and balance the following alpha decay equation, identifying the mass and atomic numbers of the daughter nucleus X.\n\n  ²²⁶₈₈Ra → X + ⁴₂He²⁺",
    "marks": 3,
    "mark_scheme": [
      {"point": "Mass number of X = 226 − 4 = 222", "marks": 1, "accept": [], "reject": []},
      {"point": "Proton (atomic) number of X = 88 − 2 = 86", "marks": 1, "accept": [], "reject": []},
      {"point": "X is ²²²₈₆Rn (radon)", "marks": 1, "accept": ["Rn", "Radon-222"], "reject": ["Ra"]}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-rad-003",
    "topic": "2.7 Types of radiation",
    "higher_only": false,
    "type": "structured",
    "prompt": "Three sources A, B and C emit either alpha, beta or gamma radiation. A student finds that: source A is stopped by paper; source B is stopped by 3 mm of aluminium but passes through paper; source C is reduced (but not stopped) by 5 cm of lead. (a) Identify the radiation emitted by each source. (b) State which type carries the greatest risk if the source is INHALED, and explain why.",
    "marks": 5,
    "mark_scheme": [
      {"point": "A = alpha", "marks": 1, "accept": [], "reject": []},
      {"point": "B = beta", "marks": 1, "accept": [], "reject": []},
      {"point": "C = gamma", "marks": 1, "accept": [], "reject": []},
      {"point": "Alpha carries greatest risk if inhaled", "marks": 1, "accept": [], "reject": ["Gamma"]},
      {"point": "Because alpha is the most ionising and so causes the most damage to cells when in direct contact with tissue (it has nowhere to escape to from inside the body)", "marks": 1, "accept": ["Alpha is heavily ionising/short range; once inside it deposits all its energy in nearby cells"], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": true
  },
  {
    "id": "q-rad-004",
    "topic": "2.7 Types of radiation",
    "higher_only": false,
    "type": "short",
    "prompt": "Define the term 'isotope'.",
    "marks": 2,
    "mark_scheme": [
      {"point": "Isotopes are atoms of the same element", "marks": 1, "accept": ["Have the same number of protons / same proton number"], "reject": []},
      {"point": "with different numbers of neutrons (i.e. different mass/nucleon numbers)", "marks": 1, "accept": [], "reject": ["Different number of electrons"]}
    ],
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-rad-005",
    "topic": "2.7 Types of radiation",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A Geiger-Müller tube records the following counts (per minute) on five successive 1-minute intervals with NO source present: 18, 22, 19, 25, 16. (a) Calculate the mean background count rate. (b) The same tube, with a weak source present, records a count of 142 per minute. State the corrected count rate (above background) for the source.",
    "marks": 3,
    "data_provided": {"background_readings": "18, 22, 19, 25, 16", "with_source": "142"},
    "answer_value": 122,
    "answer_unit": "counts/min",
    "tolerance_pct": 2,
    "working_steps": ["Mean background = (18+22+19+25+16)/5 = 100/5 = 20 counts/min", "Corrected = 142 − 20", "= 122 counts/min"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": true
  },
  {
    "id": "q-hl-001",
    "topic": "2.8 Half-life",
    "higher_only": false,
    "type": "numeric",
    "prompt": "A radioactive isotope has a half-life of 6 hours. A pure sample initially has an activity of 800 Bq. Calculate its activity after 24 hours.",
    "marks": 3,
    "data_provided": {"T_half": "6 hours", "A_0": "800 Bq", "t": "24 hours"},
    "answer_value": 50,
    "answer_unit": "Bq",
    "tolerance_pct": 2,
    "working_steps": ["Number of half-lives = 24 / 6 = 4", "Remaining fraction = (1/2)^4 = 1/16", "A = 800 / 16 = 50 Bq"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-hl-002",
    "topic": "2.8 Half-life",
    "higher_only": true,
    "type": "structured",
    "prompt": "Iodine-131 is used as a medical tracer to study the function of the thyroid gland. It has a half-life of 8 days and emits both beta and gamma radiation. (a) State and explain TWO reasons why iodine-131 is suitable as a medical tracer. (b) A patient is given a dose of iodine-131 with initial activity 4800 Bq. Calculate the activity that remains in the body 32 days later (assume the iodine is not excreted).",
    "marks": 6,
    "mark_scheme": [
      {"point": "Reason 1: short half-life (8 days)", "marks": 1, "accept": [], "reject": []},
      {"point": "Linked explanation: so the activity decays quickly and the patient is not exposed for a long time", "marks": 1, "accept": [], "reject": []},
      {"point": "Reason 2: emits gamma radiation", "marks": 1, "accept": ["The gamma radiation is highly penetrating"], "reject": []},
      {"point": "Linked explanation: gamma can pass out of the body to be detected by an external detector", "marks": 1, "accept": [], "reject": []},
      {"point": "Number of half-lives = 32 / 8 = 4 → factor (1/2)^4 = 1/16", "marks": 1, "accept": [], "reject": []},
      {"point": "Activity = 4800 / 16 = 300 Bq", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-hl-003",
    "topic": "2.8 Half-life",
    "higher_only": true,
    "type": "numeric",
    "prompt": "Carbon-14 has a half-life of 5730 years. A wooden artefact from an archaeological site has an activity that is 25% of the activity of an equivalent piece of fresh wood. Estimate the age of the artefact.",
    "marks": 3,
    "data_provided": {"T_half": "5730 years", "fraction_remaining": "25% = 1/4"},
    "answer_value": 11460,
    "answer_unit": "years",
    "tolerance_pct": 2,
    "working_steps": ["25% = (1/2)^n → n = 2 half-lives have elapsed", "Age = 2 × 5730", "Age = 11 460 years"],
    "assessment_objective": "AO2",
    "difficulty": 2,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-hl-004",
    "topic": "2.8 Half-life",
    "higher_only": false,
    "type": "mcq",
    "prompt": "After 3 half-lives have elapsed, what FRACTION of the original radioactive nuclei in a pure sample remain undecayed?",
    "marks": 1,
    "options": ["1/3", "1/6", "1/8", "1/9"],
    "correct_index": 2,
    "assessment_objective": "AO1",
    "difficulty": 1,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-hl-005",
    "topic": "2.8 Half-life",
    "higher_only": true,
    "type": "short",
    "prompt": "Explain why repeat readings of count rate from a radioactive source are necessary, even when the source's average activity is steady.",
    "marks": 3,
    "mark_scheme": [
      {"point": "Radioactive decay is a random process", "marks": 1, "accept": [], "reject": []},
      {"point": "So individual counts in successive equal time intervals will fluctuate (will not be the same each time)", "marks": 1, "accept": ["Statistical variation in the count"], "reject": []},
      {"point": "Taking repeat readings and averaging reduces the effect of this random variation and gives a more reliable / more accurate value for the count rate", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": true
  },
  {
    "id": "q-nuc-001",
    "topic": "2.9 Nuclear decay and nuclear energy",
    "higher_only": true,
    "type": "structured",
    "prompt": "Complete the nuclear equation for a fission reaction:\n\n  ²³⁵₉₂U + ¹₀n → ¹⁴¹₅₆Ba + ⁹²₃₆Kr + x ¹₀n + energy.\n\n(a) Calculate the number of neutrons x released. (b) Explain how this release of neutrons can lead to a sustained chain reaction. (c) State the role of (i) the control rods and (ii) the moderator in a nuclear fission reactor.",
    "marks": 6,
    "mark_scheme": [
      {"point": "Conservation of mass number: 235 + 1 = 141 + 92 + x → 236 = 233 + x → x = 3", "marks": 1, "accept": [], "reject": []},
      {"point": "(Conservation of proton number checks: 92 + 0 = 56 + 36 + 0 ✓)", "marks": 1, "accept": [], "reject": []},
      {"point": "The neutrons released can each go on to be absorbed by other uranium-235 nuclei", "marks": 1, "accept": [], "reject": []},
      {"point": "Causing further fission events that release more neutrons → exponential growth = chain reaction", "marks": 1, "accept": [], "reject": []},
      {"point": "Control rods absorb neutrons (boron/cadmium); lowering them reduces the rate of fission so the reactor can be controlled (or shut down)", "marks": 1, "accept": [], "reject": []},
      {"point": "Moderator (water or graphite) slows down the fast neutrons to thermal speeds so they are more likely to be absorbed by U-235 (which prefers slow neutrons)", "marks": 1, "accept": [], "reject": []}
    ],
    "assessment_objective": "AO2",
    "difficulty": 3,
    "maths": true,
    "practical": false
  },
  {
    "id": "q-nuc-002",
    "topic": "2.9 Nuclear decay and nuclear energy",
    "higher_only": true,
    "type": "short",
    "prompt": "State TWO advantages and ONE disadvantage of nuclear FUSION compared to nuclear FISSION as a future source of energy.",
    "marks": 3,
    "mark_scheme": [
      {"point": "Any one advantage: fuel (hydrogen isotopes) is virtually unlimited (deuterium in seawater) OR no long-lived high-level radioactive waste OR very high energy yield per kg of fuel", "marks": 1, "accept": [], "reject": []},
      {"point": "Any DIFFERENT advantage from list above", "marks": 1, "accept": [], "reject": ["Repeating the same point"]},
      {"point": "Disadvantage: requires extremely high temperatures (~10^8 K) to overcome electrostatic repulsion OR difficult to confine the plasma OR no commercially viable fusion reactor yet exists", "marks": 1, "accept": [], "reject": ["Produces dangerous radiation (so does fission)"]}
    ],
    "assessment_objective": "AO3",
    "difficulty": 2,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-nuc-003",
    "topic": "2.9 Nuclear decay and nuclear energy",
    "higher_only": true,
    "type": "qer6",
    "prompt": "Compare nuclear fission and nuclear fusion. Your answer should describe what each process is, give an example of the reactants and products for each, and discuss why fusion is much harder to use as a practical energy source on Earth than fission. [6 QER]",
    "marks": 6,
    "mark_scheme": {
      "indicative_content": "Fission is the SPLITTING of a heavy unstable nucleus (e.g. uranium-235 ²³⁵₉₂U) when it absorbs a slow neutron, producing two smaller daughter nuclei (e.g. barium-141 and krypton-92), 2-3 fast neutrons, and a large release of energy. The released neutrons can sustain a chain reaction. Fission powers existing nuclear power stations. Fusion is the JOINING of two light nuclei (e.g. deuterium ²₁H and tritium ³₁H) to form a heavier nucleus (helium ⁴₂He) plus a neutron and a large release of energy per unit mass — much more than fission per kg of fuel. Fusion powers stars including the Sun. Fusion is harder to achieve on Earth because the light nuclei are both positively charged and so repel each other electrostatically. To overcome this and bring nuclei close enough for the strong nuclear force to act, the plasma must be heated to ~10^8 K. At such temperatures no normal container can hold the plasma, so magnetic confinement (e.g. tokamak) is used. Maintaining these conditions stably for long enough to extract net energy has not yet been done commercially. By contrast, fission only requires slowing neutrons (with a moderator) and absorbing them (control rods) to control the chain reaction — much more tractable engineering.",
      "level_descriptors": [
        {"level": 3, "marks_range": "5-6", "criteria": "Clear definitions of both fission and fusion with correct example reactants/products and a substantive explanation of why fusion is harder (electrostatic repulsion + need for very high temperature + plasma confinement). Sustained, coherent, accurate terminology and SPaG."},
        {"level": 2, "marks_range": "3-4", "criteria": "Both processes described qualitatively, with some example. One or two reasons given for the difficulty of fusion."},
        {"level": 1, "marks_range": "1-2", "criteria": "Basic statement that fission splits and fusion joins. Limited examples or reasoning."},
        {"level": 0, "marks_range": "0", "criteria": "No relevant content."}
      ],
      "key_terms_expected": ["split", "join", "chain reaction", "uranium-235", "deuterium", "tritium", "neutron", "high temperature", "plasma", "electrostatic repulsion", "magnetic confinement"]
    },
    "assessment_objective": "AO3",
    "difficulty": 3,
    "maths": false,
    "practical": false
  },
  {
    "id": "q-nuc-004",
    "topic": "2.9 Nuclear decay and nuclear energy",
    "higher_only": true,
    "type": "mcq",
    "prompt": "What is the role of the MODERATOR in a nuclear fission reactor?",
    "marks": 1,
    "options": ["To absorb neutrons and slow the rate of fission down", "To slow fast neutrons so they can be absorbed by U-235 to cause further fission", "To absorb gamma radiation produced in the core", "To convert kinetic energy of neutrons into electrical energy"],
    "correct_index": 1,
    "assessment_objective": "AO1",
    "difficulty": 2,
    "maths": false,
    "practical": false
  }
]
```

---

## Appendix — primary sources used

- WJEC GCSE Physics specification (Wales) PDF, version 2 March 2019 — `wjec-gcse-physics-spec-from-2016.pdf` (the spec body, equations list reference, AO weightings, specified practicals list, Higher-only flag conventions: "content in bold is higher-only").
- WJEC GCSE Physics equations list PDF — `gcse-physics-equations-list.pdf` (the canonical Unit 1 Foundation, Unit 1 Higher, Unit 2 Foundation, Unit 2 Higher equation tables).
- WJEC GCSE Physics Sample Assessment Materials — `wjec-gcse-physics-sams-from-2016.pdf` (verbatim QER level descriptors, marking abbreviations, sample Higher Tier papers used to calibrate question style, mark distribution and topic weighting).
- Eduqas GCSE Physics specification PDF (England, qualification code C420QS) — used to cross-check that subject content is materially identical except for NEA absence in England.
- WJEC GCSE Physics Examiners' Report Summer 2024 (Eduqas) — used to confirm ECF practice, sig-fig penalty convention, and common error patterns.
