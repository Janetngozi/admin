"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, X, Plus } from "lucide-react";

interface CreditCard {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  zip?: string;
  cvv?: string;
}

const mockCards: CreditCard[] = [
  {
    id: "1",
    cardNumber: "4111 1111 1111 1111",
    cardHolder: "John Doe",
    expiryDate: "12/25",
  },
  {
    id: "2",
    cardNumber: "5555 5555 5555 4444",
    cardHolder: "John Doe",
    expiryDate: "08/24",
  },
];

export default function ReviewAndPay({
  isExpanded,
  onToggle,
  isCompleted,
  selectedCardId = "1",
  onSelectCard,
  onPlaceOrder,
}: {
  isExpanded: boolean;
  onToggle: () => void;
  isCompleted: boolean;
  selectedCardId?: string;
  onSelectCard?: (id: string) => void;
  onPlaceOrder?: () => void;
}) {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const [newCard, setNewCard] = useState<CreditCard>({
    id: "",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    zip: "",
    cvv: "",
  });

  const displayText = isCompleted
    ? "Payment confirmed"
    : "Select a payment method";

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingCard(false);

    setNewCard({
      id: "",
      cardHolder: "",
      cardNumber: "",
      expiryDate: "",
      zip: "",
      cvv: "",
    });
  };

  return (
    <>
      {/* MAIN ACCORDION */}
      <div className="bg-white rounded-lg border border-gray-200 mb-4">
        <button
          onClick={onToggle}
          className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
        >
          <div className="text-left">
            <h3 className="font-semibold text-gray-900 text-base">
              Review & Pay
            </h3>
            {isCompleted && (
              <p className="text-sm text-gray-600 mt-1">{displayText}</p>
            )}
          </div>

          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-600" />
          )}
        </button>

        {isExpanded && (
          <div className="px-6 py-4 border-t border-gray-200 space-y-6">
            {/* PAYMENT METHOD */}
            <div>
              <p className="text-sm font-semibold text-gray-900 mb-4">
                Select a payment method
              </p>

              <div className="space-y-3">
                {mockCards.map((card) => (
                  <label
                    key={card.id}
                    className={`flex items-center p-4 border rounded-lg cursor-pointer transition 
                    ${
                      selectedCardId === card.id
                        ? "border-blue-600 bg-blue-50"
                        : "border-gray-300 hover:border-blue-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={card.id}
                      checked={selectedCardId === card.id}
                      onChange={() => onSelectCard?.(card.id)}
                      className="w-4 h-4"
                    />

                    <div className="ml-3 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900">
                          Credit or debit card
                        </p>

                        <div className="flex gap-1">
                          <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded">
                            Visa
                          </span>

                          {card.id === "2" && (
                            <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                              Mastercard
                            </span>
                          )}
                        </div>
                      </div>

                      <p className="text-xs text-gray-600 mt-1">
                        {card.cardNumber}
                      </p>
                      <p className="text-xs text-gray-600">
                        Exp: {card.expiryDate}
                      </p>
                    </div>
                  </label>
                ))}
              </div>

              {/* ADD NEW CARD BUTTON */}
              <button
                onClick={() => setIsAddingCard(true)}
                className="w-full mt-4 flex items-center justify-center gap-2 px-4 py-2 border border-blue-600 text-blue-600 rounded-md hover:bg-blue-50 transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add a new card
              </button>
            </div>

            {/* TERMS */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <label className="flex items-start gap-3 cursor-pointer">
                <input type="checkbox" className="mt-1" defaultChecked />
                <span className="text-sm text-gray-700">
                  I have read and agree to the Terms and Conditions
                </span>
              </label>
            </div>

            {/* PLACE ORDER */}
            <button
              onClick={onPlaceOrder}
              className="w-full mt-4 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md"
            >
              Place order
            </button>
          </div>
        )}
      </div>

      {/* ------------------ MODAL (Figma exact layout) ------------------ */}
      {isAddingCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/5">
          <div className="bg-white rounded-xl shadow-xl w-[588px] p-12 relative">
            {/* TITLE */}
            <h3 className="text-center text-lg font-semibold text-gray-900 mb-10">
              Add a new card
            </h3>

            {/* CLOSE BUTTON */}
            <button
              onClick={() => setIsAddingCard(false)}
              className="absolute top-6 right-6 text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>

            {/* FORM */}
            <form onSubmit={handleAddCard} className="space-y-6">
              {/* Holder + Zip */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Card holder name
                  </label>
                  <input
                    type="text"
                    value={newCard.cardHolder}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cardHolder: e.target.value })
                    }
                    placeholder="Enter card holder name"
                    className="w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:ring-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Zip code
                  </label>
                  <input
                    type="text"
                    value={newCard.zip}
                    onChange={(e) =>
                      setNewCard({ ...newCard, zip: e.target.value })
                    }
                    placeholder="E.g 11011"
                    className="w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:ring-2 outline-none"
                  />
                </div>
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Card number
                </label>
                <input
                  type="text"
                  value={newCard.cardNumber}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cardNumber: e.target.value })
                  }
                  placeholder="Enter card number"
                  className="w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:ring-2 outline-none"
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Expiry date
                  </label>
                  <input
                    type="text"
                    value={newCard.expiryDate}
                    onChange={(e) =>
                      setNewCard({ ...newCard, expiryDate: e.target.value })
                    }
                    placeholder="Enter expiry date"
                    className="w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:ring-2 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={newCard.cvv}
                    onChange={(e) =>
                      setNewCard({ ...newCard, cvv: e.target.value })
                    }
                    placeholder="Enter CVV"
                    className="w-full px-3 py-3 border rounded-lg border-gray-300 focus:ring-blue-500 focus:ring-2 outline-none"
                  />
                </div>
              </div>

              {/* CONFIRM BUTTON */}
              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg mt-2"
              >
                Confirm order
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
