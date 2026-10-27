---
name: motion-design
description: 製作 3D／2D 動態設計影片（motion graphics）的完整產線。六種可賣型態：SaaS 上市片、實拍加動態字卡、Hyper-Motion 產品片、3D 建築／房地產動畫、2D Explainer 說明動畫、編輯式資訊圖表片。走業界三道關卡（storyboard 定敘事 → styleframe 定畫風 → animatic 定時間），用具體的緩動與 frame count 寫 prompt，minimax_h3 生成，抽幀 QA，文字與 logo 後製。只要使用者說做動態設計、motion graphics、motion design、動畫、3D 動畫、2D 動畫、上市影片 launch video、產品動態廣告、hyper motion、建築動畫、房地產動畫、飛越動畫 flythrough、explainer 說明動畫、kinetic typography 動態文字、資訊圖表影片、logo 動畫、片頭片尾、動態字卡、motion 品牌規範，或丟一個產品／網址／建築渲圖要變成動態影片，都用這個 skill。改 prompt 文案手感時配 minimax-h3-motion-design；寫實拍分鏡時配 higgsfield-seedance-prompt。
---

# 3D／2D 動態設計產線

這個 skill 的產出不是「AI 生的漂亮影片」，是**可以收客戶錢的 motion graphics**。

業餘與專業的差別不在畫面好不好看，在三件可量測的事：

1. **時間有數值**。每個動作的長度、緩動曲線、過衝百分比、停留幀數都是決定過的，不是「感覺差不多」。細節見 `references/craft-laws.md`。
2. **畫風在動起來之前就定案**。業界走三道關卡：storyboard 定敘事 → styleframe 定畫風 → animatic 定時間。跳關卡＝用最貴的階段做最便宜的決定。見 `references/styleframe-and-boards.md`。
3. **畫面上每個字都對**。文字是 motion graphics 報廢的頭號原因，不是動態醜。見 `references/text-integrity.md`。

**鐵律一：AI 是素材，不是成品。** 2026 年的影片模型在動態物件上渲染文字仍然高風險，超過 30–60 秒的時間一致性會崩。所以片尾字卡、wordmark、tagline、網址、客戶 logo 一律後製或用 `end_image` 鎖；AI 負責「動」與「質感」。

**鐵律二：一支片一個核心機制。** 觀眾要能用一句話複述這支片在演什麼。沒有機制的片就是漂亮鏡頭集合，賣不掉。

---

## 環境事實（已驗證，不要猜）

| 項目 | 事實 |
|---|---|
| 主力影片模型 | `minimax_h3`（MiniMax H3）：2K only、4–15 秒、batch 1–4、aspect 21:9／16:9／4:3／1:1／3:4／9:16 |
| H3 的 media roles | `start_image`／`end_image`／`image_references`／`video_references`／`audio_references`（**五種都吃，這是它做動態設計比別的模型強的唯一原因**） |
| H3 費用 | 15 秒 2K = **30 credits**（`get_cost:true` 實測 2026-09-11）。無 unlim 路徑 |
| Marketing Studio motion | 固定費 + **5.94 credits/秒**，15 秒 ≈ 90 credits。**貴 3 倍** → 預設走 H3 |
| Studio preset 查法 | `marketing_studio_v2_presets` 的 category 只吃 `all／ugc／product-shot／motion／ads／posters／marketplace`；`hypermotion`、`saas_motion` 會 404 |
| Studio 四種 motion 型別 | `hypermotion`（format `hypermotion`）、`2d_motion`（`2d-product-motion`）、`saas_motion`（`saas`，吃 brand_url、不吃產品圖）、`mixed_media`（`mixed-media`） |
| **扁平 2D vector 的首選影片模型** | **Banaverse `gemini-omni-1.1-flash`（Omni Flash）**，admin 免扣點。形狀完整、不亂加東西、中文字穩、角色不亂飛。**代價是雲端排隊可能 30 分鐘以上**（進度卡在 5–35%）→ 全部先送出，同時用 Veo Fast 跑備案 |
| 趕時間的備案 | `veo-3.1-fast-generate-preview`（免扣點、8 秒上限、1–3 分鐘完成）。動態準，但**愛自己加爆星／白碎片／速度線／憑空圖示**，中文字 3 秒後開始崩 → 一定要配修片層 |
| 分鏡／styleframe 生圖 | Banaverse `gemini-3-pro-image`（Nano Banana Pro），admin 帳號**免扣點**（一般帳號依方案計點）。Higgsfield credits 才會扣 |
| 看影片 | Read 看不到 mp4 → `ffmpeg -vf "fps=1,tile=4x4"` 抽縮圖總表再 Read |
| PIL / 字型 | 只有 `/usr/bin/python3` 有 PIL；中文用 `/System/Library/Fonts/STHeiti Medium.ttc` |
| HTML 截圖 | **首選 Chrome headless**（2026-09-11 實測一次成功、免 server、免上傳）：`"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=15000 --screenshot=sheet.png "file:///絕對路徑/sheet.html"`（Google Fonts 的 link 也載得到）。備用：Playwright 擋 `file://`、in-app Browser 對本機檔不給截圖 → 先開本機 http server 再 navigate 截圖 |
| Banaverse MCP 的 refs | 只吃 data URL／base64／**Banaverse 自己回傳的 url**；本機檔要走 `scripts/banaverse.py` 但它需要 `BANAVERSE_API_KEY`。**實務解法：hero 鏡純文字生，拿它回傳的 url 當其餘所有格與影片的 refs**，不必 base64 |
| 影片備援（Higgsfield 沒點時） | Banaverse `banaverse-h3`（Motion H3，66 點，admin 免扣）：`banaverse_generate_video` 吃 `refs`（分鏡圖當首幀）、`durationSec` 4–15、`generateAudio:false`，回 jobId 後 `banaverse_get_video` 取件。**實測 2026-09-11 雲端排隊 20 分鐘以上都停在 2%**，不是 1–3 分鐘；送出後去做旁白與後製腳本，不要空等。`banaverse-h3-local` 零點但主機常離線，先試 local 失敗再切雲端 |
| Higgsfield 額度 | 2026-09-11 用完（「Out of credits on ultra plan」）；`generate_image_batch` 逐項回 `submission_failed`，已送出的照跑。沒點時全線改 Banaverse |
| 產出放哪 | 客戶專案已有資料夾就放它底下（如 `<專案>/06_motion/{design,storyboard_v3,prompt,vo,out}`），否則 `./motion-projects/<專案名>/{ref,board,style,prompt,out}` |

---

## 六種型態（先判型再開工）

| # | 型態 | 客戶 | 行情（美元） | 傳統工期 | 配方 |
|---|---|---|---|---|---|
| 1 | SaaS／科技上市片 | 軟體、App、硬體 | 500–3,000／15 秒 | 3–5 週 | `recipes-3d.md` §1 |
| 2 | 實拍＋動態字卡 | 創作者、小商家 | 200–500／60 秒 | 1–2 週 | `recipes-2d.md` §4 |
| 3 | Hyper-Motion 產品片 | 餐飲、美妝、飲料、3C | 1,000–5,000 | 2–4 週 | `recipes-3d.md` §2 |
| 4 | 3D 建築／房地產 | 建商、代銷（**競爭最少**） | 2,000–15,000／分鐘 | **7–8 週** | `recipes-3d.md` §3 |
| 5 | 2D Explainer 說明動畫 | App 新創、大學、線上課 | 3,000–12,000／60 秒 | 4–8 週 | `recipes-2d.md` §1–2 |
| 6 | 編輯式資訊圖表片 | 媒體、YouTuber、播客 | 1,500–4,000／分鐘 | 3–6 週 | `recipes-2d.md` §3 |

判型問三句：**主角是什麼**（實體產品／軟體介面／建築／抽象概念／真人）、**幾秒什麼比例**、**有哪些素材**（產品圖／渲圖／logo／實拍／網址）。

報價與修改輪次見 `references/business.md`。

---

## 產線（八階段，順序固定）

三道客戶關卡標成 **GATE**。GATE 沒過不准往下走——這是整條產線省錢的全部原因。

```
0 brief ─ 1 機制 ─ 2 script/beat ─[GATE A]─ 3 storyboard ─[GATE B]─ 4 styleframe
                                                                        │
  8 交付 ─ 7 後製與 QA ─ 6 生成 ─ 5 prompt ─[GATE C]─ animatic ────────┘
```

### 階段 0：收 brief、判型

缺這些先問，不要猜：主題與賣點、受眾、比例與秒數、聲音（旁白／配樂／全靜音）、畫面上一定要出現的字（品牌名、價格、日期、CTA）、可用素材、交付版位。

**問完要回報你聽到的版本**，讓對方修正。素材不夠支撐需求就直說，不硬做。

沒有產品圖的實體產品片，先生一張產品圖定案，不要讓影片模型每個鏡頭自己想像外觀。

### 階段 0.5：使用者丟參考片時 — 先反推它的語言，再談機制

`ffmpeg -i ref.mp4 -vf "fps=1,scale=480:-1,tile=5x3" -frames:v 1 tiles.jpg` 抽 1fps 縮圖 Read 進來，用四個問題拆成可套用的規格，寫進 design sheet 的 Rules 區：
1. **換場怎麼換**：整格硬切換色？形狀對位？鏡頭運動？
2. **字佔多大**：標題佔畫面幾成、一格幾句、強調怎麼做（麥克筆刷／底線／變色）。
3. **畫面上有幾個東西**：角色幾個、道具幾個。參考片通常「一個角色＋一個道具」；我們第一版分鏡最常犯的錯是一格塞 5–8 個道具、字變配角。
4. **有沒有 through-line**：哪個物件每一拍都在、逐拍變化。

反推完直接列一張「舊版 vs 新版」差異表（版面／換場／背景／角色／道具／強調／長度）給使用者看，比口頭解釋有效。實例：議網情生 v2（插畫場景）→ v3（整格換色＋超大字＋一扇門 through-line），一次過。

### 階段 1：核心機制（Core Mechanic）

提 **3 個機制**讓使用者挑。格式：

```
機制 N：{名稱}
- 一句話：{觀眾看完會怎麼複述這支片}
- 怎麼證明：{哪幾個 beat 讓這個機制成立}
- identity anchor：{主角身上那一個簽名特徵，每格都要看得到}
- 風險：{最可能崩的元素} → Plan B：{降階做法}
```

已驗證的機制原型：圖紙自己長成實物（房地產）、產品靜止而世界在倒影裡動、掉落動作帶你穿進異空間再帶回來、拆解成爆炸圖再組回去、單色世界只有產品有顏色、拉遠才發現尺度騙了你、一路連續變形零剪接、解析度世代在跳躍中升級。

**identity anchor** 是刻意設計的怪特徵（環上的平切面、太小的翅膀、陽台那條螢光綠扶手）。它同時解決原創性與跨鏡頭一致性。

### 階段 2：script／beat sheet → **GATE A**

有旁白的片先寫稿：**60 秒 ≈ 150 字**（中文約 200–240 字）。結構固定 **hook → problem → solution → proof → CTA**。

全靜音的片寫 beat sheet：每 1.5–2 秒一個 beat，每個 beat 一句「發生什麼」＋「畫面上哪句字」。

**GATE A 過了才畫分鏡。** 文案改一句是零成本，分鏡改一格是半天。

有旁白就在這裡先做 **VO timing pass**：用 TTS 粗配一版量真實時長，時長決定 beat 數，不是反過來。

### 階段 3：storyboard → **GATE B**

storyboard 管的是**敘事與節奏**，不是美術。60 秒出 **10–12 格**，15 秒出 **7–9 格**。每格要有：粗略構圖、對應的旁白句、這格的秒數、動態註記（誰動、往哪動）。

用 Banaverse 免扣點生圖，或直接用 HTML 排版出審圖板（模板 `assets/board-template.html`）。

生圖走法（實測穩定）：hero 鏡純文字生、`imageSize:"2K"`；其餘格把 hero 回傳的 url 放進 `refs`，prompt 開頭固定這句，角色髮型／服裝才不會漂：

> The reference image is a STYLE KEY only: copy its character design (逐項列：髮型、眼睛、上衣、褲、鞋), its ultra-bold flat Chinese type style, and its flat vector look exactly. Do NOT copy its layout.

審圖後的修法分兩種，**別搞反**：
- 版面、場景、角色漂掉（戴了帽子、換髮型、換性別）→ 重生那一格，prompt 補否定句（no hat）。
- **數量錯**（多一個鎖頭、12 顆點畫成 15 顆、中文重字「也能來來」）→ **PIL 像素手術**，不要叫 AI「edit」：實測 Nano Banana 的 edit 修好 A 又長出 B，兩輪都沒乾淨。塗底色、重畫幾何、蓋掉多餘物件，10 行 PIL 就結束。
- 中文短句可加 **TEXT LOCK**「exactly these N characters and nothing more」；分鏡上的字本來是示意，正式片字在後製疊，不必追求分鏡字 100% 對。

**GATE B 過的是「這個故事這樣說對不對」。** 過了才做美術。

### 階段 4：styleframe → **GATE C 的前置**

styleframe 管的是**畫風**，只做 **2–3 張**，不是每格一張。

- 第一張：hero moment，承載整個識別。
- 第二張（**必要**）：一個對比情境（忙 vs 空、亮 vs 暗），證明這套語言撐得住。
- 第三張（選配）：極端條件測試。

> 一張漂亮的 frame 只證明一個瞬間，兩張才證明一套語言。

**驗收標準只有一條**：一個從沒跟客戶講過話的動畫師打開這張圖，能不用問就知道成片該是什麼感覺嗎？做不到就是還沒定案。

**styleframe 必須在靜止狀態就成立。** 需要靠動態來解釋構圖為什麼弱，那是警訊不是捷徑。

要放的東西：真實色票（在最終光線下的相互關係）、生產尺寸的真字體（不是 placeholder）、不靠動態就能帶眼睛走的視覺層級、材質與景深（顆粒／模糊／光暈／質感）。

同時做一張 **design sheet**（元件標本頁，模板 `assets/design-sheet-template.html`）。兩者分工：styleframe 是「成片長怎樣」，design sheet 是「字形與元件長怎樣」，後者才是餵給模型的 `image_references`。

### 階段 4.5：animatic → **GATE C**

animatic 管的是**時間**：把 storyboard 排到時間軸上，配 scratch 旁白或配樂，只有粗動態。

做法（免生成、幾分鐘）：storyboard 的圖 ＋ 每格秒數 ＋ scratch 音軌，用 ffmpeg 串成影片。

```bash
# frames.txt: file 'shot1.png'\nduration 2.0\nfile 'shot2.png'\nduration 1.8 ...
ffmpeg -f concat -safe 0 -i frames.txt -i scratch_vo.mp3 -shortest -pix_fmt yuv420p animatic.mp4
```

**GATE C 過的是「節奏對不對、字讀得完嗎」。** 這一關會抓出最貴的錯：旁白唸不完、字來不及讀、beat 太密。

字的讀得完檢查：落定後至少停 **0.5 秒**；畫面文字 **4–7 字**以內（中文 6–10 字）。

### 階段 5：寫 prompt

打開 `references/prompt-blocks.md`，照 14 區塊寫滿；型態專屬內容抄 `recipes-3d.md` 或 `recipes-2d.md`；運鏡詞與 FOV 抄 `references/camera-language.md`；緩動與 frame count 抄 `references/craft-laws.md`；聲音抄 `references/sound-and-rhythm.md`。

三件漏了就毀片的：
- **BEAT SHEET 每個 beat 標死秒數**（`0.0–2.5s —`），實測 timed multishot 的切點會準確落點。
- **COPY LIST 是合約**，結尾必須有 `exact strings, nothing else appears in frame`。
- **禁用清單要具體**：不要寫「乾淨的畫面」，要寫 `no grain, no vignette, no lens flare, no floating bokeh circles, no chromatic aberration, no watermark`。

**注意與 seedance skill 的差異**：`higgsfield-seedance-prompt` 要求純正向敘述，那是實拍寫真的規則。**動態設計相反——禁用清單是必要的**，因為這個型態的敵人是「AI 預設的油膩感」，只能靠明確禁令壓掉。

### 階段 6：生成

```
generate_video: model minimax_h3, duration 15, aspect_ratio 16:9 或 9:16,
medias: [{role:"image_references", value:<design sheet>},
         {role:"start_image",      value:<定案的 hero styleframe>},
         {role:"end_image",        value:<PIL 畫的片尾卡>}]
```

- **先 `get_cost: true` 報價**再實跑。2026-09-11 帳戶餘額 0.96 credits，實跑前要確認儲值。
- 本機／附檔素材先 `media_upload_widget`（那一個 turn 只能呼叫這一個工具）。
- 2–4 個同 prompt 變體用 `count`；多支不同 prompt 用 `generate_video_batch` ＋ `jobs_wait`。
- 超過 15 秒分段，切點只落在自然接縫，細節見 `references/production.md` §4。
- **Higgsfield 沒點時走 Banaverse H3**（免上傳、免 media_id）：每個 block 一次 `banaverse_generate_video`，`model:"banaverse-h3"`（先試 `banaverse-h3-local`，回「主機離線」再切），`refs:[該 block 分鏡的 Banaverse url]`，`durationSec:10`，`generateAudio:false`，prompt = 12 區塊全文＋該 block 的 BEAT SHEET＋COPY LIST。多段一次全部送出再輪流 `banaverse_get_video`。限制：沒有 end_image、沒有 design sheet 當 image_references，每段一致性靠「分鏡首幀＋一致性重述」撐。
#### 扁平 2D vector：模型選擇與防呆 prompt

**`references/overlay-repair.md` 是這一段的完整版，動手前先讀。** 摘要：

- **首選 Omni Flash**（`gemini-omni-1.1-flash`，免扣點），**備案 Veo Fast**（`veo-3.1-fast-generate-preview`，免扣點、8 秒）。兩邊同時送，先到先用。
- **prompt 三招，比事後修片有效十倍**：
  1. **元件清單 + 禁止新增**：先逐項列出畫面上有什麼，再明令 `Do NOT invent or add any new object, icon, symbol, star, sparkle, flash, burst, speed line, shard or decoration`，數量寫死（`exactly four round dots`）。這一招直接消滅爆星、白碎片、憑空圖示。
  2. **把角色關在活動範圍裡**：`The character NEVER rises above the line; his head must always stay well below the headline. He does not jump.` 「字蓋住臉」九成是角色跑上去，不是字的錯。
  3. **TEXT LOCK，且不要寫秒數**：字第一幀印好、永不動、永不重繪；用 `first… then… finally…` 取代 `0.0–1.6s`，否則模型會把時間碼畫進畫面。
- **refs 就是真相**：分鏡上刪掉的元素，refs 若還是舊圖一定會長回來（QR 實例），`negativePrompt` 擋不住 → 改過的分鏡要重新上傳取新 url。
- **畫質**：1080p 直出偏軟，setpts 加速後更明顯 → norm 階段加 `hqdn3d=1.5:1.5:3:3,unsharp=5:5:0.7:5:5:0.0`，`-crf 15`。
- **旁白先量再排**：中文約 **3.8 字/秒**，10 秒 block 旁白 ≤ 36 字；超過就縮句，**不做 atempo**。旁白用 Banaverse `gemini-tts` voice `Puck`＋台灣口音指示（edge-tts 會被嫌「太 AI」），配樂 `lyria-3`，壓低用 `sidechaincompress`，注意 `asplit` 陷阱。

### 階段 7：後製與 QA

AI 輸出是**素材**，不是成片。固定五道後製：

1. **抽幀 QA**：`ffmpeg -vf "fps=1,tile=4x4"` 出總表，Read 進來逐項打勾（清單見下）。
2. **修片層**：照 `references/overlay-repair.md` 的四種手法修破損與文字。**鐵律：疊層永遠在最上層，貼之前先量角色的活動範圍，並在 3 幀上合成預覽再渲染。能不貼就不貼。**
3. **文字與 logo**：PIL 畫 overlay，ffmpeg 疊上；或已用 `end_image` 鎖好就驗證尾幀。
4. **畫質**：需要時 upscale／補幀（補幀一定放最後，前面先做完降噪與放大）。
5. **聲音**：音效落點對齊視覺的「加速點」與「落地點」，落地音只在物件真的停住／貼上／出現時才給。

**QA 清單**（照這個順序，不要跳）

- [ ] **逐字比對 COPY LIST**：拼字、標點、大小寫、空格
- [ ] **色票**：強調色在每個 beat 是同一個色（金色光下的螢光綠最容易偏黃）
- [ ] **identity anchor** 每格都看得到
- [ ] **層級分離**（2D＋3D 混合）：2D 元素有沒有偷吃到光影或陰影
- [ ] **數據誠實**：百分比條的填色長度＝標示的百分比
- [ ] **堆疊不消失**（組裝類）：已落下的層有沒有後來不見
- [ ] **讀得完**：每句字落定後停住 ≥ 0.5 秒
- [ ] **禁用清單**：有沒有跑出顆粒／光斑／浮動散景／色差／浮水印
- [ ] **疊層沒有蓋到角色**：抽角色動作最大的那一幀，看頭、手、腳有沒有被色塊切掉
- [ ] **沒有重影**：影片自己的字和疊上去的字沒有錯位雙重邊
- [ ] **模型沒有自己加東西**：對照元件清單，多出來的爆星／碎片／圖示一律算 bug
- [ ] **尾幀**：最後 1 秒真的凍住，沒有多長出畫面
- [ ] **靜音可讀**：關掉聲音看一遍，資訊還完整嗎（社群版位 85% 是靜音播放）

先看總表再決定重生，不要盲目重跑。

### 階段 8：交付

一次交五樣：成片（各比例）、QA 縮圖總表、**prompt 原文**（客戶改版的資產）、styleframe 與 design sheet、以及 beat sheet。交付規格見 `references/production.md` §6。

---

## 客戶 notes 翻譯表（最常用的一張表）

客戶說的話不是要修的東西。**先問是哪一秒**，再對照這張表。

| 客戶說 | 可能的真正問題 | 先動哪個 |
|---|---|---|
| 「不夠順」 | 緩動是線性／時長太短／攝影機太急／物件沒有重量 | 先看緩動曲線，再看時長 |
| 「太快了」 | 落定後沒有停留／stagger 太密／beat 排太滿 | 加停留幀，不要放慢整體 |
| 「太慢了」 | 每個動作都在動，沒有空拍 | 加一個純停住的 beat，不要加快每個動作 |
| 「有點廉價」 | 過衝太大／彈跳超過兩次／漸層與光暈太多 | 過衝降到 3–8%，彈跳砍到一次 |
| 「不夠有力」 | 沒有預備動作／落地沒有壓縮／沒有音效落點 | 加 2–4 幀預備，落地給 1 幀壓縮 |
| 「看不懂」 | 沒有核心機制／一次動太多元素 | 回階段 1；一次只讓一個元素動 |
| 「字看不清」 | 停留不足 0.5 秒／字級太小／疊在雜亂處 | 加停留、放大、指定文字區域 |
| 「不像我們品牌」 | 沒有 design sheet／強調色用法不一致 | 回階段 4 補 design sheet |

---

## 常見失誤

| 症狀 | 原因 | 解法 |
|---|---|---|
| 字融化／拼錯 | 沒寫 TEXT LOCK、字太多太小 | COPY LIST ＋ TEXT LOCK；長字串改後製 |
| 每個鏡頭產品都不一樣 | 沒鎖參考圖、沒重述 identity anchor | 產品一律 `image_references` ＋ 每段重述 |
| 動態像廉價模板 | 所有元素同時進場、緩動是預設值 | 一次一個元素；緩動查 `craft-laws.md` |
| 2D 角色被打光有陰影 | 沒寫層級分離法則 | 明寫「2D 永不接受光照與陰影，破壞此規則即破壞風格」 |
| 圖表數字與長條不符 | 讓模型自己動長條 | 百分比條一律「第一幀就印好、永不動畫」 |
| 過場很糊很 AI | 用 dissolve／morph 當轉場 | 改成世界內事件轉場或形狀對位剪接 |
| 花了很多 credits 才發現版面錯 | 跳過 GATE B／C | 分鏡與 animatic 都是免費的，不准跳 |
| 客戶第三輪還在改大方向 | GATE A 沒真的過 | 每個 GATE 要拿到明確的「這版可以」 |
| 分鏡「很漂亮但不像 motion」，每格像插畫海報 | 字太小、道具太多、背景畫場景 | 回階段 0.5：整格換色、標題 40–60%、一格 1–2 個道具、一個 through-line 物件 |
| AI edit 修一個錯長出另一個錯 | 用生成模型做數量／位置修正 | 數量、位置、蓋掉多餘物件一律 PIL；生成模型只負責「重畫整格」 |
| 角色跨格漂移（帽子、髮型、性別） | refs 只給一次、prompt 沒逐項描述 | 每格都帶 hero url＋STYLE KEY 句型逐項列外觀＋否定句 |
| Higgsfield batch 一半 submission_failed | 額度用完 | 已送出的照收，其餘切 Banaverse；不要重送同一批 |
| Banaverse H3 停在 2% 很久 | 雲端排隊 | 正常，20 分鐘以上也發生過；先做旁白與 assemble 腳本，不要一直輪詢 |
| 角色身上有白色破片、爆星、速度線 | 模型自己加裝飾 | 換 Omni Flash ＋ prompt 寫元件清單與禁止新增 |
| 字蓋住角色的臉 | 角色往上跑進字區 | prompt 鎖住角色高度與「不得跳起」；該段盡量完全不貼疊層 |
| 色塊不完整、頭被切一半 | 用整塊不透明矩形貼字 | 改 glyph 遮罩，或整段不貼 |
| 文字重影、邊緣糊 | 半透明遮罩疊在影片自己的字上 | 先用底色抹掉再整塊重貼 |
| 一條補接的線橫過角色的手 | 貼圖進了角色活動範圍 | 量 3 幀的最大外框；讓元件邊緣對齊抹除起點，不要另外畫線 |
| 刪掉的元素又長回來（QR） | refs 還是舊分鏡 | 用改過的分鏡重新上傳當 refs；negativePrompt 擋不住參考圖 |
| 數字中途變形（24 → 2） | 翻頁動畫把數字重繪 | prompt 明寫「數字永遠是 24，不得重繪、不得部分翻轉」 |
| ffmpeg 報 `Stream specifier 'vo' matches no streams` | 一個 filter label 被消費兩次 | `volume=2.2,asplit=2[vo1][vo2]` |
| 修好一段就整條組裝掛掉 | 組裝腳本硬性要求每段都有疊層檔 | 腳本加 `if [ ! -f ovl/$k.png ]` 的純轉檔分支 |
