export interface ArchitectureMasterpiece {
  id: string;
  name: string;
  slug: string;
  category: string;
  categoryNumber: number;
  categoryFolder: string;
  builtDate: string;
  location: string;
  tradition: string;
  style: string;
  details: string;
  imageCollectionUrl: string;
  imageAssetStatus: string;
  imageSourceType: "local" | "external-collection";
}

export interface ArchitectureCategory {
  key: string;
  name: string;
  count: number;
}
