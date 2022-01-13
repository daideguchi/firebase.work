# プロダクトのタイトル
Asset Manager お金の管理ツール

## プロダクトの紹介

- 未完成品です。今回は「おかね（資産）」をテーマに毎日が楽しくなるようなツールが作りたかった。
- 当初の計画では、pythonのAIを駆使して、firebase登録されている保有資産から「将来の、◯年後のあなたの資産は○％の確率で○○円です。みたいなツールを作りたかった。
- 今回は学習時間も限られており、構想が壮大すぎて非常に難しかった。

## 苦戦・工夫した点，共有したいハマりポイントなど

- pythonは初学だったので勝手が非常に難しかった。バックエンドの言語なので、実行結果をフロントエンドのwebページに持ってくる方法が非常に難しかった。結局実装できず。
- pythonで銘柄コードを入力すれば、チャートが表示されるコードは完成したが、結局ローカル以外のページに表示させられなかった。
- chart.jsのライブラリを使い、firebaseに登録されたデータで円グラフを表示させたり、折れ線グラフで、資産推移を表示させるのが苦労した。
- ネットのソースを参考に、IndexedDBに保管するやり方も勉強した。こちらはうまくいった。
- 株価の取得について、国内の証券会社はAPIを公開しておらず、どうやってロジックを組むか考えるのに時間がかかった。
- 銘柄コードを入力すれば自動的に銘柄名が出力されるロジックを組んだ。（エクセルのvlookup的な）※日本株のみ

## URL
https://daideguchi.github.io/firebase.work/
