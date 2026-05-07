# 角色分層資產規格

角色換裝採用 B 方案：角色本體需要拆成穩定分層，衣服與鞋子不是覆蓋在整張角色圖上，而是插入到正確層級。

## 畫布

- 尺寸：1024 x 1536
- 格式：PNG
- 背景：透明
- 角色位置：必須與 `boy-base.png` / `girl-base.png` 完全對齊

## 建議層級

由下到上：

1. `body-back.png`
   - 身體、腿、後方手臂
   - 不含可換衣服區塊
2. `clothes-base.png`
   - 預設基礎衣服
3. `clothes/<item>.png`
   - 上衣、下衣、鞋子等正式服裝層
   - 需依角色身形畫好，不可用矩形或貼紙式覆蓋
4. `body-front.png`
   - 前方手臂、手掌、必要遮擋
   - 用來讓衣服看起來是穿在身上
5. `head-hair-front.png`
   - 頭髮前層、臉部或需要壓住帽子的區塊
6. `accessories-front/<item>.png`
   - 帽子、髮飾、手持物等前景裝飾

## 命名範例

```text
assets/characters/layers/boy/body-back.png
assets/characters/layers/boy/clothes-base.png
assets/characters/layers/boy/body-front.png
assets/characters/layers/boy/head-hair-front.png

assets/accessories/layered/boy/clothes/top-mint.png
assets/accessories/layered/boy/clothes/bottom-denim.png
assets/accessories/layered/boy/clothes/shoes-yellow.png
assets/accessories/layered/boy/front/hat-crown.png
assets/accessories/layered/boy/front/hair-star.png
assets/accessories/layered/boy/front/hand-wand.png
```

## 品質規則

- 裝飾品必須與角色同畫風、同光源、同透視
- 衣服與鞋子必須貼合身形，不可像紙片蓋上去
- 男孩與女孩分開出圖，不共用同一張裝飾品圖
- 只有正式分層素材可接到 `layeredAssets`
