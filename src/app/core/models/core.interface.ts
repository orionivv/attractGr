export interface IData {
  id: number;
  name: string;
  city: number;
  category: number;
  price: number;
}

export interface ICategory {
  id: number;
  name: string;
}

export interface ICity {
  id: number;
  name: string;
}

export interface IGetDataSuccessful {
  data: Array<IData>;
  category: Array<ICategory>;
  city: Array<ICity>;
}

export interface INormalizeData {
  id: number;
  name: string;
  city: string;
  category: string;
  price: number;
}

