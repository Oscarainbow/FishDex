export interface FishLocation {
  id: string;

  name: string;

  latitude: number;

  longitude: number;
}

export interface Fish {
  id: string;

  commonName: string;

  scientificName: string;

  imageUrl: string;

  description: string;

  habitat: string;

  averageLength: string;

  fishingTips: string[];

  locations: FishLocation[];

  scannedCount: number;

  collected: boolean;
}