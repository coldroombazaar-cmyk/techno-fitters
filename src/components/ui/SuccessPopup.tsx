'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle } from 'react-icons/fa';

const SUCCESS_MESSAGES: Record<string, string> = {
  quote: 'Thank you! Our team will send you a quotation shortly.',
  consultation: 'Thank you! Our expert will contact you soon.',
  consultant: 'Thank you! Our consultant will reach out within 24 hours.',
};

interface SuccessPopupProps {
  leadType: 'quote' | 'consultation' | 'consultant';
  onClose: () => void;
  autoCloseMs?: number;
}

export default function SuccessPopup({
  leadType,
  onClose,
  autoCloseMs = 3000,
}: SuccessPopupProps) {
  useEffect(() => {
    const timer = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(timer);
  }, [onClose, autoCloseMs]);

  const message = SUCCESS_MESSAGES[leadType] ?? SUCCESS_MESSAGES.quote;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      className="text-center py-8"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.1 }}
        className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 10, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <FaCheckCircle size={40} />
        </motion.div>
      </motion.div>
      <motion.h3
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-2xl font-bold text-gray-900 mb-2"
      >
        Thank You!
      </motion.h3>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-gray-600 text-sm leading-relaxed px-4"
      >
        {message}
      </motion.p>
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        onClick={onClose}
        className="mt-6 text-sm text-brand-green font-medium hover:underline"
      >
        Close
      </motion.button>
    </motion.div>
  );
}
