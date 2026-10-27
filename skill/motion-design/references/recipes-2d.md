# 2D 動畫配方

五種已驗證的 2D 型態。2D 比 3D 難的地方不在畫面，在**字**：2D 片通常字很多，字一錯整支片就廢。先讀 `text-integrity.md`。

共用：緩動與幀數查 `craft-laws.md`，聲音與旁白字數查 `sound-and-rhythm.md`。

**2D 世界的攝影機一律鎖死。** 動態全部來自元素、變形、整幀換色。推鏡的 2D 片會立刻讀成 PowerPoint。

---

## §1 純 2D 向量 Explainer（App／課程／服務）

**機制**：一個主角穿過 3–4 個世界，每個世界換一次底色，證明一件事（一張票玩遍全城、一個工具取代四個工具）。

### craft 設定

| 項目 | 值 |
|---|---|
| 攝影機 | **完全鎖死**，唯一的「運鏡」是元素縮放 |
| 節拍 | 8 beat，每 1.6 秒一個（換色落在節拍上） |
| 緩動性格 | 全部彈性，`nothing eases linearly — everything overshoots and settles` |
| 過衝 | 12–20%（玩樂調性） |
| 壓縮 | 上限 20% |
| stagger | 逐字 30ms、chip 60ms |
| smear | 只在最快的 1–2 幀 |
| 動態模糊 | **無**（`no blur of any kind`，純向量沒有鏡頭） |

### 風格宣告（照抄）

```
App launch film, 16:9, 30fps, 15 seconds, SUPER 2D VECTOR MOTION — flat
illustration style: bold geometric shapes, solid fills, no gradients, no
outlines, no textures, no 3D, no photorealism. Everything is crisp vector:
rounded rectangles, perfect circles, chunky limbs, oversized simple shapes.
Motion is snappy shape-morph animation: elements stretch, squash, morph into one
another, and backgrounds swap color in hard full-frame switches ON the beat.
```

### 主角設定（中性化是為了任何市場都能用）

```
THE HERO CHARACTER: a simple flat vector person — round head, no facial features
except two dot eyes, chunky rounded body, oversized rounded sneakers in {accent}.
Genderless, ageless, race-neutral (warm tan #E8A87C skin tone as flat fill).
Moves with exaggerated 2D animation principles: anticipation squash before every
jump, stretch in flight, overshoot on landings, smear frames on fast moves. Same
character in every beat.
```

### 動態語言：HARD SWITCH ＋ MATCH MORPH 交替

- 節拍落在**整幀底色硬換**上（像翻頁），不是漸變。
- 換色之間一切都是彈性的：squash-stretch 上限 20%、快動作有 smear frame、轉場用形狀變形（啞鈴變地圖釘、地圖釘變瑜珈墊、瑜珈墊捲起變游泳浮條）。
- **一個轉場只有一個帶頭元素。**

### 攝影機鎖死宣告（要寫到囉唆為止）

```
CAMERA & MOTION: camera is LOCKED — all dynamism lives in the elements, morphs
and background switches. The only camera-like move is the phone scale-up at 9.6s,
executed as an element scale, not a push-in. Smear frames on fast actions, held
poses between actions — classic 2D timing: fast-in, hold, fast-out.
```

**`fast-in, hold, fast-out`** 是 2D 節奏的全部。中間那個 hold 是業餘最常漏掉的——他們讓所有元素一直動。

### UI 物件的畫法

```
The APP OBJECT: a rounded-rectangle phone shape in {accent} with an off-white
screen showing ultra-simplified vector UI — map pins, cards as colored rounded
rects, one big circular CHECK button. UI elements are chunky and readable at a
glance, never detailed, never a real interface.
```

畫真的介面一定爛；畫「胖版示意介面」才對。

### 時間骨架（15 秒／8 beat）

`0–1.6s` 痛點（主角被壓住）→ `1.6–3.2s` 解法出現（手機／工具進場，主角眼睛放大到 130%）→ `3.2–4.8s` 世界一（硬換色）→ `4.8–6.4s` 形狀變形進世界二 → `6.4–8.0s` 形狀變形進世界三 → `8.0–9.6s` 回中性世界，三個世界變成三張浮動卡 → `9.6–11.2s` UI 特寫 beat（三步流程 ＋ 按下按鈕 ＋ 彩帶）→ `11.2–12.8s` 主角跑過畫面，背景每一步換一個世界色 → `12.8–15s` 定版（wordmark ＋ 副標 ＋ 膠囊 CTA ＋ 主角一個小勝利動作 ＋ 凍 0.8 秒）。

### 一致性鎖

```
Flat fills only: zero gradients, zero outlines, zero shadows except one flat
darker-tone ellipse under the character as ground contact. All props built from
basic geometry — circles, rounded rects, simple curves.
```

---

## §2 3D ＋ 2D 混合（最好賣的 explainer 型態）

**機制**：Octane 級 3D 物件與扁平 2D 角色**實體互動**。兩層互相碰撞就是這個風格本身。

### craft 設定

| 項目 | 值 |
|---|---|
| FOV | 3D beat 用 47°／29° |
| 節拍 | 8 beat，每 1.8 秒 |
| 緩動性格 | **兩套**：3D beat 電影感 ease-out；2D beat 卡通節奏 |
| 過衝 | 3D 3–8%、2D 12–20%（刻意不同，這是層級分離的一部分） |
| 轉場 | 只用硬切與對位剪接（顏色或動作） |

```
HYBRID STYLE: premium 3D CGI render fused with flat 2D vector motion. The 3D
layer — physical objects — rendered Octane-grade: PBR materials, soft studio
lighting, real physics, slow-mo moments. The 2D layer — characters, doodles, UI
chips, scribble arrows — is pure flat vector with bold shapes and no outlines,
animated with snappy squash-stretch, living ON TOP of and AROUND the 3D objects:
vector characters walk on rendered surfaces, flat doodles orbit real geometry.
The two layers stay visually distinct — 3D is glossy and lit, 2D is flat and
graphic — but physically interact: this contact IS the style.
```

### 層級分離法則（不寫這塊就不是這個風格，是廉價貼圖）

```
STYLE CONSISTENCY (the core rule): 3D objects are ALWAYS fully lit, PBR, casting
soft shadows, with real physics. 2D elements are ALWAYS flat solid fills, zero
gradients, zero outlines, zero received lighting, zero cast shadows — even
standing on glossy 3D surfaces (only mirror reflections of them may appear on 3D
glass/chrome). The layers interact physically (books tilt under character hops,
ribbon bounces on the flat chest) but never exchange render properties. Breaking
this rule breaks the style.
```

### 互動事件清單（每個 beat 要有一個，這是這型態的靈魂）

- 2D 角色從 3D 建築的門走出來，沿畫面底緣排成橫飾帶
- 2D 角色把 3D 書當樓梯爬，**每次落地那本 3D 書真的傾斜 2° 再回正**
- 扁平塗鴉元素反方向環繞一個打光的 3D 物件
- 3D 玻璃板往 2D 角色傾倒成斜坡，角色走上去，**扁平的顏色在反射裡加倍（反射是 2D 唯一能得到的「光」）**
- 3D 獎牌降下套上扁平角色的圓頭，緞帶物理彈一下（**跟隨動作**：主體停了緞帶晚 2–4 幀才停）

**互動的量化寫法**很重要：「書會傾斜」無效，`each landing makes the 3D book physically tilt 2 degrees and settle` 有效。

### 顏色是橋樑

```
Acid #D1EF17 must match EXACTLY across both layers — the color is the bridge
between worlds.
```

同一個強調色要同時存在於 3D 材質與 2D 填色。這是兩層看起來屬於同一支片的唯一機制。

---

## §3 編輯式資訊圖表片（$1,500–4,000／分鐘，最難也最貴）

**為什麼貴**：整支片都是文字、數字、圖表，一個數字錯整支片報廢。這是 AI 最後才攻下的型態。買的人是媒體、YouTuber、播客、任何有數據要講故事的人。

### craft 設定

| 項目 | 值 |
|---|---|
| 攝影機 | 鎖死或極慢推進，**能量來自尺度變化不是鏡頭抖動** |
| 節拍 | 四構圖、三剪接（比其他型態少，每段要有閱讀窗） |
| 緩動性格 | `fast deceleration, a slight overshoot and a stable landing` |
| 剪接 | **一律形狀對位**（三角接三角、圓接圓） |
| 數據元素 | **第一幀就印好，永不動畫** |
| 發光 | **零**（`nothing emits light anywhere in the film`） |

**機制**：紙藝拼貼 ＋ 形狀對位剪接。一個完整故事、四個構圖、三個俐落剪接。

```
Create a richly colored, boldly composed editorial mixed-media short with a
rhythm full of surprises. Not a quiet educational diagram: use oversized printed
photographic cutouts, paper ribbons, contrasting display typography and precise
shape-match cuts. One complete story, four distinct compositions, three crisp cuts.
```

### 視覺系統

```
Saturated {colorA}, vivid {colorB} and bright {colorC} are the main colors, with
pure black and cream for typography and printed photographs. Each composition has
one strong dominant background color rather than an all-over rainbow. The
character is the same person in black-and-white halftone photographic cutouts,
with rough white torn-paper borders and consistent appearance. Bold magazine
collage and refined 2D motion design: real paper texture, print dots, a little
tape and small paper-layer shadows from consistent upper-left light. Every
surface is flat matte printed paper: no glow, no neon, no bloom, no light halos,
nothing emits light anywhere in the film.
```

最後那句（**沒有任何東西發光**）是這個風格的分水嶺。少了它模型會給你霓虹科技感。

`small paper-layer shadows from consistent upper-left light` 這句是紙感的來源——紙層之間有薄陰影，而且光源方向統一。

### 動態原則

```
High energy comes from major changes of scale, silhouette matching, paper actions
and typographic composition, not incessant camera shake. Each beat forms its
composition rapidly, then preserves a short clear reading window. Objects enter
with fast deceleration, a slight overshoot and a stable landing; headlines retain
clear letterforms after landing. Cause and effect happen sequentially, with one
strongest visual focus at a time. Movement starts on the first frame, and a small
loop continues at the end. No empty waiting frames.
```

三句關鍵：**能量來自尺度變化不是抖動**、**每段構圖快速成形後留閱讀窗**、**第一幀就在動、結尾留小迴圈**。

### 四構圖骨架

開場（驚訝的瞬間，巨大人臉切紙 ＋ 一個動作）→ **形狀對位剪接**（三角形播放鍵對上三角形箭頭）→ 機制圖解（側面剖圖 ＋ 兩條路徑依序點亮再會合）→ **插入剪接**（圓形目標變成巨大黑圓盤）→ 疊加與結論 → **形狀對位剪接回開場的圓形**，拉遠揭露完整構圖、情緒收尾。

### 數據圖層（規則最嚴，見 `text-integrity.md` §3）

核心三句：

```
Every digit and label is printed complete from its first visible frame,
extra-bold, generously sized, never morphing, never redrawing, never counting up.

Percentage bars never animate: every bar that carries a percent label is printed
already complete in its final, correct state from its first visible frame and
stays frozen like a printed magazine chart.

Every percentage is proven by geometry: each percentage bar sits on a visible
full-length track with a thin black outline that represents exactly 100%, and the
fill length always equals the printed percent of that track.
```

**為什麼不能用 bar chart race**：那種「長條長高比賽」在生成式影片裡一定會讓數字與長度脫鉤。要做排名變化就分成兩張已印好的圖表，用形狀對位剪接連接。

### 旁白

逐字稿一次寫完，明寫哪句話對哪個構圖，並要求 `finishing the final sentence completely, with no paraphrasing`。字數換算見 `sound-and-rhythm.md` §4。

音效只做紙的動作（按鍵、紙張拍落、剪接重音），配樂永遠在旁白之下。

---

## §4 實拍 ＋ 動態字卡（$200–500／60 秒，最好賣的入門單）

**機制**：真人講話，字卡與圖形**在他說到那個詞的瞬間**組裝出來。

### craft 設定

| 項目 | 值 |
|---|---|
| 字卡緩動 | `fast attack, long soft settle, no bounce, no overshoot`（**這型態零過衝**） |
| 逐字 stagger | 極小且均勻（`a tiny even stagger`），整詞約 0.5 秒組完 |
| 落定狀態 | **螢幕空間鎖定、像素級穩定**，即使背景在動 |
| 出場 | 逐字溶解回模糊 |
| 同時動的元素 | **只有一個** |
| 顏色 | **只有兩色**（強調色 ＋ 純白） |

### 四種輸入的角色分工（H3 五種 role 全開）

| 素材 | role | 用途 |
|---|---|---|
| 實拍影片 | `video_references` | 鎖臉、髮型、服裝、房間、側光、鏡頭性格 |
| 一段人聲 | `audio_references` | 複製音色、口音、語氣，**不重用原始語音與時間** |
| design sheet 截圖 | `image_references` | **只拿字形與元件設計，不拿它的版面與背景** |

固定句型（不可簡化）：

```
Video 1 = the identity and environment reference. Use Video 1 to keep the
presenter's exact face, hair, wardrobe, the room, the warm side lighting and the
lens character identical.

Audio 1 = the voice reference. Clone the presenter's VOICE from Audio 1 — same
timbre, same accent, same casual energy. Do NOT reuse any of the original speech
or its timing: the presenter speaks ONLY the new dialogue written below,
naturally lip-synced, in the cloned voice.

Image 1 is a graphic-design system reference ONLY — copy its letterform shapes
and its element designs exactly; never copy its layout or background. From Image 1:
TYPE A = the bold all-caps lettering. OUTLINE TYPE = the stroke-only outlined
lettering. PILL = the rounded pill with dark text inside. STRIKE = the thick
strike-through line. BRACKETS = the four corner brackets. BADGE = the
rounded-square check badge. UNDERLINE = the thick rounded underline bar.
```

### 動態風格：LETTER CASCADE（Apple keynote 語法）

```
Motion style — calm, precise, expensive, Apple-keynote grammar: words assemble as
LETTER CASCADES — letters appear one by one, left to right, each fading up from a
soft gaussian blur into razor sharpness with a tiny even stagger, the whole word
assembling in about half a second with one confident ease — fast attack, long
soft settle, no bounce, no overshoot. Once assembled, every element is perfectly
frozen relative to the frame, pixel-stable, no jitter, no boil, crisp edges — the
graphics are screen-locked and stay perfectly stable even while the footage moves
behind them. Exits are letter-by-letter dissolves into soft blur. Only one element
animates at a time.
```

### 同步鐵律（決定它像專業後製還是像自動字幕）

```
Each graphic begins exactly when the matching spoken words start, or a hair after
— NEVER before.
```

寫法：`Exactly as he says "actually recorded", the words "NEVER RECORDED" assemble in the LEFT wall zone as a letter cascade of OUTLINE TYPE, and once assembled, solid {accent} fill floods into the outlines from left to right; holds frozen, then dissolves.`

### 文字區域要指名

```
Text zones: LEFT wall area in Shot 1, upper RIGHT area in Shot 2; text never
covers his face, hands, or the laptop.
```

### 兩色法則

```
every graphic element uses exactly two colors — {accent} and pure white; dark
#111111 appears only as text inside a PILL and as the checkmark inside a BADGE.
```

### 送分題：發明一個不存在的機位

第二鏡可以要求原始素材裡沒有的角度，並指定它是手持：

```
a hard cut to CAMERA B — a completely new angle that does not exist in Video 1,
and this camera is HANDHELD: a 35mm medium close-up filmed at arm's length from
his left side at roughly 45 degrees, with subtle natural handheld sway — organic,
alive, never shaky. Same room, same wardrobe, same lighting world — only the
viewpoint is new.
```

字卡仍然 screen-locked 穩如磐石，對比極強。

### 進階：字沉在主角後面

```
the word sits BEHIND the presenter in depth — his head and shoulders occlude the
letters
```

這一個效果就能讓客戶覺得你會 3D 追蹤。

### 授權

只做客戶自己的素材與**本人同意**的聲音。不要複製第三方的人聲。

---

## §5 動態文字（Kinetic Typography）

**機制**：整幀都是排版，鏡頭完全鎖死，只有圖層在動。適合功能清單、價格宣告、宣言式短片。

### craft 設定

| 項目 | 值 |
|---|---|
| 攝影機 | **完全鎖死**（宣告要寫到囉唆） |
| 節拍 | 6 段，1.5–2.5 秒 |
| 緩動 | 進場 ease-out **零彈跳零過衝**；出場 ease-in 加速離場 |
| 轉場 | **無淡入淡出、無溶接、無擦除** |
| 動態模糊 | 只加在移動層，**背景永不模糊** |
| 色閃 | 落定那一幀閃強調色，**四格內**回墨黑 |
| 字級 | 一律用畫面高度百分比 |

**世界**：柔和的粉彩漸層底維持整支片不變（給 hex）＋ 一層極細均勻底噪。全片一個字族（heavy geometric grotesque, Bold, 緊字距）。

### 攝影機鎖死宣告

```
CAMERA: locked-off static frame. The frame never moves. No push in, no pull out,
no pan, no tilt, no zoom, no dolly, no handheld, no shake, no roll, no parallax,
no drift, no reframing. Only the flat graphic layers animate inside the fixed frame.
```

### 動態規則

```
MOTION RULES: every element enters ease-out with no bounce and no overshoot,
every element exits ease-in and accelerates off frame, fast moves carry
directional motion blur on the moving layer only, the background never blurs,
nothing rotates except where stated, and there are no fades, dissolves,
crossfades or wipes.
```

### 一次性色閃技巧

```
each word flashes one accent colour on the frame it lands … then settles to
near-black ink within four frames.
```

這讓純文字片有打擊感又不俗。**只在落定那一幀閃**，持續上色就變成霓虹。

### 時間骨架（15 秒）

`0–2s` 標題逐字組裝 ＋ 周圍散落小標籤 → `2–4s` 卡片群從四邊飛入停在角落（進場有動態模糊、落定銳利，並在指定時間點原地從雙色調轉成全彩）→ `4–5.5s` 全部向中心收攏縮到消失，畫面短暫空白，一個巨大輪廓圖形出現 → `5.5–7.5s` 圖形縮成 inline 圖示，文字滑入成行，第二行逐字被替換 → `7.5–10s` 垂直清單向上捲動，只有穿過中央帶的那一項是黑色，兩支長箭頭永遠釘在左右不動 → 減速停在結論句，**最後半秒完全靜止**。

### 這型態的字最多，所以

- TEXT LOCK 必寫（`text-integrity.md` §2）
- 尺寸一律 `cap height about 7% of frame height` 這種寫法，給 px 沒用
- 捲動清單是唯一可以用**線性**緩動的地方（等速捲動），但要**減速停住**
