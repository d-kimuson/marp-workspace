# Marp Workspace

## ブラウザでプレゼンする

```bash
$ yarn start:server
```

## スライドを編集する

### VSCode で編集する (Recommended)

[Marp for VS Code - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)

をいれて、マークダウンファイルを開く

### ブラウザで確認しながら編集する

```bash
$ yarn start:preview ./slides/target.md
```

## テーマを編集する

スタイルシートは webpack でビルドしているので、watch を起動する必要あり

```bash
$ yarn dev
```

theme ディレクトリ下の theme ファイルを編集/追加する

watch が起動していれば、theme 下に置いたファイルは自動的に Marp のテーマに登録されるので、marp で指定できるようになる

```md
---
marp: true
theme: basic
---

# Content
```

## 書き出す

```bash
$ yarn export        # html
$ yarn export --pdf  # pdf
```

public 下にスライドが書き出される

## テーマに関する色々

### 既存テーマの import

既存のテーマの import は `@import-theme` 構文で行う(sass が見つけられないため)

### コードブロックのハイライト

コードブロックのレンダリングには [highlightjs](https://highlightjs.org/) が使われている模様

hilightjs のテーマは `@import "~highlight.js/styles/$.css";` にあるので、好みのものを指定する

---

## 開発環境のメモ

vscode の settings.json に theme を全ファイル指定しなければいけないので、webpack-bundle-tracker で拾って、watch して更新する的なことをしてる

webpack の ビルド時と開発サーバー起動時に自動で実行されるので普段は意識しなくて良い
