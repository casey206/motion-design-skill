# 14 區塊 Prompt 架構

動態設計的 prompt 都長一樣：14 個區塊，順序固定，**全部寫滿**。型態專屬的子區塊（SAFE ZONES、PERSISTENCE LOCK、DATA OVERLAY…）往裡面加，基本 14 塊不能少。

模型讀自然語言，所以每句都要**物理、具體、可測量**（材質、光的方向、幾度、毫秒、百分比），不要形容詞堆疊。動態的數值從 `craft-laws.md` §10 翻譯；運鏡詞從 `camera-language.md` 抄。

---

## ⚠ 與 seedance skill 的關鍵差異

| | 實拍類 Seedance prompt skill（實拍寫真） | 本 skill（動態設計） |
|---|---|---|
| 負面敘述 | **禁止**，一律正向 | **必要**。RENDER 的禁用清單是壓掉「AI 油膩感」的唯一工具 |
| 開頭 | 開在 SCENE CONTEXT，風格分散在各區塊 | **開在格式行＋風格定義**（動態設計的風格是全片統一的，不分散） |
| CAMERA 位置 | 核心層第 3 位，否則 FOV 被忽略 | **全域 MOTION LANGUAGE 放前面**（DNA），**CAMERA 允許／禁止清單放後面**（約束），逐鏡運鏡寫在各 beat 裡 |
| 時間 | 可選（oner／有序切／timed） | **一律 timed**，每個 beat 標死秒數 |

兩者都適用的：正向描述動態本身、速度與大氣用數值、左右以攝影機為準、FOV 用度數不用 mm。

---

## 1. 格式行

第一行把規格說完，接一段風格定義。

```
Product rendering reel, 16:9, 24fps, 15 seconds, PHOTOREAL TROPICAL PRODUCT FILM
STYLE — physically-based product animation set in a real tropical environment:
hard golden sunlight through jungle canopy, volumetric light shafts in humid air,
wet volcanic stone, glossy rain-fresh foliage; premium render-reel polish but
physically honest — droplets with gravity trails, nothing rubber-smooth.
```

風格定義的寫法：**兩個半句**。前半講畫面裡有什麼物理事實，後半講品質的邊界（「高級但物理誠實」、「乾淨數位但零顆粒」）。後半那半句是防止模型往預設油膩感跑的第一道閘。

## 2. 聲音宣告

必寫，不能留空。細節見 `sound-and-rhythm.md`。

- **全靜音**：`Fully silent piece — no soundtrack, no sound design; all rhythm is carried by {實際靠什麼} alone.`
- **有音無人聲**：分 `overall_soundscape:` 與 `non_diegetic_music:` 兩段，寫 BPM、樂器、哪一秒停。
- **有旁白**：逐字稿一次寫完，加 `word for word, finishing the final sentence completely, with no paraphrasing`，再寫語意同步。

## 3. 世界定義

場景的物理事實：材質、尺度、光從哪來、空氣裡有什麼（霧度百分比、粉塵、蒸氣）。不同 beat 的世界分段寫（`Reality:` / `Void beat:` / `Endcard:`）。

寫「這個世界不會有什麼」比寫「這個世界很美」有效：`No people, no hands anywhere. No fire, no flames, no embers.`

## 4. PALETTE（鎖 hex）

表格式，**每色一個角色名**。全片一致性的第一道保險。

```
PALETTE (locked, vibrant):
Acid             #D1EF17 — brand base: 3D building accents, 2D highlights, accent words
Deep ink         #14151B — dark world background, type on light
Electric violet  #6C2BFF — 2D character clothing, secondary shapes
Off white        #F7F4EC — light world background, type on dark
```

再補 **color rule**：哪個顏色只准出現在哪、不准染到哪。

```
Color rule: environment lives in green-gold-teal; the bottle's own colors come
only from @Image 1 and must never bleed onto foliage or stone.
```

強調色若會經歷不同光線，要定義**色相邊界**，否則金色時刻會偏色：

```
chartreuse acid #D1EF17 is a COLD yellow-green, sitting between highlighter
yellow and fresh lime, always green-biased, in every beat and under every
lighting condition.
```

**顏色要綁材質與光束，不要列清單**（這條跟 seedance skill 一致）：
- ❌ `the woman wears red`
- ✅ `crimson silk scarf catching the cold tungsten spill from the corridor`

## 5. 主角 ＋ identity anchor

先寫死外觀，再點名那一個簽名特徵。

有參考圖時（實體產品的常態）：

```
THE HERO: the HIGGS bottle exactly as reference @Image 1 — silhouette,
proportions, cap design, label design, wordmark placement, materials and colors
are locked to @Image 1 in every shot with zero redesign. Identity anchor: the
single most distinctive design feature visible in @Image 1 must read clearly in
every beat.
```

沒有參考圖時自己發明剪影，並明寫它不像誰（見區塊 12）。

產品片必加表面狀態的數值：`condensation beads 0.5–2mm at ~70% coverage with gravity trails and merging drops`。抽象寫「有水珠」會拿到塑膠感。

## 6. TYPE TREATMENT

字族、進場物理、出場物理、強調規則，四件事。數值查 `craft-laws.md` §8。

```
TYPE TREATMENT: ultra-bold geometric sans — off-white on dark beats, deep ink on
light beats. Headlines bounce in word by word with squash-stretch, staggered
40ms, wobble-settle. One accent word per headline gets an acid #D1EF17 chunky
marker swipe drawing behind it in 200ms. Exits: letters pop away like bubbles.
```

必寫：**一行標題只有一個強調字**。整行上色等於沒有強調。

疊在畫面上的字要明寫在螢幕空間、不跟物件轉：

```
Headline overlays stay sharp and flat in screen space and never rotate with objects.
```

追著物件跑的規格標要寫成 3D 錨定：

```
Each callout is motion-tracked: a thin white leader line stays pinned to an exact
anchor point on the part, and the lockup follows that part with natural parallax
as the camera moves, as if attached in 3D space — never floating freely, never
sliding on its own. Only one lockup exists on screen at any moment.
```

## 7. MOTION LANGUAGE（全片動態 DNA）

這塊決定整支片「像哪一種東西做的」。三件事：**緩動性格、轉場型態、允許與禁止**。

```
MOTION LANGUAGE (global): museum-slow reverence DNA inside a living world. Every
camera move is a single continuous motorized drift — boom-ups, lateral dollies,
slow orbital tilts — with long ease-in and ease-out. Fruits obey slow orbital
drift: constant gentle momentum, no sudden direction changes. Transitions are
soft cuts on stillness — no dissolves, no morphs, no speed ramps except the final
slow-motion impact.
```

**換風格＝換這塊的 DNA**（緩動物理、轉場種類、算圖語言），不是換顏色。

混亂風格要給規則（`jitter only on beat landings, never continuous handheld`）；乾淨風格要給禁令。2D 片要在這塊寫彈性數值（`squash-stretch up to 20%, smear frames on whips`）。

## 8. OPTICS / CAMERA（全域）

FOV、鏡頭性格、鎖定宣告。表在 `camera-language.md` §2。

```
OPTICS: 84° diagonal field of view, classic wide coverage. Lens locked for the
entire 15 seconds — one lens, one take. STRONG anamorphic lens character:
horizontal squeeze, oval elliptical bokeh, horizontally stretched highlights,
curved barrel edge distortion. NO lens flares, NO light streaks, NO floating
bokeh circles. All type stays inside the central 70% of frame so barrel
distortion never touches readable text.
```

多鏡頭片要**每段標 FOV ＋ `no drift mid-segment`**。2D 片這塊改成鎖死宣告（`camera-language.md` §5）。

## 9. BEAT SHEET（標死秒數）

每個 beat 一段，格式 `0.0–2.5s — {動作}`。節拍每 1.5–2 秒落一次（`craft-laws.md` §1）。每段要有：**攝影機做什麼、畫面上什麼物理事件、這段的字是哪句、強調字是哪個**。

```
0.0–1.8s — Deep ink void. The MONOLITH rises from below frame in one powerful 3D
slow-mo move, its acid glass spine igniting floor by floor as it rises — while
flat 2D vector stars and scribble sparks pop around its silhouette on every
ignition, staggered. Headline bounces in: "Built different."
Acid swipe on: "different."
```

多鏡頭片用 `[Shot N] At 00:0X.XXX, hard cut to …`，切點標到毫秒。實測切點會準確落點。

最後一個 beat **一定是 lockup**：wordmark ＋ 副標 ＋ CTA chip → hold 0.8–1.0 秒 → 收。明寫凍住：

```
From 00:13.800 through 00:15.000, freeze the entire composition, including light
and camera. No fade, darkening or appended scene.
```

**15 秒至少要有一個純停住的空拍**，否則整支片會讀成「一直在動但沒有重點」。

## 10. TRANSITIONS / SEAMS

把每一次場景轉換的**機制**單獨列出來。這塊是動態設計高級感的主要來源，細節見 `camera-language.md` §4。

一鏡到底的片用 SEAM 寫法：

```
SEAM A (no cut): the finished section drawing itself tilts — the drawing plane
rotates into 3D space with every line continuously visible throughout the rotation.
SEAM B (no cut): materialization begins inside the linework itself at street
level — the drawing's own strokes start turning to matter; there is never a
screen-space boundary.
```

多鏡頭片用對位剪接寫法：

```
MATCH CUT: align the triangular Play button with a triangular arrow and cut
crisply to an enormous side-profile head cutout on bright yellow.
```

**永遠不要寫 `dissolve to` 或 `crossfade`。**

## 11. COPY LIST（合約）

畫面上會出現的每個字串逐字列出，結尾那句不可省。細節見 `text-integrity.md`。

```
COPY LIST — exact strings, nothing else appears in frame:
"Built different."
"8 faculties. 1 door."
"Apply in 4 minutes."
```

## 12. 非 IP 宣告

明寫主角虛構，**並點名它不像誰**。這塊模型真的會照做。

```
CONTENT SAFETY / NON-IP: invented beverage brand "HIGGS" with bottle design per
reference @Image 1; the design does NOT copy Coca-Cola contour bottle trade
dress, does NOT copy Fanta/Sprite trade dress, no real brand devices. All label
micro-text greeked. No real people, logos, landmarks, or OS interfaces.
```

- 自己發明品牌名用 `Higgs*` 慣例，或客戶自己的名字。
- 背景文字一律 greeked。
- 「Unreal Engine 風格」只能指算圖品質，不能出現引擎浮水印。
- 用名畫就用公共領域的，或生一張「in the manner of」的原創。

## 13. LOCKS（一致性重述）

把區塊 4、5 的關鍵事實**再說一次**。這不是重複，是給模型在後段 beat 的錨。分段生成時每段都要有。

```
PRODUCT CONSISTENCY: restate in every generation — the bottle matches reference
@Image 1 exactly: silhouette, proportions, cap, label layout, wordmark,
materials, colors; identity anchor from @Image 1 must read in every beat;
condensation ~70%. Bottle size and design never change across beats.
```

型態專屬的鎖也放這塊：

- **PERSISTENCE LOCK**（組裝類）：已落下的層永不消失、永不被取代，成品要數得出所有層。
- **STYLE CONSISTENCY**（2D＋3D 混合）：兩層物理互動但永不交換算圖屬性，破壞即破壞風格。
- **CHARACTER CONSISTENCY**（有角色）：同一主角每個 beat 比例、服裝、配色完全相同。
- **ANTI-IMPACT LOCK**（裂開／碎裂但不該有撞擊）：`fracture originates from edge stress, not center impact`、`pressure-based crack, no impact point`、裂紋時序由邊緣往中心而非放射狀。

**lock 要短、要放在它保護的東西旁邊**，例如 `headlights stay glowing in every shot`。

## 14. RENDER（禁用清單）

算圖品質 ＋ **具體的視覺現象禁令**。這塊是動態設計跟實拍 prompt 最大的分野——必須有。

```
RENDER: physically-based photoreal quality — glass with true refraction,
condensation with real refraction and varied bead sizes, volumetric golden sun
shafts in 30% humid haze, wet volcanic stone with broken specular reflections.
Must NOT appear: on-screen text or graphic overlays of any kind, rubber-smooth
CGI plastic look, film grain overlay, vignette, lens flares, light streaks,
floating bokeh circles, chromatic aberration, watermark of any kind.
```

禁用清單要列**具體的視覺現象**，不要列抽象品質。「不要看起來很 AI」無效；`no floating bokeh circles, no chromatic aberration` 有效。

常備禁令：`no grain, no vignette, no lens flare, no light streaks, no floating bokeh circles, no chromatic aberration, no glow, no bloom, no watermark, no subtitles, no UI chrome`。

2D 片再加：`no gradients, no outlines, no textures, no 3D, no photorealism, no blur of any kind`。
紙藝／編輯風再加：`nothing emits light anywhere in the film`（少了這句會拿到霓虹科技感）。

---

## 直式（9:16）改編

不是裁切，是重新編排。加一塊 SAFE ZONES：

```
SAFE ZONES (9:16): top 12% and bottom 15% of frame carry no critical read — the
wordmark and identity anchor always sit inside the central 73% of frame height;
foliage, light shafts and droplets may enter the margins.
```

水平動作換成垂直動作：飛越變俯衝、爆炸圖橫排變塔狀往上疊（配升降鏡）、掉落變全畫面高度墜落、左右分割變上下分割。標題變 2–3 行短句堆疊，chip 改直排。

改完要說明哪幾個 beat 在直式**更強**（通常是墜落與塔狀爆炸圖）。

---

## 交出 prompt 前的檢查表

- [ ] 14 區塊都在，順序正確？
- [ ] 格式行的風格定義有「物理事實 ＋ 品質邊界」兩個半句？
- [ ] 聲音宣告不是空的？靜音有寫節奏靠什麼？
- [ ] 色票每色有角色名？強調色有色相邊界定義？
- [ ] identity anchor 有被點名，並在 LOCKS 重述？
- [ ] BEAT SHEET 每段都標死秒數？節拍 1.5–2 秒？
- [ ] 有一個純停住的空拍？
- [ ] 最後一個 beat 是 lockup ＋ 明寫凍結？
- [ ] 每次轉場都有機制（SEAM 或對位剪接），沒有 dissolve？
- [ ] COPY LIST 逐字完整，結尾合約句在？
- [ ] 非 IP 宣告點名了不像誰？
- [ ] CAMERA 有允許／禁止兩張清單？FOV 用表上的離散度數？
- [ ] RENDER 的禁用清單是具體視覺現象？
- [ ] 動態描述是正向的，但視覺雜訊有禁令？
- [ ] 多鏡頭有每段 FOV ＋ `no drift mid-segment`？
- [ ] 直式有 SAFE ZONES？
