import { Header } from '../../components/Header';
import notFoundImage from "./404page-image.png";
import './NotFoundPage.css';

export function NotFoundPage() {
  return (
    <>
      <Header />

      <img className="notfoundimage" src={notFoundImage} />
    </>  
  );
}