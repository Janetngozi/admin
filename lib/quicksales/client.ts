/**
 * QuickSales API Client
 * 
 * This client handles all communication with the QuickSales ERP system.
 * Update endpoints and payload formats based on QuickSales API documentation.
 */

interface QuickSalesConfig {
  apiUrl: string;
  apiKey: string;
  apiSecret: string;
  format: 'json' | 'xml' | 'csv';
}

interface QuickSalesOrder {
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: Array<{
    sku: string;
    name: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  currency: string;
  status: string;
}

interface QuickSalesOrderResponse {
  success: boolean;
  orderId: string;
  message?: string;
}

interface InventoryItem {
  sku: string;
  quantity: number;
  location?: string;
}

class QuickSalesClient {
  private config: QuickSalesConfig;
  private baseUrl: string;

  constructor() {
    this.config = {
      apiUrl: process.env.QUICKSALES_API_URL || '',
      apiKey: process.env.QUICKSALES_API_KEY || '',
      apiSecret: process.env.QUICKSALES_API_SECRET || '',
      format: (process.env.QUICKSALES_FORMAT as 'json' | 'xml' | 'csv') || 'json',
    };

    if (!this.config.apiUrl || !this.config.apiKey || !this.config.apiSecret) {
      console.warn('⚠️ QuickSales credentials not configured. Integration will fail.');
    }

    this.baseUrl = this.config.apiUrl.replace(/\/$/, '');
  }

  /**
   * Generate authentication headers
   */
  private getAuthHeaders(): HeadersInit {
    // TODO: Update based on QuickSales authentication method
    // Common methods: API Key, OAuth, Basic Auth, Custom headers
    return {
      'Authorization': `Bearer ${this.config.apiKey}`, // Update based on QuickSales requirements
      'X-API-Key': this.config.apiKey,
      'X-API-Secret': this.config.apiSecret,
      'Content-Type': 'application/json',
      'Accept': `application/${this.config.format}`,
    };
  }

  /**
   * Make authenticated request to QuickSales API
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `QuickSales API error (${response.status}): ${errorText}`
        );
      }

      const data = await response.json();
      return data as T;
    } catch (error: any) {
      console.error('QuickSales API request failed:', error);
      throw new Error(`QuickSales API request failed: ${error.message}`);
    }
  }

  /**
   * Create order in QuickSales
   */
  async createOrder(order: QuickSalesOrder): Promise<QuickSalesOrderResponse> {
    // TODO: Update endpoint and payload format based on QuickSales API documentation
    const endpoint = '/api/orders'; // Update this endpoint
    
    // Transform order to QuickSales format if needed
    const payload = {
      // Update this structure based on QuickSales requirements
      order_number: order.orderNumber,
      customer: {
        email: order.customerEmail,
        name: order.customerName,
      },
      line_items: order.items.map((item) => ({
        sku: item.sku,
        product_name: item.name,
        quantity: item.quantity,
        unit_price: item.price,
      })),
      totals: {
        subtotal: order.subtotal,
        tax: order.tax,
        shipping: order.shipping,
        discount: order.discount,
        total: order.total,
      },
      currency: order.currency,
      status: order.status,
    };

    return this.request<QuickSalesOrderResponse>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get order status from QuickSales
   */
  async getOrderStatus(quickSalesOrderId: string): Promise<{
    status: string;
    trackingNumber?: string;
    shippedAt?: string;
  }> {
    // TODO: Update endpoint based on QuickSales API
    const endpoint = `/api/orders/${quickSalesOrderId}`;
    
    return this.request(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get inventory for a product
   */
  async getInventory(sku: string): Promise<InventoryItem> {
    // TODO: Update endpoint based on QuickSales API
    const endpoint = `/api/inventory/${sku}`;
    
    return this.request<InventoryItem>(endpoint, {
      method: 'GET',
    });
  }

  /**
   * Get multiple products inventory
   */
  async getBulkInventory(skus: string[]): Promise<InventoryItem[]> {
    // TODO: Update endpoint based on QuickSales API
    const endpoint = '/api/inventory/bulk';
    
    return this.request<InventoryItem[]>(endpoint, {
      method: 'POST',
      body: JSON.stringify({ skus }),
    });
  }

  /**
   * Update product in QuickSales
   */
  async updateProduct(product: {
    sku: string;
    name: string;
    price: number;
    stock: number;
  }): Promise<{ success: boolean }> {
    // TODO: Update endpoint based on QuickSales API
    const endpoint = `/api/products/${product.sku}`;
    
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(product),
    });
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    // TODO: Implement webhook signature verification based on QuickSales method
    // Common methods: HMAC-SHA256, custom algorithm
    
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', process.env.QUICKSALES_WEBHOOK_SECRET || '')
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }
}

// Singleton instance
export const quickSalesClient = new QuickSalesClient();

// Export types
export type { QuickSalesOrder, QuickSalesOrderResponse, InventoryItem };



