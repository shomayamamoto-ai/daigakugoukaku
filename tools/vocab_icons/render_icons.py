# 単語ごとの「レシピ」(アイコン1〜2個+記号)から、単語帳用のイラスト(160px WebP)を作る
#  レシピの行:  slug|アイコン名[,アイコン名2]|記号
#  記号: 空(なし) / arrow(→) / plus(+) / not(✕を重ねる) / up(上向き矢印を添える) / down(下向き) / eq(=) / q(?を添える) / vs(⇔)
#  Canva で作った絵(canva.txt にある slug)は上書きしない
import json, sys, os, io, glob
#  使い方: npm pack @iconify-json/fluent-emoji-flat して、このフォルダの pkg/ に展開してから
#          python3 render_icons.py all_recipes.txt
#  アイコン:Fluent Emoji(Microsoft, MIT ライセンス)
import cairosvg
from PIL import Image
H = os.path.dirname(os.path.abspath(__file__))
D = json.load(open(H + '/pkg/package/icons.json'))
ICONS, W0 = D['icons'], D.get('width', 32)
ALIAS = D.get('aliases', {})
OUT = '/home/user/daigakugoukaku/img/vocab/'
CANVA = set(open(H + '/canva.txt').read().split()) if os.path.exists(H + '/canva.txt') else set()
def icon(name, x, y, size):
    n = name
    if n not in ICONS and n in ALIAS: n = ALIAS[n]['parent']
    ic = ICONS[n]; w = ic.get('width', W0); h = ic.get('height', D.get('height', W0))
    return f'<svg x="{x}" y="{y}" width="{size}" height="{size}" viewBox="0 0 {w} {h}">{ic["body"]}</svg>'
C = '#5b6b86'
SYM = {
  'arrow': f'<path d="M66 80 h22 m-8 -8 l8 8 l-8 8" stroke="{C}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
  'plus': f'<path d="M77 72 v16 M69 80 h16" stroke="{C}" stroke-width="5" stroke-linecap="round"/>',
  'eq': f'<path d="M69 75 h16 M69 85 h16" stroke="{C}" stroke-width="5" stroke-linecap="round"/>',
  'vs': f'<path d="M66 80 h22 m-6 -6 l6 6 l-6 6 M66 80 l6 -6 M66 80 l6 6" stroke="{C}" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>',
}
def render(slug, names, op):
    names = [n for n in names if n]
    parts = ['<rect width="160" height="160" rx="22" fill="#ffffff"/>']
    if len(names) >= 2 and op in ('arrow', 'plus', 'eq', 'vs', ''):
        parts += [icon(names[0], 4, 46, 64), icon(names[1], 92, 46, 64)]
        if op: parts.append(SYM[op].replace('66 80', '66 80'))
    else:
        parts.append(icon(names[0], 22, 22, 116))
        if op == 'not': parts.append('<circle cx="80" cy="80" r="62" fill="none" stroke="#e0475b" stroke-width="9"/><path d="M36 124 L124 36" stroke="#e0475b" stroke-width="9" stroke-linecap="round"/>')
        if op in ('up', 'down'):
            d = 'M128 136 V96 m-12 12 l12 -12 l12 12' if op == 'up' else 'M128 96 V136 m-12 -12 l12 12 l12 -12'
            parts.append(f'<circle cx="128" cy="116" r="26" fill="#eef3ff"/><path d="{d}" stroke="#2f5bd3" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>')
        if op == 'q': parts.append('<circle cx="130" cy="34" r="24" fill="#eef3ff"/><text x="130" y="45" font-size="32" font-weight="700" text-anchor="middle" fill="#2f5bd3" font-family="sans-serif">?</text>')
    svg = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="160" height="160" viewBox="0 0 160 160">' + ''.join(parts) + '</svg>'
    png = cairosvg.svg2png(bytestring=svg.encode(), output_width=160, output_height=160)
    im = Image.open(io.BytesIO(png)).convert('RGBA'); bg = Image.new('RGBA', im.size, (255, 255, 255, 255))
    Image.alpha_composite(bg, im).convert('RGB').save(OUT + slug + '.webp', 'WEBP', quality=78, method=6)
ok = bad = skip = 0; errs = []
for f in sys.argv[1:]:
    for line in open(f, encoding='utf-8'):
        c = [x.strip() for x in line.strip().split('|')]
        if len(c) < 2 or not c[0] or not c[1]: continue
        slug, names, op = c[0], [x.strip() for x in c[1].split(',')], (c[2] if len(c) > 2 else '')
        if slug in CANVA: skip += 1; continue
        try: render(slug, names, op); ok += 1
        except Exception as e: bad += 1; errs.append(f'{slug}: {e}')
print('作成', ok, '失敗', bad, 'Canvaのまま', skip); print('\n'.join(errs[:20]))
