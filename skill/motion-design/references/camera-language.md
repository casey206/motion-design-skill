# 運鏡與鏡頭語言

動態設計的攝影機分兩種世界：**2D 世界的攝影機應該鎖死**，**3D 世界的攝影機應該永不靜止**。搞混這件事是最容易被看出外行的地方。

| 世界 | 攝影機 | 動態從哪來 |
|---|---|---|
| 純 2D 向量 | **鎖死**（locked-off） | 元素、變形、整幀換色 |
| 2D＋3D 混合 | 3D beat 動、2D beat 鎖 | 分別用兩套節奏 |
| 3D 產品／建築 | **永不靜止**，三層視差 | 真實的攝影機移動揭露厚度 |
| 實拍＋字卡 | 跟著素材；字卡鎖在螢幕空間 | 字卡組裝 |

---

## §1 運鏡詞彙（照這些名字寫，不要自創）

### 有視差的（攝影機真的在空間裡移動）

| 詞 | 動作 | 用在哪 |
|---|---|---|
| **dolly in / push in** | 攝影機往前推 | 聚焦、強調、進入一個空間 |
| **dolly out / pull back** | 攝影機往後拉 | 揭露尺度、收尾、「原來這麼大」 |
| **truck / lateral dolly** | 橫向平移 | 穿過景深裡的物件、揭露厚度 |
| **orbit / arc** | 繞著主體轉 | 證明物件是立體的（動態設計最常用） |
| **counter-orbit** | 攝影機順時針繞，物件逆時針進 | 高能量組裝片，每圈都有東西掠過鏡頭 |
| **crane / boom up-down** | 整台攝影機升降 | 沿產品升鏡、越過屋頂 |
| **fly-through / FPV** | 穿飛物件之間 | 爆炸圖、隧道、建築內部 |
| **spiral crane** | 環繞的動量螺旋上升 | 從組裝接到頂拍英雄鏡 |

### 沒有視差的（攝影機原地）

| 詞 | 動作 | 注意 |
|---|---|---|
| **pan / tilt** | 原地水平／垂直旋轉 | 沒有視差，3D 產品片用了會很平 |
| **zoom** | 變焦 | 動態設計幾乎不用，要推就用 dolly |
| **whip pan** | 快到產生模糊的 pan | **低於 0.8 秒會渲染成硬切、沒有模糊** |
| **rack focus** | 鏡頭中途換焦點 | 把注意力交給畫面另一處，取代剪接 |
| **dutch / roll** | 畫面傾斜 | 動態設計用了通常像出錯，除非是刻意的失衡風格 |

### 寫法規則

**運鏡詞一定要接速度或時長**，不然模型會自己決定：

- ❌ `pan right`
- ✅ `slow 5-second pan right`
- ✅ `the camera trucks right with large amplitude at fast speed`

振幅（amplitude）＋ 速度（speed）兩個軸分開講，比一堆形容詞有效：`small amplitude at fast speed`（微距快推）、`large amplitude at slow speed`（大幅緩移）。

---

## §2 FOV 錨定表（用度數，不要用 mm）

這張表跟 `higgsfield-seedance-prompt` 共用，**只用表上的離散值**，不要寫「23°」。

| FOV | mm 等效 | 用途 | 動態設計何時用 |
|---|---|---|---|
| 180° | 魚眼 | 球面畸變 | 刻意的 Y2K／夢境段落 |
| 107° | 14–16mm | 建築超廣 | 建築內部、巨大空間 establish |
| 84° | 20–24mm | 廣角 | **建築一鏡到底的預設**、爆炸圖全貌 |
| 63° | 28–35mm | 觀察感 | 場景全景、實拍中景 |
| 47° | 40–50mm | 人眼自然 | 通用 establish、產品中景 |
| 29° | 75–85mm | 人像壓縮 | 產品英雄鏡、隔離主體 |
| 18° | 100–135mm | 自然人像 | 微距前的近景、實拍特寫 |
| 12° | 180–200mm | 長焦細節 | 產品微距、質感鏡 |
| 8° | 300–400mm | 極端壓縮 | 遠觀、偷拍感 |

**多鏡頭片要每段標 FOV，並加 `no drift mid-segment`**，否則後段會自己漂。

**極端 FOV（8°、107°）的四道一致性機制**（缺一不可，否則 2–3 個 beat 後就崩）：
1. 整支片共用一組身分／場景參考。
2. 每個 beat 開頭明寫 FOV。
3. 每個 beat 結尾再確認 FOV。
4. 顏色用「材質 ＋ 光束 ＋ 構圖角色」描述，不要列色票清單。

---

## §3 微距與特殊鏡頭

動態設計的產品片靠這些鏡頭吃飯：

| 技巧 | 寫法 | 效果 |
|---|---|---|
| **probe lens macro pass** | `probe-lens macro passes that travel along the surface` | 貼著表面飛行，食品／產品片的招牌鏡 |
| **detail-on-wide（蛇管鏡）** | `84° wide FOV, low-angle right up against the object` | 前景物件被誇大，背景退成景深 |
| **高速攝影** | `Phantom-style high-speed capture, extreme slow-motion physics` | 液體、粉塵、碎裂的慢動作質感 |
| **motion control 平滑度** | `motion-control smoothness` | 消除手持感，換上機械的絕對平穩 |
| **anamorphic 性格** | `horizontal squeeze, oval elliptical bokeh, horizontally stretched highlights, curved barrel edge distortion` | 寬銀幕電影感。**要同時禁掉光斑** |

**anamorphic 的陷阱**：加了它一定要補 `NO lens flares, NO light streaks, NO floating bokeh circles`，否則模型會塞滿光斑。並且所有文字要待在**畫面中央 70%** 以內，否則邊緣畸變會吃掉字。

---

## §4 轉場（比運鏡更重要）

動態設計的高級感主要來自轉場，不是運鏡。**永遠不要寫 `dissolve to` 或 `crossfade`。**

### 四種合法轉場

| 型態 | 做法 | 適用 |
|---|---|---|
| **硬切（hard cut）** | 直接切，配整幀換色更好 | 2D 向量片的主力 |
| **對位剪接（match cut）** | 見 §5 | 所有型態 |
| **世界內事件** | 線條變成材質、圖層被抽走、材質點燃蔓延 | 3D 建築、一鏡到底 |
| **繼承動量** | 上一鏡的運動向量帶進下一鏡 | Hyper-Motion、高能量片 |

### match cut 的兩種（業界只有這兩類）

**一、對位動作（match on movement）**

主體在新鏡頭裡**位置幾乎相同**，動量繼續。做法：**切在動作中間**——一個 12 幀的移動，切在第 6 幀，新鏡頭從第 7 幀接上。

```
[Shot 2] At 00:02.250, hard match-cut from the selected call strip to a wide
conversation hero — the rightward momentum continues uninterrupted.
```

**二、對位構圖／形狀（match on framing）**

兩個形狀相似的物件相接，構圖不變。三角形播放鍵接三角形箭頭、圓形內耳目標接圓形喇叭、彩色旗幟接同色滿幀。

```
MATCH CUT: align the triangular Play button with a triangular arrow and cut
crisply to an enormous side-profile head cutout on bright yellow.
```

**衍生變體**（都是這兩類的特例）：顏色淹沒（一個元素的顏色擴張成整幀）、動作接動作、形狀變形（morph，最難也最亮眼）。

### 世界內事件轉場（3D 的高級招）

不寫「轉場」，寫「在場景裡發生了一件事，而攝影機沒有停」：

```
SEAM A (no cut): the finished section drawing itself tilts — the drawing plane
rotates into 3D space with every line continuously visible throughout the rotation.
```

關鍵句：**`no cut`** ＋ **在場景裡可見的成因** ＋ **攝影機持續移動**。

---

## §5 攝影機的「允許／禁止」清單

這是控制攝影機最有效的寫法，比描述更有效。每支片都寫：

```
CAMERA & MOTION: allowed — slow motorized boom-ups, lateral dollies with rack
focus, one half-orbit around the levitating hero, slow orbital macro tilts, one
slow-motion impact. Forbidden — handheld shake, whip pans, crash zooms,
dissolves, morphs, speed ramps outside the final impact, any fast move.
```

2D 片的鎖死宣告要寫到囉唆為止，否則模型一定會推鏡：

```
CAMERA: locked-off static frame. The frame never moves. No push in, no pull out,
no pan, no tilt, no zoom, no dolly, no handheld, no shake, no roll, no parallax,
no drift, no reframing. Only the flat graphic layers animate inside the fixed frame.
```

---

## §6 建築一鏡到底的完整路徑範本

房地產型態的攝影機是整支片的骨架。照抄改地名：

```
The camera begins static and face-on to the drawing plane, like a rostrum camera
over a drafting table. As the section drawing tilts into 3D, the camera arcs right
and enters space with it. Through the ink-to-matter rise it performs a slow rising
clockwise orbit around the tower, climbing in sync with the floor-by-floor
ignition. The orbit crests above a mid-height terrace and tilts to plumb vertical,
looking straight down; it then descends vertically through the extruding floor plan
into the apartment, settling into a gentle eye-height forward glide toward the
glazing. The glide passes straight through the glass onto the terrace, then
reverses into one long continuous pull-back and rise that never stops until the
end. All motion eases out; every move blends into the next with curved velocity —
the camera never fully stops until the final 1.0-second hold.
```

拆開看它為什麼有效：**靜止起手 → 跟著物件進入空間 → 上升環繞 → 轉正俯視 → 垂直下降穿入 → 平視滑行 → 穿過玻璃 → 一路拉遠到結束**。八段，每段都有明確的空間邏輯，每段之間用「曲線速度」而不是停頓連接。

**真實的飛越動畫時長**：行銷用的建築飛越業界落在 **30–90 秒**。速度要跟著空間重要性變化——重點中庭放慢、過場走廊加快。
