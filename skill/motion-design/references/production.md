# 生產執行與後製

**AI 輸出是素材，不是成片。** 2026 年的現實：影片模型在移動物件上渲染文字仍然高風險，超過 30–60 秒的時間一致性會崩。正確心態是把生成結果當**拍回來的毛片**，後面必須有後製。

---

## §1 路徑選擇

| 需求 | 走哪 | 15 秒費用 |
|---|---|---|
| 自己寫 prompt 的 motion 片（**預設**） | `generate_video` model `minimax_h3` | **30 credits** |
| 同一 prompt 要 2–4 個變體 | 同上 ＋ `count: 2–4` | 30 × N |
| 多支不同 prompt | `generate_video_batch` ＋ `jobs_wait` ＋ `show_generation_by_ids` | 30 × N |
| 要官方 preset 的既有畫風 | `marketing_studio_v2_create` | ≈ 90 credits |
| 只有客戶網址、不想寫 prompt | `marketing_studio_v2_create` ＋ `preset_type: saas_motion` ＋ `brand_url` | ≈ 90 credits |
| 速度優先、畫質可讓 | `minimax_h3_max`（480p／768p） | 先 `get_cost` 查 |
| 要精準相機路徑與可量的尺寸 | `scene_builder_3d_*` 或 Blender MCP 出幾何，再交 H3 | 另計 |
| **Higgsfield 沒點時的備援** | Banaverse `banaverse_generate_video`，`model:"banaverse-h3"` | **admin 免扣點** |

**Marketing Studio 所有 motion 型別都是 5.94 credits/秒**（hypermotion／2d_motion／saas_motion／mixed_media 與 H3 相容列都一樣），固定費差在 0.1–1.4。它貴不是費率問題，是 H3 直接跑有固定價。

**生成前一定先 `get_cost: true` 報價**給使用者看過再跑。2026-09-11 帳戶餘額 0.96 credits（ultra 方案），實跑前要確認儲值。

**判斷線**：「看起來對」走 H3；「必須量得出來」（指定相機路徑、精確尺寸、可重複改版）走真幾何。

## §2 minimax_h3 參數

```
model: "minimax_h3"
duration: 15          # 4–15，整數秒
resolution: "2K"      # 唯一選項
aspect_ratio: "16:9" | "9:16" | "21:9" | "4:3" | "1:1" | "3:4" | "auto"
count: 1              # 同 prompt 變體 1–4
```

**五種 media role**（H3 做動態設計比別的模型強的唯一原因）

| role | 放什麼 | 效果 |
|---|---|---|
| `image_references` | design sheet 截圖、產品圖、客戶渲圖 | 鎖字形／元件／產品外觀，prompt 裡用 `@Image 1` 指稱 |
| `start_image` | 定案的 hero styleframe | 鎖第一幀 |
| `end_image` | PIL 畫的片尾卡 | **鎖最後一幀**，動態設計最有效的一招 |
| `video_references` | 客戶實拍 | 鎖人物身分、環境、光線、鏡頭性格 |
| `audio_references` | 一段人聲 | 複製音色（只用本人同意的聲音） |

多張參考圖就多筆 `image_references`，prompt 裡依序稱 `@Image 1`、`@Image 2`。

**`end_image` 的用法**（值得單獨記）：PIL 畫好完整的一幀（不是透明 overlay），上傳成 media，prompt 第一句宣告：

```
The provided END IMAGE is the exact final frame of the film. The film must finish
precisely on this frame. No other references exist — every frame is composed from
this prompt.
```

模型會自己收斂到那張，片尾的字就不會錯。

## §2.5 備援：Banaverse H3（Higgsfield 沒點時）

2026-09-11 實測，Higgsfield 額度用完會回「Out of credits on ultra plan」，`generate_image_batch` 逐項回 `submission_failed`（已送出的照跑，**不要重送同一批**）。此時全線改 Banaverse。

```
banaverse_generate_video:
  model: "banaverse-h3"        # 先試 "banaverse-h3-local"（零點），回「主機離線」再切雲端
  refs: [該 block 分鏡的 Banaverse url]   # 當首幀
  durationSec: 10              # 4–15
  generateAudio: false
→ 回 jobId，用 banaverse_get_video 取件
```

**與 H3 直跑的差異**（這些要事先知道，不然會期待落空）：

| | Higgsfield `minimax_h3` | Banaverse `banaverse-h3` |
|---|---|---|
| `end_image` | 有 | **沒有** |
| design sheet 當 `image_references` | 有 | **沒有**（只能用 `refs` 當首幀） |
| 素材上架 | 要 `media_upload_widget` ＋ media_id | **免上傳**，吃 Banaverse 自己回傳的 url |
| 跨段一致性靠什麼 | end_image ＋ image_references ＋ 重述 | **分鏡首幀 ＋ 一致性重述** |
| 實際等待 | 數分鐘 | **雲端排隊 20 分鐘以上都發生過**，會長時間停在 2% |

排隊很久是正常的。**多段一次全部送出，再輪流 `banaverse_get_video`**；送出後去做旁白與 assemble 腳本，不要一直輪詢空等。2026-09-11 實測：送出後三段都長時間停在 2%。

### 沒有 end_image 怎麼接縫（2026-09-11 解法）

**如果每個接縫本來就是「整幀硬換色」，就不需要 end_image。** 硬切不需要對幀——end_image 原本只是在鎖構圖，不是在鎖接縫。把它換成每段結尾的一段 **FINAL STATE** 文字（逐項列出該段最後一幀有什麼、在哪，並要求最後 12 幀完全靜止），接縫品質不會掉。

反過來說，**要做無縫的連續運動接縫（一鏡到底、慢動作中途）就不能走 Banaverse**，那種接縫非 end_image 不可。

### refs 的實際大小（實測）

`refs` 吃 data URL／base64，但工具參數塞不進大圖。1920×1080 的平面向量分鏡縮到 768px 寬、JPEG q6 之後，base64 約 **2.5–3.5 萬字元**（複雜的那幾格到 6.4 萬）。技術上可行但每段都要把整串 base64 寫進工具參數，容易出錯。

**更好的做法：不要用 refs，把「必須精確」的元素全部移到後製。** 官方角色立繪、logo、所有文字都不進生成流程；prompt 改成要求模型在該位置留一個「該世界底色的空矩形 ＋ 白邊 ＋ 平面偏移陰影」（STICKER SLOT），後製再把官方 PNG 疊進去。這比任何模型的一致性都可靠，而且變成 frame-accurate。

### 切點用 beat_start，不是 beat_end

旁白比畫面早進 0.3 秒是正常的句距設計，所以 **畫面切點要取 `beat_start`**。取 beat_end 會讓每段多 0.3 秒，三段累積 0.9 秒的漂移，旁白就對不上了。用 beat_start 算出來的三段長度相加會精準等於旁白軌總長——這是驗算方式。

**旁白先量再排**：edge-tts 台灣腔約 **3.8 字／秒**，10 秒 block 的旁白 ≤ 36 字。超過就縮句，或把該 block 生成 15 秒，**不要用 atempo 硬壓**。

## §3 素材上架

- **本機／附檔**：先 `media_upload_widget`，**那一個 turn 只能呼叫這一個工具**。不要翻 `/mnt/user-data/uploads`，也不要叫使用者在 Claude 聊天室貼附件（遠端工具讀不到）。
- **混合素材**（參考圖 ＋ 驅動影片）：`type: "auto"`, `multiple: true`。可以一支影片 ＋ 一段音訊 ＋ 多張圖。
- **網路素材**：`media_import_url`，拿回傳的 `media_id`。
- `medias[].value` **只吃 media_id 或前次生成的 job_id**，不吃 https 網址，也不吃本機路徑。

分鏡與 styleframe 生圖走 Banaverse（免扣點）。**Banaverse MCP 的 `refs` 只吃 data URL／base64／Banaverse 自己回傳的 url**，不吃本機路徑。

**實務解法（不需要 base64、不需要 API key）**：hero 鏡**純文字生**（`imageSize:"2K"`），拿它回傳的 url 當其餘所有格與影片的 `refs`。每格 prompt 開頭固定這句，角色才不會漂：

> The reference image is a STYLE KEY only: copy its character design ({逐項列：髮型、眼睛、上衣、褲、鞋}), its ultra-bold flat type style, and its flat vector look exactly. Do NOT copy its layout.

要用本機檔當參考時才走腳本（需要 `BANAVERSE_API_KEY`）：

```bash
python3 ~/.claude/skills/ig-ad-creator/scripts/banaverse.py \
  --prompt-file /tmp/shot2.txt --ref hero.png \
  --aspect 16:9 --size 2K --out board/shot2.png
```

HTML（design sheet／審圖板）截圖（2026-09-11 實測）。**首選 Chrome headless**：一次成功、免 server、免上傳，Google Fonts 的 link 也載得到。

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless=new --disable-gpu --hide-scrollbars \
  --window-size=1920,1080 --virtual-time-budget=15000 \
  --screenshot=sheet.png "file:///絕對路徑/sheet.html"
```

**備用路徑**（Chrome 不在或要 fullPage 長截圖時）：Playwright 擋 `file://`、in-app Browser 對本機檔不給截圖，所以先開本機 http server：

```bash
cd <html 所在目錄> && /usr/bin/python3 -m http.server 8931 --bind 127.0.0.1
```

背景跑起來後 `mcp__playwright__browser_navigate` 到 `http://127.0.0.1:8931/<檔名>.html`，`browser_take_screenshot` 加 `fullPage: true`（**存檔會落在專案根目錄，用完要移走**）。

## §4 超過 15 秒：分段

H3 上限 15 秒。30、60 秒要分段再接。

**切點只能落在自然接縫**：硬切、甩鏡失焦、整幀換色、洪水般的過場、形狀對位的那一幀。
**不可切在**慢動作中間、變形（morph）中間、一鏡到底的環繞中間。

每段 prompt 都要**完整重述**：PALETTE（含 hex）、主角定義、identity anchor、字體處理、禁用清單。省略任何一項都會漂移。

跨段一致性的補強招：上一段的最後一幀抽出來當下一段的 `start_image`。

```bash
ffmpeg -sseof -0.1 -i seg1.mp4 -frames:v 1 seg1_last.png
printf "file '%s'\n" seg1.mp4 seg2.mp4 seg3.mp4 > list.txt
ffmpeg -f concat -safe 0 -i list.txt -c copy out.mp4
```

**費用只有一個槓桿：段數。** 每段固定 30 credits，所以先決定「這支片值幾段」，再決定內容。這就是 animatic 不能跳的原因——它免費告訂你需要幾段。

## §5 後製鏈（固定四道，順序不能換）

### 1. 抽幀 QA

```bash
ffmpeg -i out.mp4 -vf "fps=1,tile=4x4" -frames:v 1 qa_sheet.png       # 15 秒剛好 16 格
ffmpeg -i out.mp4 -vf "fps=2,tile=6x5" -frames:v 1 qa_sheet_fine.png  # 要細看字
ffmpeg -ss 12.4 -i out.mp4 -frames:v 1 -q:v 2 frame_1240.png          # 抓單一幀
```

Read `qa_sheet.png`，照 `SKILL.md` 階段 7 的清單逐項打勾。**先看總表再決定重生。**

### 2. 文字與 logo

`end_image` 鎖好的驗證尾幀即可。要後製貼的：

```bash
# PIL 畫 overlay PNG（透明底，1920x1080 或 1080x1920）
/usr/bin/python3 draw_endcard.py   # → endcard_overlay.png

# ffmpeg 疊上，第 12 秒起 0.4 秒淡入
ffmpeg -i in.mp4 -i endcard_overlay.png -filter_complex \
  "[1:v]format=rgba,fade=t=in:st=12:d=0.4:alpha=1[ov];[0:v][ov]overlay=0:0" \
  -c:a copy out.mp4
```

細節與像素手術見 `text-integrity.md` §4。

### 3. 畫質

需要時放大／補幀。**順序固定：降噪 → 放大 → 補幀**。補幀放最後，模型才拿到最乾淨的輸入。

24fps 補到 48／60fps 可以讓 AI 的抖動變平滑，但**不要對已經有動態模糊的素材補幀**，會產生果凍感。

### 4. 聲音

音效落點對齊視覺的**加速點**與**落地點**（`sound-and-rhythm.md` §3）。落地音只在物件真的停住／貼上／出現時給。

## §6 交付規格

| 項目 | 規格 |
|---|---|
| 母帶 | **ProRes 422 HQ**，Rec.709（剪輯與存檔用，不是交付用） |
| 主要交付 | **H.264 MP4**，Rec.709 |
| 16:9 | 1920×1080（4K 時 3840×2160） |
| 9:16 | 1080×1920 |
| 1:1 | 1080×1080 |
| 4:5 | 1080×1350 |
| 短版 | 30／15／6 秒剪版 |

ProRes 是製作與母帶格式，H.264 是散佈格式。客戶端播放環境不可控時一律給 H.264。

專案目錄：

```
./motion-projects/<專案名>/
├── ref/      客戶素材、design sheet HTML 與截圖
├── board/    storyboard 各格與審圖總表、animatic.mp4
├── style/    styleframe 2–3 張
├── prompt/   每段 prompt 的 txt（改版開新檔，不要覆蓋）
└── out/      成片、各比例版本、QA 總表、overlay PNG
```

交付五樣：成片（各比例）、QA 縮圖總表、**prompt 原文**、styleframe ＋ design sheet、beat sheet。用 `SendUserFile` 送出，影片與縮圖用 `display: "render"`。

## §7 迭代行為

- 「同一支換主題」→ 保留骨架（風格、結構、時間軸），只換語意層。開頭明講保留了什麼、換了什麼。
- 「換風格」→ 換 MOTION LANGUAGE 的 DNA（緩動物理、轉場種類、算圖語言），只留主角與秒數。
- 「換顏色」→ 重建整個色票系統（每色一個角色），不是換色相。
- 「給我幾個方向」→ 5–10 張概念卡（風格 × 機制，每張 2–4 句），點出 2–3 個推薦與理由，問要展開哪個。
- 使用者回報某元素崩了 → 直接給階段 1 預先想好的 Plan B（粒子雲 → 甘油霧；一鏡到底 → 三段在模糊處接縫；全液體模擬 → 亮度擦除揭露）。
