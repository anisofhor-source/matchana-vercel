export type Option = {
  id: string
  label: string
  jp?: string
  price: number
  note?: string
  emoji?: string
}

export const bases: Option[] = [
  { id: 'latte', label: 'Matcha Latte', jp: '抹茶ラテ', price: 75, note: 'Cremoso y suave', emoji: '🍵' },
  { id: 'iced', label: 'Matcha Helado', jp: 'アイス抹茶', price: 78, note: 'Con hielo', emoji: '🧊' },
  { id: 'usucha', label: 'Matcha Puro', jp: '薄茶', price: 68, note: 'Batido ceremonial', emoji: '🍃' },
  { id: 'strawberry', label: 'Fresa Matcha', jp: '苺抹茶', price: 88, note: 'Capa de fresa', emoji: '🍓' },
]

export const sizes: Option[] = [
  { id: 'chico', label: 'Chico', jp: '小', price: 0, note: '350 ml', emoji: '🥤' },
  { id: 'mediano', label: 'Mediano', jp: '中', price: 12, note: '500 ml', emoji: '🥤' },
  { id: 'grande', label: 'Grande', jp: '大', price: 22, note: '700 ml', emoji: '🥤' },
]

export const milks: Option[] = [
  { id: 'entera', label: 'Leche entera', jp: '牛乳', price: 0, emoji: '🥛' },
  { id: 'deslactosada', label: 'Deslactosada', jp: '無乳糖', price: 0, emoji: '🥛' },
  { id: 'almendra', label: 'Almendra', jp: 'アーモンド', price: 10, emoji: '🌰' },
  { id: 'avena', label: 'Avena', jp: 'オーツ', price: 10, emoji: '🌾' },
  { id: 'coco', label: 'Coco', jp: 'ココナッツ', price: 10, emoji: '🥥' },
  { id: 'soya', label: 'Soya', jp: '豆乳', price: 8, emoji: '🌱' },
]

export const foams: Option[] = [
  { id: 'ninguno', label: 'Sin foam', jp: 'なし', price: 0, emoji: '🍵' },
  { id: 'salado', label: 'Cheese Foam', jp: '塩フォーム', price: 14, emoji: '🧀' },
  { id: 'fresa', label: 'Foam de fresa', jp: '苺フォーム', price: 16, note: 'Cremoso rosa', emoji: '🍓' },
  { id: 'vainilla', label: 'Foam de vainilla', jp: 'バニラフォーム', price: 14, emoji: '🌼' },
  { id: 'coco', label: 'Foam de coco', jp: 'ココナッツフォーム', price: 16, emoji: '🥥' },
]

export const sweetness: Option[] = [
  { id: 'sin', label: 'Sin azúcar', price: 0, emoji: '🚫' },
  { id: 'poco', label: 'Poco dulce', price: 0, emoji: '🍯' },
  { id: 'normal', label: 'Normal', price: 0, emoji: '🍯🍯' },
  { id: 'extra', label: 'Extra dulce', price: 0, emoji: '🍯🍯🍯' },
]

export const extras: Option[] = [
  { id: 'fresa-pure', label: 'Puré de Fresa', jp: '苺ピューレ', price: 15, emoji: '🍓' },
  { id: 'miel', label: 'Miel', jp: 'はちみつ', price: 8, emoji: '🍯' },
  { id: 'shot', label: 'Shot Extra de Matcha', jp: '抹茶ショット', price: 18, emoji: '🍵' },
  { id: 'tapioca', label: 'Tapioca', jp: 'タピオカ', price: 15, emoji: '🧋' },
  { id: 'coco-rallado', label: 'Coco Rallado', jp: 'ココナッツ', price: 8, emoji: '🥥' },
  { id: 'sakura', label: 'Sakura', jp: '桜', price: 10, emoji: '🌸' },
  { id: 'chocolate', label: 'Chocolate', jp: 'チョコ', price: 10, emoji: '🍫' },
]

export const DELIVERY_FEE = 35
