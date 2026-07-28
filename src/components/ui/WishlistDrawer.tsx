"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiShoppingBag, FiHeart } from "react-icons/fi";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import type { CartItem } from "@/context/CartContext";

export default function WishlistDrawer() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlist();
  const { addItem } = useCart();

  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleAddToCart = (item: (typeof items)[0]) => {
    addItem(item as Omit<CartItem, "quantity">);
    removeItem(item.id);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={closeWishlist}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 z-[110] h-full w-full max-w-md bg-ink border-l border-white/10 shadow-2xl flex flex-col"
          >
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
              <h2 className="text-[1.8rem] font-display font-normal text-white">
                Wishlist ({items.length})
              </h2>
              <button
                onClick={closeWishlist}
                className="w-10 h-10 flex items-center justify-center text-white/50 hover:text-white transition-colors"
              >
                <FiX className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <FiHeart className="w-10 h-10 text-white/20 mb-4" strokeWidth={1} />
                  <p className="text-[1.5rem] text-white/30 font-sans">
                    Your wishlist is empty
                  </p>
                  <p className="text-[1.3rem] text-white/20 font-sans mt-2">
                    Save your favorite fragrances here
                  </p>
                </div>
              ) : (
                items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-4 border border-white/10 bg-white/[0.02]"
                  >
                    <div className="w-20 h-20 shrink-0 bg-ink-soft overflow-hidden border border-white/5">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[1.4rem] font-sans font-medium text-white">
                        {item.name}
                      </h3>
                      <p className="text-[1.2rem] text-white/40 font-sans mt-0.5">
                        Rs. {item.price}
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="flex items-center gap-2 px-4 py-2 bg-red text-white text-[1.1rem] font-sans font-medium hover:bg-red-dark transition-colors"
                        >
                          <FiShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
                          Add to Cart
                        </button>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-white/30 hover:text-red transition-colors text-[1.1rem] font-sans px-3 py-2"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
