// Sierra Leone's 16 districts (2017 boundaries)
export const districts = [
  'Western Area Urban',
  'Western Area Rural',
  'Bo',
  'Bombali',
  'Bonthe',
  'Falaba',
  'Kailahun',
  'Kambia',
  'Karene',
  'Kenema',
  'Koinadugu',
  'Kono',
  'Moyamba',
  'Port Loko',
  'Pujehun',
  'Tonkolili',
].map((d) => ({ label: d, value: d.toLowerCase().replace(/\s+/g, '-') }))
