# ログインを本格的に守るための計画書(Cloudflare 移行)

作成:2026年11月13日
対象:Aqualium 学習アプリ(index.html)と教材データ

---

## 1. 結論

- **今のしくみ(ブラウザの中だけでログインを確かめる)では、教材を完全には守れません。**
- **さらに、GitHub のリポジトリが「公開」になっているため、教材のデータは github.com からだれでも読めます。**
  ログインをどれだけ強くしても、この状態では意味が半分しかありません。
- おすすめは **「Cloudflare Pages(置き場所)+ Cloudflare Access(入口の鍵)」に移り、そのあとで GitHub のリポジトリを非公開にする** ことです。
- 利用者が50人未満なら、鍵のしくみは無料で使える見込みです。必要な費用はほぼ独自ドメイン代だけです。

---

## 2. いまの状態と、すでに行った対策

| 項目 | 状態 |
|---|---|
| リポジトリ | **公開**(github.com から教材データ・プログラムを読める) |
| 置き場所 | GitHub Pages(無料。公開リポジトリが前提) |
| ログイン | ブラウザの中で確認。2026年11月に強化済み(下の表) |

**2026年11月に行った強化**

- 保存した印を書きかえるだけではログイン状態を作れない(パスワードから作る鍵で毎回照合)
- 期限に署名(書きかえて延ばせない)/有効期間14日/7日間使わないと自動ログアウト
- パスワードの大文字・小文字を区別/PBKDF2 60万回
- まちがいが続くと待ち時間が段階的に延びる(5回1分 → 10回5分 → 15回30分 → 20回1時間)
- 「共用の端末」モード(タブを閉じるか30分操作しないとログアウト)
- コンテンツ・セキュリティ・ポリシー(許可していない外部のプログラムを読み込まない)

**それでも残る弱点**

1. プログラムを書きかえられる人はログインを回避できる(サーバーがないため)
2. 教材データのファイルは URL を直接開けば読める
3. リポジトリが公開なので、github.com からも読める

→ 1〜3 はサーバー側の対策でしか解決できません。

---

## 3. 方法の比較

| 方法 | 費用の目安 | 生徒のログイン | 作業の大きさ | 評価 |
|---|---|---|---|---|
| **A. Cloudflare Pages + Access** | 50人未満は無料。以上は1人月7ドル(年払い)+ドメイン代 | メールに届く使い捨ての数字/Googleアカウント | 中 | **おすすめ** |
| B. Firebase | ログインは月5万人まで無料、配信は従量課金 | メール・Google など | 大(読み込み方の作り直し) | 次点 |
| C. GitHub Enterprise Cloud | 1人月約21ドル | 全員がGitHubアカウントを作る | 小 | 生徒向きでない |
| D. Netlify(Pro以上) | 有料プラン(今の料金は未確認) | 全員共通の1つのパスワード | 小 | Aより弱い |

---

## 4. 費用の見積もり(A の場合)

為替は 1ドル=150円 として計算した**目安**です(推測を含みます)。

| 利用者数(生徒・先生・保護者の合計) | Cloudflare Access | ドメイン代 | 月あたりの合計の目安 |
|---|---|---|---|
| 〜49人 | 0円 | 年1,000〜4,000円程度 | 約100〜350円 |
| 60人 | 7ドル×60人=月420ドル(約63,000円) | 同上 | 約63,000円 |
| 100人 | 7ドル×100人=月700ドル(約105,000円) | 同上 | 約105,000円 |

- 50人を超えたときに「超えた分だけ有料」か「全員分が有料」かは、調べた資料で説明が食いちがっていました。**申し込む前に公式の料金ページで確認が必要です。**
- 50人を大きく超える見込みなら、B(Firebase)のほうが安くなる可能性があります(推測)。
- ドメイン代は種類(.com / .jp など)と会社で変わります。

---

## 5. 移行の手順とスケジュール(目安4日)

担当:🧑 しょーまさん(契約・支払いが必要な作業) / 🤖 Claude(作業・設定の準備・確認)

### 1日目:準備
1. 🧑 Cloudflare のアカウントを作る
2. 🧑 独自ドメインを用意する(Cloudflare で購入するか、ほかの会社で買って Cloudflare に登録)
3. 🤖 このリポジトリに、Cloudflare 用の設定(`_headers`)を用意(**済み**)

### 2日目:置き場所の引っ越し
4. 🧑 Cloudflare の「Workers & Pages」で、GitHub のこのリポジトリをつなぐ(ビルドの設定は不要。出力フォルダはリポジトリの一番上)
5. 🧑 独自ドメインを Pages のプロジェクトにつなぐ
   - **注意:ドメインをつなぎ終えてから、次の手順で鍵をかける**(先に鍵をかけるとつなげない、と Cloudflare の資料にあります)
6. 🤖 新しいアドレスで、アプリ・地図・単語帳・テキストが動くか確認

### 3日目:鍵をかける
7. 🧑 Zero Trust の「Access → Applications」で、独自ドメイン全体に「Self-hosted」のアプリを作り、ログインできる人(メールアドレス)を登録
8. 🧑 次のページだけは「ログイン不要」にする(パスごとに別のアプリを作り、Bypass を設定)
   - `/home.html`(サービス紹介)、`/manual.html`(マニュアル)、`/img/*`、`/manual/*`、`/css/home.css`、`/js/home.js` など
9. 🧑 `プロジェクト名.pages.dev` のアドレスにも鍵をかけるか、独自ドメインへ転送する(**ここを忘れると、別のアドレスから鍵なしで入れてしまう**)
10. 🤖 鍵の有無を確かめる(ログイン前に教材データの URL を直接開いて、読めないこと)

### 4日目:切りかえ
11. 🧑 生徒・保護者に新しいアドレスを案内(🤖 案内文を作成)
12. 🧑 GitHub Pages を止める(Settings → Pages)
13. 🧑 **GitHub のリポジトリを非公開にする**(Settings → General → Change visibility)
    - Cloudflare Pages は非公開のリポジトリからも公開できます
    - 非公開にすると、GitHub Pages(無料)は使えなくなるので、**必ず 12 のあとに行う**

---

## 6. 決めておくこと

| 項目 | 選択肢 | おすすめ |
|---|---|---|
| 生徒のログイン方法 | メールに届く数字/Googleアカウント/両方 | 両方(Googleがない生徒はメール) |
| 今のID・パスワード画面 | なくす/二重の鍵として残す | しばらく残し、慣れたらなくす |
| 保護者・先生への共有リンク | ①保護者もメール登録してログイン ②共有ページだけ鍵なしにする ③共有リンクをやめ、PDFや画像で送る | ①(人数が50人に収まるなら)か ③ |

**共有リンクについての補足**
今の共有リンクは、アプリ本体(index.html)を使って表示しています。アプリ全体に鍵をかけると、保護者もログインが必要になります。
②にする場合は、共有ページに必要なファイルだけを鍵なしにする必要があり、教材データの一部が見えてしまいます。

---

## 7. リスクと対策

| リスク | 対策 |
|---|---|
| `pages.dev` のアドレスから鍵なしで入れる | 手順9で鍵をかけるか転送する。切りかえ後に確認する |
| GitHub に教材が公開されたまま | 手順13で非公開にする |
| 生徒がログインできない(メールが届かない等) | Google ログインも用意する。メールの迷惑メールフォルダを案内 |
| 50人を超えて費用が急に増える | 申し込み前に料金ページを確認。利用者数を毎月確認する |
| オフラインで使えなくなる | 一度ログインしてデータを読み込めば、しばらくは端末に残る(推測。移行後に確認する) |
| 無料プランの条件が変わる | 年に1回、料金ページを確認する |

---

## 出典

- Cloudflare Zero Trust の料金:https://www.cloudflare.com/plans/sase-zero-trust.md
- Cloudflare Access:https://www.cloudflare.com/en-au/products/cloudflare-access
- 無料プランの解説(第三者):https://costbench.com/software/business-vpn/cloudflare-zero-trust/free-plan/
- Cloudflare Pages のプレビューと Access:https://developers.cloudflare.com/pages/configuration/preview-deployments/
- Pages を Access で非公開にする手順(第三者):https://ddingpy.github.io/mynote/posts/cloudflare-pages-jekyll-google-access-private-docs-guide/
- Access のポリシー:https://developers.cloudflare.com/cloudflare-one/access-controls/policies/
- 一部のパスだけログイン不要にする方法(コミュニティ):https://community.cloudflare.com/t/cloudflare-access-exclude-path-from-authentication/204893
- メールの使い捨て数字(One-time PIN):https://developers.cloudflare.com/cloudflare-one/identity/one-time-pin/
- 2026年5月の変更(新規アカウントの標準ログイン方法):https://developers.cloudflare.com/changelog/post/2026-05-19-cloudflare-as-identity-provider/
- Firebase の料金:https://firebase.google.com/pricing?hl=ja
- GitHub Pages の公開範囲(Enterprise Cloud):https://docs.github.com/en/enterprise-cloud@latest/pages/getting-started-with-github-pages/changing-the-visibility-of-your-github-pages-site
- Netlify のパスワード保護:https://www.netlify.com/blog/restricting-access-to-netlify-sites-with-passwords
