import { useCartStore } from '@store';
import { motion } from 'framer-motion';
import {
  CartItem,
  OrderSummary,
  Footer,
  Header,
  PageLayout,
} from '@components';
import { EmptyCartUI } from './EmptyCartUI';

export function CartPage() {
  const { cart } = useCartStore();
  const cartItems = cart?.items || [];
  return (
    <PageLayout
      renderHeader={() => <Header />}
      renderContent={() => (
        <div className="py-8 md:py-16">
          <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
            <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
              <motion.div
                className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {cartItems.length === 0 ? (
                  <EmptyCartUI />
                ) : (
                  <div className="space-y-6">
                    {cartItems.map((item) => (
                      <CartItem key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </motion.div>

              {cartItems.length > 0 && (
                <motion.div
                  className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <OrderSummary />
                </motion.div>
              )}
            </div>
          </div>
        </div>
      )}
      renderFooter={() => <Footer />}
    />
  );
}
