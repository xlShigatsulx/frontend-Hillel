import { Footer, Header, PageLayout } from '@components';
import { Link } from 'react-router-dom';
import style from './AboutMePage.module.scss';

export function AboutPage() {
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div className={style.container}>
          <h1>Про мне</h1>
          <p>Привіт! Мене звати Руслан, і я вчуся програмуванню.</p>

          <h2>Хто я?</h2>
          <p>
            Я захоплений розробник. Мені подобається створювати проєкти, які
            вирішують реальні завдання.
          </p>

          <h2>Чим я займаюсь?</h2>
          <ul>
            <li>Розробляю веб-додатки на React</li>
            <li>Працюю з JavaScript і .NET</li>
            <li>Люблю писати чистий і зручний код</li>
          </ul>

          <h2>Зв'язатися зі мною</h2>
          <p>
            Якщо у вас є запитання чи пропозиції, напишіть мені через сторінку{' '}
            <Link to="/contacts">Контакти</Link>.{' '}
          </p>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
