export interface Book {
  id: number;
  title: string;
  authors: string[];
  editors: string[];
  publisher: string;
  versionReleaseYear: string;
  originalReleaseYear: string;
  fiction: boolean;
  ISBN: string;
  owner: string;
  readByJack: boolean;
  readByLeila: boolean;
  category?: string;
  subCategories?: string[];
  translators?: string[];
  originalLanguage?: string;
  onLoanFrom?: string;
  onLoanTo?: string;
}
