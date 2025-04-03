import { Footer, Header, PageLayout } from '@components';
import { useState } from 'react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Send Data:', formData);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div>
          <h1>Контакти</h1>
          <p>Зв'яжіться з нами, використовуючи форму нижче.</p>

          <form onSubmit={handleSubmit}>
            <span>Ім'я:</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <span>Email:</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <span>Повідомлення:</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />

            <button type="submit">Надіслати</button>
          </form>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
