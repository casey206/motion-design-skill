# 3D 動畫配方

四種已驗證的 3D 型態。每個配方給：**機制、craft 設定（數值）、世界、攝影機、關鍵鎖、beat 骨架**。照抄骨架換語意層，不要從白紙開始。

共用：14 區塊架構（`prompt-blocks.md`）、`minimax_h3` 15 秒 2K、參考圖走 `image_references`、片尾卡走 `end_image`。緩動與幀數查 `craft-laws.md`，運鏡與 FOV 查 `camera-language.md`，聲音查 `sound-and-rhythm.md`。

**3D 世界的攝影機永不靜止**，這是 3D 與 2D 的分界。靜止的 3D 鏡頭會讓物件讀成貼圖。

---

## §1 SaaS／科技上市片（$500–3,000／15 秒）

**機制**：把一個軟體功能變成一組有厚度的實體物件，用真實的攝影機移動證明它有深度。**不是把截圖推近拉遠的幻燈片。**

**為什麼重製 UI 而不是錄螢幕**：螢幕錄影呈現的是產品現在的樣子；重製的 UI 動畫呈現的是產品**應該被看見**的樣子——每一格構圖過、每個互動節奏過、雜訊全部移除。而且它撐得過改版：產品重新設計時只要改動畫，不用重錄。

### craft 設定

| 項目 | 值 |
|---|---|
| FOV | 47°（通用）／29°（英雄鏡）／12°（微距插入鏡） |
| 節拍 | 7 鏡，每鏡 1.0–3.0 秒 |
| 緩動性格 | `fast moves ease decisively into readable landings` |
| 過衝 | 3–8%（clean 調性，不要彈跳） |
| 動態模糊 | `motion blur only during travel` |
| 字的位置 | 螢幕空間，不隨物件旋轉 |

### 世界：光學玻璃設計語言（最耐用，任何 SaaS 都能套）

```
Optical-glass design language: rigid blue-edged crystal UI slabs, pearl inner
surfaces, thin glass signal ribbons, controlled studio reflections, restrained
sentence-case English typography. Cool-white studio, cobalt glass refraction,
silver bevel highlights; one dark studio passage in the middle of the film. No
warm colors, no new logos, no people, no devices, no subtitles, no footer labels.
```

**中間那段暗色通道**是這個配方的關鍵設計：全片都是冷白棚會平掉，中段給一個暗色段落，亮度曲線才有起伏。

### 動態規則（照抄）

```
Real camera travel reveals parallax, thickness and changing occlusion. Objects
keep their geometry at all times. Fast moves ease decisively into readable
landings; motion blur only during travel. Headline overlays stay sharp and flat
in screen space and never rotate with objects.
```

`Objects keep their geometry at all times` 這句不寫，UI 板塊會在移動中變形。

### 7 鏡骨架

| 鏡 | 時間 | 內容 | 字 | FOV |
|---|---|---|---|---|
| 1 | 0–2.25s | 極近景：問題狀態的物件堆疊在景深裡，鏡頭橫移穿過 | 痛點短句 ＋ wordmark | 18° |
| 2 | 2.25–5.0s | 硬切到寬景英雄鏡：兩個主體面對面，光脈衝沿連結帶跑 | 一句話定位 ＋ 狀態標 | 47° |
| 3 | 5.0–6.0s | 極微距動作插入鏡，暗色段落，**不放任何字** | 無 | 12° |
| 4 | 6.0–8.5s | 拉出到四分之三視角，揭露第二主體回應 | 功能句 ＋ 狀態標 | 29° |
| 5 | 8.5–9.5s | 圖形對位硬切（形狀接形狀）進資料插入鏡 | 只放小標與數字 | 12° |
| 6 | 9.5–12.5s | 寬景分析總成：面板 ＋ 固定高度的數據條 | 價值句 ＋ 4–5 個標籤 | 47° |
| 7 | 12.5–15s | 定版：wordmark 居中、一句話、一顆按鈕，鏡頭鎖死 | wordmark ＋ tagline ＋ CTA | 47° |

### 關鍵鎖

- 鏡 3 與鏡 5 是**動作插入鏡**，明寫 `no headline, no new text` — 全片節奏靠這兩個空拍呼吸。
- 數據條要 `three vertical metric bars of fixed differing heights … receive sequential light accents without changing their heights`。讓它們長高＝製造假數據。
- 鏡 6 底部留白 `Keep the bottom background blank`，之後貼字才有地方。
- 鏡 7 明寫凍結：`From 00:13.800 through 00:15.000, freeze the entire composition, including light and camera.`

### 一行網址路徑

只給客戶網址、不想寫 prompt 時，走 Marketing Studio `preset_type: saas_motion` ＋ `brand_url`。它不吃產品圖也不吃 logo，15 秒約 90 credits（H3 的 3 倍）。**適合探畫風，不適合交件**——因為你拿不到 prompt，客戶改版時你沒有資產。

---

## §2 Hyper-Motion 產品片（餐飲／美妝／飲料／3C）

**心理學**：同一個漢堡，看起來是 5 美元還是 15 美元，差別在它怎麼動。這型態賣的是「看起來很貴」，而對多數生意來說一筆 $100 的成交勝過十筆 $10。

三個版本，依產品類型選。

### 版本 A：四段式組裝片（食品／餐飲最強）

**機制**：現實 → 掉落動作把鏡頭帶進異空間隧道 → 食材流回現實用重力組裝 → 定版卡。**兩次進出異空間都由自然動作帶**（翻起的肉排落下帶你進去、食材流下帶你回來），不是剪接。

#### craft 設定

| 項目 | 值 |
|---|---|
| FOV | 18°（微距 sear）／47°（翻起）／84°（隧道穿飛）／29°（組裝環繞） |
| 節拍 | 7 鏡，0.7–4.5 秒不等（刻意不平均） |
| 緩動性格 | `hard speed ramps between beats`（這型態要能量，不要平滑） |
| 落地 | **1 幀壓縮 ＋ 快速阻尼回彈**，每一層都要 |
| 重量 | 重物小過衝（肉排）、輕物大過衝（芝麻） |

```
STORY LOGIC — Four movements in one high-energy flow: (1) reality — the product
sears on the griddle; (2) the dream — as the flipped patty begins to fall, the
film whips into a deep red void where the ingredients form a rotating TUNNEL and
the camera flies straight through it; (3) return — exiting the tunnel, the
ingredients stream down and gravity assembles them onto the waiting base while
the camera counter-orbits; (4) packshot — after one overhead hero beat, a snap
wipe into the animated ENDCARD.
```

#### 攝影機 DNA（這段決定它像不像真的高速商業片）

```
CINEMATOGRAPHY DNA — shot like a real high-speed tabletop food commercial:
Phantom-style high-speed capture, probe-lens macro passes that travel along the
surface, extreme slow-motion physics, hard speed ramps between beats,
motion-control smoothness, practical in-camera feel — real steam, real juice
droplets, natural imperfections.
```

現實對照：這型態在實拍現場是 Phantom Flex 4K（1,000+ fps）＋ 微距／內視鏡鏡頭 ＋ Bolt 機械臂。寫這三樣的**效果**（不是器材名）就會拿到對的質感。

#### PERSISTENCE LOCK（這型態最重要的一塊，不寫必崩）

```
PERSISTENCE LOCK — THE STACK ONLY EVER GROWS: once a layer has landed, it remains
physically present and partially visible for the entire rest of the film. When a
layer lands on those beneath it, their edges remain clearly visible protruding
beneath it in every subsequent frame, including the hero beat. No layer ever
disappears, dissolves, or is replaced. The finished product in the hero shot
shows all eight layers: {逐層列出}.
```

#### 時間骨架

`0–2s` 微距 sear → `2–2.8s` 翻起入 void → `2.8–5.3s` 隧道穿飛 → `5.3–6s` 動作接回現實 → `6–10.5s` 反向環繞組裝 → `10.5–12s` 頂拍英雄鏡 → `12–15s` 片尾卡逐件組出來。

#### 片尾卡鎖法

片尾卡做成 PNG（PIL 畫，不要 AI 畫），當 `end_image`，prompt 開頭宣告：

```
The provided END IMAGE is the exact final frame of the film. The film must finish
precisely on this frame. No other references exist — every frame is composed from
this prompt.
```

#### 材質誠實條款

每一種會出問題的材質單獨給一塊，寫上限：

- 乳酪：`matte-satin surface with micro-texture, thin edges slightly translucent, softens and drapes gently, keeps its slice identity — never plastic, never liquid, no pouring`
- 汁液：`one or two tiny beads at the patty edge on landing. Nothing more.`（不寫上限就會變成汁液爆炸）
- 蒸氣：`steam alive and torn by the camera in every frame`（要它活，但要明寫最後才靜止）

### 版本 B：情境產品片（飲料／美妝／保養）

**機制**：產品放在真實環境裡，用**博物館級的慢**推崇它。只有一個懸浮 beat，其餘物理嚴格。

#### craft 設定

| 項目 | 值 |
|---|---|
| FOV | 29°（英雄）／18°（三支景深）／12°（瓶頸微距） |
| 節拍 | 5 鏡，2.0–4.0 秒（刻意慢） |
| 緩動性格 | `long ease-in and ease-out`，每個移動都是單一連續機械滑軌 |
| 過衝 | **0%**（這型態不要彈性，要重量） |
| 轉場 | `soft cuts on stillness`（在靜止處切，不在動作中切） |

骨架：中近景沿瓶身升鏡（2.5s）→ 景深裡三支同款＋rack focus（2s）→ **懸浮**：主體傾斜 15° 慢轉，六個配角物件各自慢軌道環繞，鏡頭半圈環繞（4s）→ 極微距瓶頸／瓶蓋（2.5s）→ 最終靜物：物件慢動作落入杯中，濺起、靜下、一顆水珠滑落，凍住 1 秒（4s）。

**必寫**：配角物件 `never touching or occluding the hero's identity anchor for more than 4 frames`。沒這句它們會一直擋住產品。

**表面數值必寫**：`condensation beads 0.5–2mm at ~70% coverage with gravity trails and merging drops`。

### 版本 C：爆炸圖規格片（機械／3C／家電）

**機制**：沿**單一軸線**拆解成爆炸圖 → FPV 穿飛各層並打上追蹤式規格標 → 反向砸回組裝。

#### craft 設定

| 項目 | 值 |
|---|---|
| FOV | 29°（完整品）／84°（FPV 穿飛）／12°（各零件微距） |
| 規格標 | 一次**只存在一個**，硬切進硬切出 |
| 規格標停留 | 每個 1.0–1.5 秒（數字要讀得完） |
| 落地 | `stopping dead on contact with a crisp mechanical snap`（金屬＝零回彈） |

```
the product decomposes along one single vertical axis, every component separating
in a clean exploded-diagram stack, evenly spaced: {由上到下逐件列出}. Every part
stays rigid and intact while separating — no morphing, no fading; parts only
travel along the axis.
```

**規格標的兩層 lockup 寫法**：巨大粗體數字 ＋ 底下寬字距全大寫小標，純白扁平、無描邊無光暈，錨在零件上的精確點。

```
Each callout is a two-tier lockup: a huge extra-bold white metric numeral as the
dominant element, and beneath it a small all-caps label in medium weight with
very wide letter-tracking. All text pure white #FFFFFF, flat, no outline, no
glow, no shadow.
```

時間骨架：`0–1.5s` 完整品推近 → `1.5s` 速度變化進極慢動作拆解 → `3.5s` 回正速度開始 FPV → `4.5／6／7.5／9s` 各一個規格標（每個到下一個之前必須離場）→ `10s` 側面全貌 → 反向砸回，`each layer stopping dead on contact`，外殼最後關上 → `12.5s` 畫面鎖死，標題從模糊解析成清晰。

---

## §3 3D 建築／房地產（$2,000–15,000／分鐘，競爭最少）

**為什麼是藍海**：建商賣的是還沒蓋好的房子，他們沒有東西可拍，沒有 3D 就沒有銷售管道。傳統飛越動畫 **7–8 週**、每分鐘 $2,000 起（便宜的工作室都報每秒 $75）。客戶手上一定有靜態渲圖。

**行銷用飛越動畫的業界時長是 30–90 秒**：夠走完重點空間，短到能撐在物件頁或投資說明會上。15 秒的版本是社群版位用的濃縮版。

**機制：圖紙自己長成實物。** 一鏡到底，零剪接，所有場景轉換都是**世界內事件**。

### craft 設定

| 項目 | 值 |
|---|---|
| FOV | **84° 全片鎖定**（`Lens locked for the entire 15 seconds — one lens, one take`） |
| 鏡頭性格 | 強 anamorphic ＋ **必須同時禁掉光斑** |
| 字的位置 | 中央 70% 以內（邊緣畸變會吃掉字） |
| 緩動性格 | `All motion eases out; every move blends into the next with curved velocity` |
| 攝影機停止 | **只在最後 1.0 秒停** |
| 繪製速度 | 標題逐筆繪出，**每行 400ms** |
| 速度變化 | 重點空間放慢、過場加快 |

```
The film is a living blueprint that progressively extrudes into photoreal archviz.
There are no cuts, no dissolves, no fades, no editorial wipes anywhere: every
scene change is caused by a visible in-world event — the drawing's own linework
turning to matter, an extrusion, a plotted overlay — happening inside the scene
while the camera keeps moving. Drawing and reality are the same geometry: every
plotted line lands exactly where its material twin appears.
```

### 兩個鎖死的圖層

| 圖層 | 語言 |
|---|---|
| 圖紙層 | 誠實的 CAD：1px 銳利線、剖面斜線填充、帶刻度的尺寸箭頭、樓層標記、圖框標題章，**零光暈零泛光** |
| 現實層 | archviz 級 CGI：柔和全域光、物理正確玻璃、暖色混凝土微紋理 |

色票固定三色 ＋ 一層格線：藍圖深 `#16233F`、製圖白 `#EAF2FF`、強調色（螢光綠 `#D1EF17`）、格線 `rgba(234,242,255,0.12)`。

### 攝影機：一鏡到底的完整路徑

八段路徑範本見 `camera-language.md` §6，照抄改地名。

### 四個接縫（SEAM）＝ 四次場景轉換，全部是世界內事件

- **SEAM A**：畫好的剖面圖自己傾斜進 3D 空間，每條線在旋轉全程持續可見。
- **SEAM B**：材質化從線稿內部的街面層開始——「線自己變成物質」，**永遠沒有螢幕空間的邊界**。
- **SEAM C**：升起的環繞越過中層露台後鏡頭轉成正俯視——透視被壓平回平面圖，家具變成線符號。
- **SEAM D**：滑行直接穿過落地玻璃到露台，玻璃乾淨掠過鏡頭，不要畸變尖峰。

### 核心技術：INK-TO-MATTER RISE（全片的賣點）

```
The building materializes THROUGH its own drawing, like current running through a
circuit. On the ground floor the accent ribbon line ignites first — the plotted
stroke charges and thickens into painted metal along its own exact path, acting
as the fuse for the whole floor: from the ribbon, matter flows outward through the
connected linework — slab-edge lines swell into concrete with visible mass,
mullion lines crystallize glass between them with sky reflections arriving as it
sets, terrace outlines sprout real planting. Each floor ignites this way in
sequence, bottom to top. Above the highest ignited floor the tower is still pure
wireframe on blueprint paper.
```

天空用**氰版顯影**的比喻（不是漸層轉場）：

```
the blueprint paper develops like a cyanotype exposed to real sunlight: the deep
blue photochemically brightens into true sky, blooming outward from the
building's silhouette in a soft photographic development.
```

### PROOF OVERLAY（說服建商買單的一段）

拉遠不停，製圖線條直接疊回已建成的實體上，每條線精準落在它的材質分身上，尺寸箭頭在樓層間彈開——「圖與樓在同一格畫面裡是同一個物件」——然後線條沉入表面被混凝土與玻璃吸收。標題：`"Exactly as promised."`

**這段是簡報武器**：建商最怕的是「蓋出來跟圖不一樣」的客訴，這一段在視覺上就是「我們照圖蓋」的承諾。

### 時間骨架（15 秒）

`0–1.8s` 剖面自繪 ＋ 圖框章 → **SEAM A** → `1.8–3.6s` 軸測圖逐層自建 12 層 → **SEAM B** → `3.6–5.8s` ink-to-matter rise ＋ 氰版天空 → **SEAM C** → `5.8–7.8s` 平面圖向上擠出成實景公寓（橡木地板鋪出來、沙發從線符號充氣起來）→ **SEAM D** → `7.8–9.6s` 露台 beat ＋ 三個製圖標 → `9.6–11.4s` proof overlay ＋ 光線連續轉入金色時刻 → `11.4–13.2s` 金色時刻全景 ＋ 角落條件 chip → `13.2–15s` 全部線條收斂成 wordmark 底下的一條底線、圖章砸下 `"SALES OPEN"`、凍 1 秒、**整個畫面反向 un-plot 退回空白藍圖**。

### 必寫的正向約束

```
Materialization is always attached to the building's own plotted geometry and
ignites bottom-to-top: the frame never divides into a half-drawing / half-reality
split, and no straight vertical or diagonal boundary ever crosses the screen.
Reality never reverts after the rise. Drawing and reality are the SAME geometry.
No people anywhere in frame. No real city skyline, no map data, no real brands.
```

### 畫面上的字（建商真正要的資訊）

坪數（`"42 m²"`）、房型（`"1–4 BEDROOMS"`）、交屋期（`"Q4 2027"`）、限量價（`"FIRST 50 UNITS — PRE-LAUNCH PRICE"`）、`"SALES OPEN"`。

買方要看的是**價格、坪數、建材、可售狀態**——別只給美圖。**數字一律以客戶提供的為準，不可自行編造。**

### 客戶素材接法

建商的靜態渲圖 → `image_references`（鎖外觀）；沒有渲圖就先用 Nano Banana 生一張定案，讓客戶簽過再做影片。

**延伸提案**：建商通常有整個建案組合。一支片成功後可以接：施工紀錄、周邊生活內容、建商訪談、樣品屋虛擬導覽。這是從單案變成長期合作的路徑。

---

## §4 什麼時候要真的幾何

`minimax_h3` 是生成式的，鏡頭路徑無法精準控制。若客戶要**指定的相機路徑、精確的尺寸、可重複的改版**，改走真幾何：

- Higgsfield 的 `scene_builder_3d_*`：create_project → search_assets／import_asset → run_python 排場景與打光 → get_glb／get_blend
- 本機 Blender MCP

算出 viewport 序列後，把成果當 `start_image`／`image_references` 交給 H3 做質感與動態。

**判斷線：「看起來對」走 H3，「必須量得出來」走真幾何。**

產業對照供報價參考：建模在 3ds Max／SketchUp／Blender／Revit，算圖在 V-Ray／Corona 或即時引擎（Unreal／Twinmotion／Lumion），後期在 After Effects／DaVinci。Lumion 快但控制少，Unreal 控制多但工期長。你的路徑（生成式 ＋ 後製）的競爭力是**時間**，所以報價時強調交期，不要強調工時。
