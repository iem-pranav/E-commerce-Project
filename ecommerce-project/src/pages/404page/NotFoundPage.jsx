import { Header } from '../../components/Header';
import notFoundImage from "./404page-image.png";
import './NotFoundPage.css';

export function NotFoundPage({ cart }) {
  return (
    <>
      <Header cart={cart} />

      <img className="notfoundimage" src={notFoundImage} />
    </>  
  );
}