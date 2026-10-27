# 節奏與聲音

動態設計的節奏有兩種來源：**音樂的格線**，或**動態自己的落點**。兩者只能選一個當主，不能都當主。

**先決定這支片是靜音還是有聲，這決定整個節奏架構。**

---

## §1 靜音優先（動態設計的預設）

社群版位 **85% 的觀看是靜音**；公開場合看影片的人有 69% 不開聲音。所以：

**關掉聲音看一遍，資訊還要完整。** 這是交片前的必檢項。

### 靜音設計的三根柱子

1. **前 3 秒有視覺鉤子** — 動態、張力、或一個明確的問題。第一幀就要在動，不要有空等的幀。
2. **字是設計的一部分**，不是字幕。字級、位置、進場都是設計決定。
3. **節奏靠剪接與換色**，不靠音樂。

### 用視覺取代語氣

沒有聲音的時候，語氣要用視覺做：

| 語氣 | 視覺對應 |
|---|---|
| 重音 | 那個字放大、上強調色、加底線 |
| 停頓 | 一個純靜止的 beat |
| 急促 | 整幀換色、stagger 變密 |
| 音效感 | 畫面上的擬聲字（`WHIP`、`POP`）或形狀爆開 |

### 靜音宣告（prompt 必寫）

```
Fully silent piece — no soundtrack, no sound design; all rhythm is carried by
motion timing and hard full-frame color switches alone.
```

後半那句要寫**實際靠什麼給節奏**：剪接／速度變化／換色／draw-on 時間。留空的話模型會自己加配樂。

---

## §2 有音樂時的節拍格線

### BPM 換算（先算，再排 beat）

| BPM | 一拍 | 兩拍 | 四拍（一小節） |
|---|---|---|---|
| 90 | 0.67s | 1.33s | 2.67s |
| 100 | 0.60s | 1.20s | 2.40s |
| 110 | 0.55s | 1.09s | 2.18s |
| **120** | **0.50s** | **1.00s** | **2.00s** |
| 128 | 0.47s | 0.94s | 1.88s |
| 140 | 0.43s | 0.86s | 1.71s |

**120 BPM 是動態設計的甜蜜點**：一小節剛好 2 秒，正好等於一個 beat 的上限。15 秒＝7.5 小節。

### 排法

- **切點落在強拍（downbeat）**，不是隨便一拍。觀眾覺得「剪得很緊」是因為大腦在強拍上預期變化。
- 一個訊息單位＝**一小節或兩小節**（120 BPM 下是 2 秒或 4 秒）。
- 密集段落可以切到半拍，但**不要整支片都切半拍**，會失去對比。
- **定版前留一個空拍**，音樂收，畫面凍。

### prompt 寫法

```
non_diegetic_music: One continuous instrumental electronic track at 120 BPM:
rounded bass pulses, crisp syncopated sixteenth-note percussion and sparse clear
synth notes. Add brief fills at the macro inserts, reduce percussion at the brand
reveal, and stop the beat at 13.8 seconds with a short tonal decay. No vocals.
```

四件必寫：**BPM、樂器、哪裡加料哪裡減、哪一秒停**。沒寫「哪一秒停」就會一路響到最後一幀。

---

## §3 音效分層（whoosh 與落地音）

一個好的 whoosh 會傳達重量、速度、材質、張力。做法不是丟一個音效，是**跟著動作的弧線分層**。

### 先標點，再做聲音

看著畫面標出三個時間點：**起動 → 加速最快 → 落地**。然後：

| 動作階段 | 聲音 | 特性 |
|---|---|---|
| 起動 | 慢慢建立的低頻 | 弱、長、暗 |
| 加速 | 寬頻 sweep | 強、短、亮 |
| 落地 | 撞擊或反向音 | 極短、有低頻尾 |

三層一起用才會像真的。只給中間那層 = 便宜的模板音。

### 落地音的唯一規則

**撞擊音、click、pop 只在物件真的停住／貼上／出現的那一幀給。**

給早了會像時間軸沒對齊，給多了會像遊戲介面。一個 beat 通常只有一個落地音。

### 同步鐵律

**聲音在視覺的那一幀，或晚一點點，絕不提前。** 提前是最容易被感知為「不專業」的單一錯誤。

實拍加字卡的片，這條規則要寫進 prompt：

```
Each graphic begins exactly when the matching spoken words start, or a hair after
— NEVER before.
```

### prompt 寫法

```
overall_soundscape: Short dry selection ticks, spatial glass-edge sweeps and
restrained bass impacts mark the edits. Two distinct nonverbal taps mark the
conversation turns; a fine scan sound accompanies the recording insert. A brief
two-note glass tone resolves on the brand frame. No speech, phone ringing or
room noise.
```

寫法規則：**用材質描述音效**（glass-edge sweep、paper slap、mechanical snap），不要用「whoosh」「impact」這種類別詞。材質詞會拿到對的音色。

---

## §4 旁白

### 字數換算

| 長度 | 英文字數 | 中文字數 |
|---|---|---|
| 15 秒 | 35–40 | 50–60 |
| 30 秒 | 75–80 | 100–120 |
| 60 秒 | **150** | 200–240 |
| 90 秒 | 225 | 300–360 |

**超字數是 explainer 最常見的失敗**。腳本寫完先數字，不要等配音才發現唸不完。

### 順序

**腳本 → VO timing pass（TTS 粗配量時長）→ storyboard → animatic → 生成。**

旁白時長決定 beat 數，不是反過來。

### prompt 寫法（有旁白時）

逐字稿要一次寫完整，並明確禁止改寫：

```
AUDIO
One English narrator with a warm, clear, natural voice, surprised and curious
energy, brisk but not rushed, never an advertising shout. Begin immediately on
the first frame. Speak the following script exactly once, word for word,
finishing the final sentence completely, with no paraphrasing or additional
dialogue: "…"
```

再寫**語意同步**：哪一句對哪個畫面。

```
Synchronize the sequence semantically: the question accompanies playback
surprise; air and vibrations accompany the two pathways; extra bass accompanies
the wave overlay.
```

**注意**：標題文字有時會被模型唸出來。不想要就明寫 `the on-screen headlines are never spoken`。

### 有旁白時的配樂位置

```
Lively plucked bass, dry drum hits and short marimba phrases provide an
interesting rhythm, always clearly beneath the narrator. Sound effects support
the actions without covering any spoken words.
```

**`always clearly beneath the narrator`** 這句不寫，配樂會蓋掉人聲。

---

## §5 logo sting 與片頭片尾

| 用途 | 時長上限 |
|---|---|
| 載入動畫 | < 2 秒 |
| logo reveal | **< 1.5 秒** |
| 片頭 | ≤ 3 秒 |
| 轉場 | < 1 秒 |
| 一般品牌 sting | 2–5 秒 |

三條原則：

1. **動態要從 logo 本身長出來** — 線條、形狀、字母、負空間、符號。不要套通用模板動畫。
2. **理解之後立刻停** — logo 不要在觀眾看懂之後繼續動。
3. **最後一幀要能單獨成立** — 動畫暫停或降級成靜圖時，品牌仍然乾淨。

logo sting 要**繼承品牌語言，不要偽裝它**。品牌調性乾淨收斂，動畫就不能忽然變吵。

**logo 一律不叫模型畫**（見 `text-integrity.md`）。做法：prompt 要求「底色＋留白」，PIL 畫 overlay 貼上，或當 `end_image` 鎖住。
