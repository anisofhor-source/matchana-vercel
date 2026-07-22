export type Option = {
  id: string
  label: string
  jp?: string
  price: number
  note?: string
  emoji?: string
}

export const bases: Option[] = [
  { id: 'latte', label: 'Matcha Latte', jp: '抹茶ラテ', price: 75, note: 'Cremoso y suave' },
  { id: 'iced', label: 'Matcha Helado', jp: 'アイス抹茶', price: 78, note: 'Con hielo' },
  { id: 'usucha', label: 'Matcha Puro', jp: '薄茶', price: 68, note: 'Batido ceremonial' },
  { id: 'strawberry', label: 'Fresa Matcha', jp: '苺抹茶', price: 88, note: 'Capa de fresa' },
]

export const sizes: Option[] = [
  { id: 'chico', label: 'Chico', jp: '小', price: 0, note: '350 ml' },
  { id: 'mediano', label: 'Mediano', jp: '中', price: 12, note: '500 ml' },
  { id: 'grande', label: 'Grande', jp: '大', price: 22, note: '700 ml' },
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
  { id: 'ninguno', label: 'Sin foam', jp: 'なし', price: 0 },
  { id: 'salado', label: 'Foam salado', jp: '塩フォーム', price: 14, note: 'Cheese foam' },
  { id: 'fresa', label: 'Foam de fresa', jp: '苺フォーム', price: 16, note: 'Cremoso rosa' },
  { id: 'vainilla', label: 'Foam de vainilla', jp: 'バニラフォーム', price: 14 },
  { id: 'coco', label: 'Foam de coco', jp: 'ココナッツフォーム', price: 16 },
]

export const sweetness: Option[] = [
  { id: 'sin', label: 'Sin azúcar', price: 0 },
  { id: 'poco', label: 'Poco dulce', price: 0 },
  { id: 'normal', label: 'Normal', price: 0 },
  { id: 'extra', label: 'Extra dulce', price: 0 },
]

export const extras: Option[] = [
  { id: 'boba', label: 'Perlas de tapioca', jp: 'タピオカ', price: 15 },
  { id: 'shot', label: 'Shot extra de matcha', jp: '抹茶ショット', price: 18 },
  { id: 'vainilla', label: 'Jarabe de vainilla', jp: 'バニラ', price: 8 },
  { id: 'miel', label: 'Miel de agave', jp: 'アガベ', price: 8 },
  { id: 'crema', label: 'Crema batida', jp: 'ホイップ', price: 12 },
]

export const DELIVERY_FEE = 35
