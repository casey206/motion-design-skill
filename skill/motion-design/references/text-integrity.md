# 文字與數據的正確性

Motion graphics 廢掉的原因幾乎都不是動態醜，是**字錯了**。客戶不會說「這個緩動不好」，客戶會說「我們公司名字拼錯」。

## 2026 年的技術現實（決定整個策略）

生成式影片模型目前的三個硬限制：

1. **移動物件上的文字風險最高。** 靜止的短字串還可以，貼在旋轉／飛行物件上的字幾乎必錯。
2. **時間一致性在 30–60 秒後崩。** 這是分段生成的真正原因，不只是模型的秒數上限。
3. **招牌、標籤、文件、介面文字經常是亂碼。** 遠景可接受，近景不行。

所以策略不是「想辦法讓模型畫對」，是**把重要的字拿出生成流程**。AI 負責動與質感，字由後製補上。這不是妥協，這是 2026 年專業做法的定義。

分層策略，由外而內：

| 內容 | 做法 |
|---|---|
| 客戶 logo、wordmark、網址、法律標示 | **一律不叫模型畫**。PIL 畫 PNG → `end_image` 鎖尾幀，或 ffmpeg overlay 後製 |
| 片尾字卡整張 | PIL 做成完整 PNG → `end_image`，prompt 宣告「最後一幀就是這張」 |
| 畫面中間的短標題（≤ 5 字的英文詞、數字） | 可以叫模型畫，必須寫 COPY LIST ＋ 逐字 QA |
| 長句、中文、多行小字 | 不要叫模型畫。要嘛後製，要嘛改設計讓它不需要 |
| 背景裡的文字 | 明寫 greeked（看不出是什麼字），不要給它機會拼錯 |

---

## §1 COPY LIST（合約）

畫面上會出現的每個字串，逐字列出，**最後那句是整塊的效力來源**：

```
COPY LIST — exact strings, nothing else appears in frame:
"One gym is a cage."
"Unlock every gym."
"from $4 / visit"
"HiggsFit"
"Try free — 7 days"
```

規則：
- 標點符號也算字串的一部分，句號、中間點、破折號都要照打。
- 每個字串**只在它自己的那個 beat 出現**。定版的圖章不可以提早出現：`Each string appears only in its own timed beat — the "SALES OPEN" stamp exists only in the final lockup, never earlier.`
- 文案節奏：每句短、有力、上市感；一行標題只有**一個**強調字上強調色。
- CTA 公式：可得性 ＋ 稀缺性／日期（`"Drops Friday"`、`"First 100 — on us"`、`"限量 50 戶 — 預售價"`）。

## §2 TEXT LOCK（字多的片必加）

COPY LIST 是「有哪些字」，TEXT LOCK 是「不准做什麼」：

```
TEXT LOCK: render every quoted string exactly as written, correctly spelled, all in the
same single bold geometric grotesque. Do not translate, do not paraphrase, do not add any
other text, no subtitles, no captions, no watermark, no logo, no UI chrome, no letters or
numbers other than the strings listed above.
```

再加一句抗融化：`Do not misspell any word. Letters do not liquefy or shatter.`

**中文的現實**：影片模型畫中文字幾乎必錯。中文的畫面文字一律後製（PIL ＋ ffmpeg），prompt 只要求留出乾淨的色塊區域：`keep the upper third of the frame a clean flat area of {color} with no elements, for later compositing.`

## §3 數據誠實（編輯式資訊圖表的命脈）

最常見的災難：模型把長條圖做成「長高的動畫」，於是標示 50% 的條長到滿格。一個數字對不上，整支片報廢。

**三條規則，逐字照抄**

```
Every digit and label is printed complete from its first visible frame, extra-bold,
generously sized, never morphing, never redrawing, never counting up.
```

```
Percentage bars never animate: every bar that carries a percent label is printed already
complete in its final, correct state from its first visible frame and stays frozen like a
printed magazine chart. Only elements without percentages may animate through their
containers, with fast deceleration and a slight overshoot before locking still.
```

```
Every percentage is proven by geometry: each percentage bar sits on a visible full-length
track with a thin black outline that represents exactly 100%, and the fill length always
equals the printed percent of that track — 100% means the track is completely full edge to
edge, 50% means the fill occupies exactly the left half of the track and the right half of
the track is visibly empty inside its outline. A printed percent never contradicts its bar
in any frame; if the label says 50%, the fill is exactly half, never full.
```

**每個圖表元件要寫成一段散文**，講清楚它在哪、長什麼樣、哪個顏色、寫哪幾個字、動或不動。範例（兩列比較條）：

```
In the open space of the upper-left corner, place a two-row comparison stat built on two
identical horizontal paper tracks with thin black outlines: both tracks exactly the same
length and height, sharing the same left edge and the same right edge, stacked one directly
above the other; each full track represents 100%. The entire stat is printed already
complete and correct from its first visible frame and never animates. Top row, labeled
"HEAD" with "100%" just past the track's right end: this track is completely full from edge
to edge — left half blue, right half orange. Bottom row, labeled "MIC" with "50%" just past
the track's right end: this track is filled only on its left half with solid blue, the fill
ending exactly at the track's midpoint, while the entire right half is empty inside its
black outline — the visibly empty half is what makes the 50% true. There is no orange
anywhere in the MIC track in any frame.
```

**數據層不准改動原有畫面**：

```
This layer never changes any described action, headline, layout or cut; every element sits
in empty background space, built from the same paper-collage system.
```

**數字來源**：客戶給的數字照用，沒給的不要編。物理常數、市場數據這類要標得出來才能放上畫面。

## §4 PIL 後製手術

**環境**：只有 `/usr/bin/python3` 有 PIL（brew 的 python3 沒有）。中文字型 `/System/Library/Fonts/STHeiti Medium.ttc`（`PingFang.ttc` 路徑不存在；Heiti TC 缺「・」字形，分隔改用「，」）。

**片尾卡貼法**

```bash
# 1. PIL 畫 overlay PNG（透明底，1920x1080 或 1080x1920）
/usr/bin/python3 draw_endcard.py   # 輸出 endcard_overlay.png

# 2. ffmpeg 疊上去，最後 3 秒淡入
ffmpeg -i in.mp4 -i endcard_overlay.png -filter_complex \
  "[1:v]format=rgba,fade=t=in:st=12:d=0.4:alpha=1[ov];[0:v][ov]overlay=0:0" \
  -c:a copy out.mp4
```

**當 end_image 用**（更好，模型會自己收斂到這張）：PIL 畫好完整的一幀（不是透明 overlay，是完整畫面），上傳成 media，`medias: [{role:"end_image", value:<id>}]`，prompt 第一句宣告 `The provided END IMAGE is the exact final frame of the film. The film must finish precisely on this frame.`

**小錯字的像素手術**（順序不可顛倒）
1. 用色彩遮罩偵測錯字的位置與字色。
2. **垂直內插**擦除舊字（水平內插會在鞋帶、皺褶這種複雜紋理留下橫向汙痕）。
3. 重繪正確的字，或從別的幀／舊版羽化移植過來。
4. 曲面物件上的商標移除改走「裁切 → AI 局部修 → 羽化貼回」。

**不要用 AI 以圖修圖處理文字**：它每次重繪整張，已經修好的字會再次跑掉。若不得不用，修完必須**逐字重檢整張圖**，包含先前已修好的區域。

### 數量漂移的根因解法：把 N 個相似物件改成 1 個有 N 段的物件

2026-09-11 連續踩到四次：要求「五顆卡匣」「五個工位」時，模型穩定地給出六個，或把某個顏色用兩次。加 count lock、逐個點名、逐項否定都只能壓一半，而且那些物件互相嵌合時 PIL 也拆不掉（拆一個要重建它背後的幾何，那是修圖不是像素手術）。

**有效的解法是改設計而不是改 prompt：把「五個分離的相似物件」改寫成「一個有五段的連續物件」。** 實例是把五個獨立工位改成「一體成形的階梯平台，五階各有一塊彩色檯面」——單一物件沒有可增生的間隙，一次就對。

判斷方式：如果你發現自己在同一個數量上重生第三次，停手，回去看能不能把它描述成一個整體。

### 重生 vs PIL 的分流（2026-09-11 實測，別搞反）

| 問題型態 | 走哪 |
|---|---|
| 版面、場景、角色漂掉（戴了帽子、換髮型、換性別） | **重生那一格**，prompt 補否定句（`no hat`） |
| **數量錯**（多一個鎖頭、12 顆點畫成 15 顆、中文重字「也能來來」） | **PIL 像素手術** |
| 位置錯、多出不該有的物件 | **PIL**（塗底色、重畫幾何、蓋掉） |

實測：Nano Banana 的 `edit` 修好 A 又長出 B，兩輪都沒乾淨。**數量與位置的修正 10 行 PIL 就結束**，生成模型只負責「重畫整格」。

中文短句可加 TEXT LOCK：`exactly these N characters and nothing more`。但分鏡上的字本來是示意，**正式片的字在後製疊**，不必追求分鏡字 100% 正確。

## §5 可讀性（與 craft-laws 對齊）

字對了還要讀得完。三個數值，違反任何一個就等於沒放字：

| 規則 | 數值 |
|---|---|
| 落定後停留 | **≥ 0.5 秒** |
| 畫面文字長度 | 英文 4–7 字、中文 6–10 字 |
| 一行標題的強調字 | 只能一個 |

**字越長越多，動態就要越簡單。** 逐字瀑布式進場只適合 1–3 個字的短詞；一句長句配複雜動態＝沒人讀得完。

### 強調色在深底上會消失（2026-09-11 實測踩到兩次）

品牌強調色多半是為淺底設計的。深藍品牌色 `#0014FF` 壓在深藍底 `#131F47` 上，全尺寸勉強可讀，縮到手機或過壓縮的動態消息就沒了。同一個錯我在片尾的 mono 行與六格標題的強調字各犯一次。

**深底上不要用深色強調字，改成「米白字 ＋ 強調色實色塊」**（麥克筆色塊）。品牌色以實色塊出現比以細字出現更有存在感，可讀性也成立：

```css
.kw em{position:relative;display:inline-block;color:#FCFAF5;z-index:0}
.kw em:before{content:"";position:absolute;left:-.06em;right:-.06em;top:.14em;bottom:.10em;
              background:#0014FF;z-index:-1;transform:skewX(-3deg)}
```

淺底才用「強調色當字色」的寫法。**判斷方式不是看色票好不好看，是把強調字與底色放在一起縮到 1/4 大小看還讀不讀得到。**

### 共用 CSS head 被內嵌的陷阱

用腳本產生多格 HTML 時，如果是把共用 head 的**內容**在產生時內嵌進每個檔案，那之後改共用 head **不會**回頭影響已經寫好的檔案——改完必須重新產生所有格，否則渲出來還是舊樣式。實測就是這樣讓一次強調色修正完全沒生效。要嘛改成 `<link>` 外部引用，要嘛每次改 head 就跑一次重建腳本。

這三項在 animatic 階段（GATE C）就要驗完，不要等生成。細節見 `craft-laws.md` §8 與 `styleframe-and-boards.md` §3。

### 用瀏覽器實測文字有沒有超出畫面（不要用眼睛猜）

HTML 做的分鏡、design sheet、字卡圖層，全部可以機械量測。在頁面注入一段腳本，用 `--dump-dom` 把結果讀回來：

```js
// 關鍵兩點，少任何一個量出來的數字都是錯的
document.fonts.ready.then(measure);      // 1. 等字型載完再量，否則量到 fallback 的字寬
const r = document.createRange();        // 2. 用 Range 量「文字墨水」
r.selectNodeContents(el);                //    不要用 el.getBoundingClientRect()，
const rect = r.getBoundingClientRect();  //    置中容器的 rect 永遠是滿版，會誤判成超出
```

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu   --hide-scrollbars --window-size=1920,1080 --virtual-time-budget=25000   --dump-dom "file:///絕對路徑/beat1.html" | grep -o '<pre id="MEASURE_REPORT">.*</pre>'
```

**文字安全區**：1920×1080 取 `80, 48 → 1840, 1032`（四邊各約 4%）。直式 9:16 另外套上 12%／15% 的 SAFE ZONES。

**把量測變成渲染的前置關卡**：渲圖腳本先量，有任何一處超出就 `sys.exit` 不准渲。這樣超框的分鏡永遠不會流到客戶手上。實例 `ThePocketCompany_launch_film/board/v6/render_v6.py`。

### 中文字族的陷阱

`font-family:"Bebas Neue"`、`"Outfit"`、`"JetBrains Mono"` 這些拉丁字族**沒有中文字形**，裡面的中文會靜默掉到系統備援，字重與字寬都跟設計稿不同。**每一個可能放中文的字族都要補上 `"Noto Sans TC"`**：

```css
.plate{font-family:"Bebas Neue","Noto Sans TC",sans-serif}
```

量測腳本順手回報 `document.fonts` 的載入狀態，就能發現「這一格的中文其實沒用到 Noto」。

## §6 交片前的字檢查清單

- [ ] 每個可見字串逐字比對 COPY LIST（含標點、大小寫、空格）
- [ ] 品牌名、人名、地名、價格、日期與客戶提供的原文一致
- [ ] 沒有多長出來的字（浮水印、模型自己加的副標、UI chrome、亂碼單字）
- [ ] 背景文字確實是 greeked，不是半可讀的錯字
- [ ] 數字與它旁邊的圖形長度一致
- [ ] 定版的圖章／CTA 沒有提早出現在前面的 beat
- [ ] 知名品牌商標（勾號、花瓣之類）沒有被模型偷偷畫進去
