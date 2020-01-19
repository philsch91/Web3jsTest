import React from 'react';
import { Product } from '../models/product';

interface Props {
  product: Product;
  //onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeBuyer: (event: React.ChangeEvent<HTMLInputElement>) => void;
  //onChangeValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAdd: (event: React.FormEvent<HTMLFormElement>) => void;
}
  
export const ProductForm: React.FunctionComponent<Props> = ({
  product,
  onChangeBuyer,
  //onChange,
  //onChangeValue,
  onAdd
  }) => (
    <form onSubmit={onAdd}>
      <p>Buyer:</p>
      <input onChange={onChangeBuyer} value={"" + product.buyer} />
      <button type="submit">Safe Deal</button>
    </form>
);