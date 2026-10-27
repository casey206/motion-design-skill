# overlay-repair.md — 生成影片的「修片層」方法論

AI 影片模型算出來的 2D vector 動畫，**文字與版面一定會有缺陷**。這份文件是把缺陷修掉而不製造新缺陷的完整做法。2026-09-11 在「議網情生」專案實戰驗證，使用者連續三輪抓出的問題都出自這裡。

## 0. 核心心智模型

疊層（overlay）**永遠在最上層**。你貼上去的任何一個像素都會蓋住底下的角色。
所以每次要貼之前，先問三個問題：

1. **這一區在整支片裡，角色會不會經過？** 會 → 不能用不透明覆蓋。
2. **影片自己的文字有沒有壞？** 沒壞 → **完全不要貼**。貼了只會和它自己的字錯開，變成重影。
3. **我貼的東西，形狀對得上影片裡的同一個東西嗎？** 對不上 → 先把舊的抹掉再貼，不要半透明疊。

> **最重要的一條**：能不貼就不貼。修片層是補救手段，不是預設流程。
> 選對生成模型（見 §1）可以讓 2/3 的段落完全不需要疊層。

## 1. 先選對模型，再談修片

| 模型 | 何時用 | 實測特性（2026-09-11） |
|---|---|---|
| **`gemini-omni-1.1-flash`（Omni Flash）** | **扁平 2D vector 的第一選擇** | 形狀完整、不亂加東西、中文字穩、角色不亂飛。**但雲端排隊可能 30 分鐘以上**（進度條卡在 5–35%），趕時間不能等 |
| `veo-3.1-fast-generate-preview` | 趕時間、要 1–3 分鐘出片 | 動態照 beat 走得準，但**愛自己加東西**：爆星、白色碎片、速度線、憑空的圖示；中文字 3 秒後開始崩 |
| `banaverse-h3` | 兩者都不行時 | 排隊 20 分鐘以上都停在 2%，實務上等於不可用 |
| `minimax_h3`（Higgsfield） | 有 credits 時 | 唯一吃 `start_image`／`end_image`／`image_references` 的，一致性最好 |

**成本**：Banaverse 這條線若是 admin 帳號**全部免扣點**，可以放心重生；一般帳號重生前先估點數。

**實務打法**：Omni Flash 全部送出（它慢但乾淨），同時用 Veo Fast 跑一份當備案。先到先用，Omni 到了就換掉 Veo 的段落。

## 2. 讓模型少犯錯的 prompt 三招（比事後修片有效十倍）

### 招一：元件清單 + 禁止新增

不要只描述動作，先把**畫面上有什麼**逐項列出來，然後明令不准加。這一招直接消滅了爆星、白碎片、憑空的天秤圖示。

```
WHAT IS IN THE FRAME, AND NOTHING ELSE MAY BE ADDED: a two-line headline at the top,
one cream rounded box on the left, one cream rounded box on the right, a thin cream
horizontal line joining them, exactly four small round dots on that line, one small
cream pill at the bottom-left, one dark navy door at the right edge, and one boy
standing in the middle.

- Do NOT invent or add any new object, icon, symbol, emoji, scale, balance, star,
  sparkle, flash, burst, speed line, shard or decoration. Exactly four round dots on
  the line, nothing else on it.
- Every shape stays whole and solid: no cracks, no white slivers, no torn edges,
  no broken fills.
```

數量要寫死（`exactly four`、`exactly three`），否則模型會多畫。

### 招二：把角色關在它的活動範圍裡

「字蓋住臉」幾乎都不是字的錯，是**角色往上跑進了字的區域**。與其事後修，不如禁止它上去。

```
- The character NEVER rises above the horizontal line; his head must always stay well
  below the headline. He does not jump.
- The two characters NEVER rise or drift upward. Their heads must always stay clearly
  BELOW the two big name headlines, with a wide gap. They do not jump, do not float,
  do not scale up. Their feet stay planted on the ground.
```

### 招三：TEXT LOCK，而且不要寫秒數

```
TEXT LOCK: every piece of text in the frame is printed on frame one exactly as drawn
and stays pixel-identical, motionless and unredrawn for the entire clip; text never
bounces, never morphs, never gets re-lettered.
```

- **不要叫字「彈跳進場」**，字一動就會崩。字的動態靠後製做。
- **不要在 prompt 裡寫 `0.0–1.6s` 這種時間碼**，模型會把數字畫進畫面。改用 `first… then… finally…`。

### 招四：參考圖就是真相

模型會照著 `refs` 畫。**你在分鏡上刪掉的東西，如果 refs 還是舊圖，它一定會長回來**（實例：QR code 已從分鏡移除，但 refs 給了含 QR 的舊圖，`negativePrompt` 也擋不住，QR 照樣出現）。
→ 改過的分鏡要重新上傳、拿新的 url 當 refs。

## 3. 四種修片手法，依嚴重度選

### 手法 A：不貼（最佳解）

影片自己的字從頭到尾都對 → 什麼都不要做。
**驗證方式**：抽該段的第一幀與最後一幀，逐字比對 COPY LIST。

### 手法 B：不透明抹除 + 重貼（文字區首選）

**適用**：某個文字區的字壞了／淡掉了，而且**整支片裡角色不會經過該區**。
**做法**：先用底色填滿該矩形，再把分鏡對應區域整塊貼上去。

```python
b=(int(x0*W),int(y0*H),int(x1*W),int(y1*H))
draw.rectangle(list(b), fill=BG)                    # 先抹掉影片自己的字
ov.paste(storyboard.crop(b).convert("RGBA"), b[:2]) # 再貼分鏡的字
```

**為什麼不用半透明遮罩**：影片自己的字和分鏡的字位置會差幾像素，半透明疊上去就是**重影**（使用者一眼就看得出來）。先抹再貼只有一層字。

### 手法 C：glyph 遮罩（角色會經過的區域才用）

**適用**：文字區和角色的活動範圍重疊，不能用不透明矩形。
**做法**：只保留「和底色差距夠大」的像素，其餘透明 → 只有筆畫會蓋住角色，色塊不會。

```python
d = np.abs(crop - np.array(BG)).sum(axis=2)
m = (d > 60).astype(np.uint8) * 255
m = np.asarray(Image.fromarray(m).filter(ImageFilter.MaxFilter(5))
                                  .filter(ImageFilter.GaussianBlur(0.8)))  # 描邊+羽化
sel = m > 0
ov[Y0:Y1, X0:X1, :3][sel] = crop[sel]
ov[Y0:Y1, X0:X1, 3] = np.maximum(ov[Y0:Y1, X0:X1, 3], m)
```

**限制**：這招只解決「色塊蓋住角色」，**不解決重影**。影片自己的字還在下面，筆畫錯位還是會看到雙重邊。所以只在角色真的會經過、且影片的字已經淡掉時使用。

### 手法 D：靜態底板 + 角色活動窗（整格重建）

**適用**：整格版面都被畫壞，只有角色動得好。
**做法**：分鏡圖當不透明底板，只在角色會動的矩形開 alpha=0 的窗。

```python
ov = storyboard_resized.copy()
alpha = np.full((H,W), 255, np.uint8)
alpha[int(y0*H):int(y1*H), int(x0*W):int(x1*W)] = 0   # 角色活動窗
```

**兩個必做的前置**：
1. **先取樣影片的實際底色**，把底板的底色換成它。同一個 hex 在不同模型會跑掉：`#3B41E8` 在 Veo 變 `(61,76,231)`、在 Omni 變 `(68,81,222)`。不校色，窗邊會有可見接縫。
2. **窗要涵蓋角色整段動態的最大範圍**，不是某一幀的範圍。抽 3 幀量最大外框再加 5% 餘裕。

### 手法 E：PIL 直接重畫元件

模型把某個元件畫壞到沒救（框被門切掉半個字、門的形狀亂了）→ 不要再叫 AI 修，**用 PIL 畫一個新的貼上**。圓角矩形、門、膠囊、線段都只要幾行。

```python
d.rounded_rectangle(bx, radius=r, fill=CREAM)
f = ImageFont.truetype(os.path.expanduser("~/Library/Fonts/NotoSansTC-Bold.otf"), size)
tw = d.textlength(t, font=f)
d.text(((bx[0]+bx[2])/2 - tw/2, (bx[1]+bx[3])/2 - size*0.68), t, font=f, fill=NAVY)
```

中文粗體字型：`~/Library/Fonts/NotoSansTC-Bold.otf`（Google Fonts 免費下載）（比 STHeiti 更接近 design sheet 的字重）。

## 4. 貼之前必跑的三道檢查

1. **量角色的活動範圍**：抽 3 幀（開頭／中段／結尾），量角色與手的最大外框。任何不透明貼圖都不能進到這個範圍。
   - 實例：畫了一條 30px 的奶油色線段去接右框，結果正好橫過角色揮手的手掌 → 使用者截圖回報。解法是把線段拿掉，讓框的左緣直接對齊抹除起點。
2. **在 3 幀上先合成預覽再渲染**：
   ```bash
   ffmpeg -ss 1 -i clip.mp4 -frames:v 1 f1.png   # 1s / 4s / 7s
   ```
   ```python
   base = Image.open("f1.png").convert("RGBA"); base.alpha_composite(ov)
   ```
   三幀都對才進渲染。只看一幀一定會漏（門會轉、角色會走）。
3. **確認貼圖順序**：同一個 overlay 裡，**mask 先貼、不透明補丁最後貼**。順序反了，補丁會被後面貼的 crop 蓋回去。

## 5. ffmpeg 合成寫法

單層疊、同時做降噪銳化與定格補長：

```bash
ffmpeg -i clip.mp4 -i ovl.png -filter_complex \
"[0:v]scale=1920:1080:force_original_aspect_ratio=decrease,\
pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=#141B2E,setpts=${SP}*PTS,fps=30,\
hqdn3d=1.5:1.5:3:3,unsharp=5:5:0.7:5:5:0.0[v];\
[v][1:v]overlay=0:0,tpad=stop_mode=clone:stop_duration=2,\
trim=duration=${TG},setpts=PTS-STARTPTS[out]" \
-map "[out]" -an -c:v libx264 -crf 15 -pix_fmt yuv420p out.mp4
```

- `setpts=${SP}*PTS`：`SP = 目標秒數 / 原始秒數`，用來把 8 秒素材壓成 4 秒快節奏。
- `tpad=stop_mode=clone` + `trim`：素材不夠長就定格補到目標秒數，**不要用 atempo 拉長**。
- **延後啟用的疊層**（例如對話框要 3.2 秒後才出現，免得早期遮住角色的手）：
  ```
  [v][1:v]overlay=0:0[v1];[v1][2:v]overlay=0:0:enable='gte(t,3.2)'
  ```
- 組裝腳本要**容許某些段落沒有疊層檔**（`if [ ! -f ovl/$k.png ]` 走純轉檔分支），否則修好一段就會整條掛掉。

## 6. 聲音（同一支片的配套）

| 項目 | 做法 |
|---|---|
| 旁白 | **Banaverse `gemini-tts`，voice `Puck`**，prompt 寫「用台灣口音、自然有精神、像在跟朋友講話的語氣，語速稍快，說：…」。比 edge-tts 自然很多，使用者第一時間抓到 edge-tts「太 AI」 |
| 配樂 | `lyria-3`，描述 BPM、樂器、情緒；30 秒片就生 30 秒 |
| 旁白壓配樂 | `sidechaincompress=threshold=0.03:ratio=8:attack=20:release=400:makeup=1` |
| **asplit 陷阱** | 一個 filter label 只能被消費一次。旁白要同時當 sidechain 的觸發源與最終混音來源 → 必須 `volume=2.2,asplit=2[vo1][vo2]`，否則 ffmpeg 報 `Stream specifier 'vo' matches no streams` |
| 秒數規劃 | 先生旁白再排片長。中文約 **3.8 字/秒**，10 秒 block 的旁白 ≤ 36 字；超過就縮句，不要變速 |

## 7. 這次專案的完整錯誤清單（照著避開）

| 使用者回報 | 真正原因 | 解法 |
|---|---|---|
| 角色身上有白色破片、爆星 | Veo 自己加的裝飾 | 換 Omni Flash ＋ 元件清單禁令 |
| 名字蓋住講者的臉 | 角色往上跑進字區，疊層又把字貼在最上層 | prompt 鎖住角色高度；該段改成完全不貼 |
| 色塊不完整、頭被切 | 用整塊不透明矩形貼字 | 改 glyph 遮罩，或整段不貼 |
| 文字重影、糊掉 | 半透明遮罩疊在影片自己的字上，位置錯開 | 先抹再貼（手法 B） |
| 一條線橫過角色的手 | 補接用的線段畫進了角色活動範圍 | 拿掉線段，讓框緣對齊抹除起點 |
| QR 拿不掉、又長回來 | refs 還是含 QR 的舊分鏡 | 用改過的分鏡重新上傳當 refs；或底色抹掉 |
| 放大看有小缺漏 | 1080p 直出偏軟，加速後更明顯 | `hqdn3d` + `unsharp` + `-crf 15` |
| 日曆數字 24 中途變成 2 | 翻頁動畫把數字重繪了 | prompt 明寫「數字永遠是 24，不得重繪、不得部分翻轉」 |
