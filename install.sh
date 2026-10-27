#!/usr/bin/env bash
# install.sh — 把 motion-design skill 安裝到 ~/.claude/skills/（可重跑；已有舊版會先備份）
set -euo pipefail
SRC="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)/skill/motion-design"
DEST="$HOME/.claude/skills/motion-design"

[ -f "$SRC/SKILL.md" ] || { echo "找不到 $SRC/SKILL.md"; exit 1; }
mkdir -p "$HOME/.claude/skills"
if [ -d "$DEST" ]; then
  BAK="$DEST.bak-$(date +%Y%m%d-%H%M%S)"
  mv "$DEST" "$BAK"
  echo "已備份舊版到 $BAK"
fi
cp -R "$SRC" "$DEST"
echo "已安裝到 $DEST"

for c in ffmpeg python3; do
  command -v "$c" >/dev/null 2>&1 || echo "提醒：找不到 $c，請先安裝"
done
echo "完成。重開 Claude Code 後說「幫我做一支 15 秒上市影片」試試看。"
