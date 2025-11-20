'use client';

import { useState } from 'react';
import { Plus, Edit2, Trash2 } from 'lucide-react';

interface PaymentCard {
  id: string;
  type: string;
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
}

export default function PaymentSettings() {
  const [cards, setCards] = useState<PaymentCard[]>([
    {
      id: '1',
      type: 'Mastercard',
      cardNumber: '**** **** **** 2829',
      expiryDate: '12/25',
      cardholderName: 'John Doe',
    },
  ]);

  const [showAddCard, setShowAddCard] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const handleAddCard = () => {
    setShowAddCard(true);
  };

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleDelete = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setShowAddCard(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Payment Settings</h2>
        {!showAddCard && cards.length > 0 && (
          <button
            onClick={handleAddCard}
            className="flex items-center gap-2 px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
          >
            <Plus className="w-4 h-4" />
            Add card
          </button>
        )}
      </div>

      <div className="space-y-4">
        {cards.length > 0 && !showAddCard && (
          <div>
            <p className="text-sm text-gray-600 mb-4 font-medium">Your saved cards</p>
            <div className="space-y-3">
              {cards.map(card => (
                <div
                  key={card.id}
                  className="flex items-center justify-between p-4 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-4 flex-1">
                    <div className="w-12 h-8 bg-linear-to-br from-orange-400 to-orange-600 rounded flex items-center justify-center">
                      <span className="text-white text-xs font-bold">MC</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{card.type}</p>
                      <p className="text-sm text-gray-600">{card.cardNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-500">Expires</p>
                      <p className="text-sm font-medium text-gray-900">{card.expiryDate}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <button
                      onClick={() => handleEdit(card.id)}
                      className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit card"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(card.id)}
                      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete card"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleAddCard}
              className="w-full mt-4 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              + Add card
            </button>
          </div>
        )}

        {showAddCard && (
          <div className="p-4 border border-gray-300 rounded-lg bg-white">
            <h3 className="font-semibold text-gray-900 mb-4">Add a new card</h3>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  />
                </div>
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Add Card
                </button>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="flex-1 px-6 py-2 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
