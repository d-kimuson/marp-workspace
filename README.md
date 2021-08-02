# Marpit ベースのスライド置き場

## Theme

- default
- gaia
- uncover

が組み込みで存在する

### カスタムテーマ

theme 直下の `*.scss` をそのまま dist 下にビルドする webpack 設定になっている

`$ yarn dev` して watch しながらスタイルをいじると良い

作成した theme を marp から読むには、vsocde に教えてあげる必要があり、glob サポートされていないので新規テーマを使うときは追加してやる必要あり

```json:.vscode/settings.json
{
  "markdown.marp.themes": [
    "./dist/new-theme.css"
  ]
}
```
