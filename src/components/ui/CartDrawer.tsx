"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    removeItem,
    updateQuantity,
    subtotal,
    clearCart,
  } = useCart();
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            ref={overlayRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-[110] h-full w-full max-w-md bg-ink border-l border-white/10 shadow-2xl flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-[1.8rem] font-display font-normal text-white">
                Cart ({items.length})
              </h2>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <p className="text-[1.5rem] text-white/30 font-sans">
                    Your cart is empty
                  </p>
                  <p className="text-[1.3rem] text-white/20 font-sans mt-2">
                    Add some fragrances to get started
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-white/10 bg-white/[0.02]"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 shrink-0 bg-ink-soft overflow-hidden border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-[1.4rem] font-sans font-medium text-white">
                            {item.name}
                          </h3>
                          <p className="text-[1.2rem] text-white/40 font-sans mt-0.5">
                            Rs. {item.price}
                          </p>
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-white/30 hover:text-red transition-colors p-1"
                        >
                          <FiTrash2 className="w-4 h-4" strokeWidth={1.5} />
                        </button>
                      </div>

                      {/* Quantity controls */}
                      <div className="flex items-center gap-3 mt-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                        >
                          <FiMinus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                        <span className="text-[1.4rem] font-sans text-white w-6 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 flex items-center justify-center border border-white/20 text-white/60 hover:text-white hover:border-white/40 transition-colors"
                        >
                          <FiPlus className="w-3 h-3" strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-white/10 px-6 py-5 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[1.4rem] font-sans text-white/50">Subtotal</span>
                  <span className="text-[2rem] font-display font-normal text-white">
                    Rs. {subtotal.toLocaleString()}
                  </span>
                </div>
                <p className="text-[1.1rem] text-white/30 font-sans">
                  Shipping calculated at checkout
                </p>
                <button className="btn-primary w-full py-4 text-[1.4rem] justify-center">
                  Checkout
                </button>
                <button
                  onClick={clearCart}
                  className="w-full py-3 text-[1.2rem] font-sans text-white/40 hover:text-red transition-colors text-center"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
