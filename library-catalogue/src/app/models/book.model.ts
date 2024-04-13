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

export const EMPTY_BOOK: Book = {
  id: -1,
  title: '',
  authors: [],
  editors: [],
  publisher: '',
  versionReleaseYear: '',
  originalReleaseYear: '',
  fiction: false,
  ISBN: '',
  owner: '',
  readByJack: false,
  readByLeila: false,
};
