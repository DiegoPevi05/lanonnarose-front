export interface WebData {
  webContent: webContentLanguage[];
  products: CatalogLanguage[];
  blogs: BlogSection[];
}

export interface webContentLanguage {
  language: string;
  content: WebContentProps[];
}
export interface WebContentProps {
  title:string; 
  name:string;
  content:string;
}

export interface CatalogLanguage {
  language: string;
  content: CatalogProps[];
  sections:string[];
}

export interface CatalogProps {
  section: string;
  products : ProductProps[];
}

export interface ProductProps {
  id            : number;
  title         : string;
  shortDescription : string;
  description   : string;
  image         : string;
  isImportant   : boolean;
}

export interface BlogSection {
  language : string;
  content : Blog[];
}

export interface Blog {
  title: string;
  subTitle: string;
  description: string;
  images: string[];
  date: string;
  BullletPoins: string[];
  isImportant   : boolean;
}



