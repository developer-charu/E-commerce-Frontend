import React from "react";
import { Tag, Button, Empty, message } from "antd";
import { Link } from "react-router";
import { AccountLayout } from "./AccountLayout.tsx";
import { MOCK_ORDERS } from "../../../mock/ecommerceMockData.ts";

const STATUS_TAG_COLOR: Record<string, string> = {
  Delivered: "success",
  Shipped: "processing",
  Processing: "warning",
  Cancelled: "error",
};

export const OrdersPage: React.FC = () => {
  return (
    <AccountLayout>
      <div className="pb-4 border-b border-gray-100 mb-6">
        <h2 className="text-xl font-bold text-gray-900">My Orders</h2>
        <p className="text-sm text-gray-500">Track current shipments and view previous order history</p>
      </div>

      {MOCK_ORDERS.length === 0 ? (
        <Empty description="You have not placed any orders yet." />
      ) : (
        <div className="space-y-4">
          {MOCK_ORDERS.map((order) => (
            <div
              key={order.id}
              className="border border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
            >
              {/* Order Card Header */}
              <div className="bg-gray-50 px-4 py-3 border-b border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div>
                    <span className="text-gray-500 block text-xs">ORDER PLACED</span>
                    <span className="font-semibold text-gray-800">{order.date}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">TOTAL</span>
                    <span className="font-semibold text-gray-800">${order.totalAmount.toFixed(2)}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 block text-xs">SHIP TO</span>
                    <span className="font-medium text-gray-700 truncate max-w-[140px] block" title={order.shippingAddress}>
                      {order.shippingAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-400 font-mono">{order.orderNumber}</span>
                  <Tag color={STATUS_TAG_COLOR[order.status] || "default"}>
                    {order.status}
                  </Tag>
                </div>
              </div>

              {/* Order Items */}
              <div className="p-4 divide-y divide-gray-100">
                {order.items.map((item) => (
                  <div key={item.productId} className="flex items-center justify-between py-2 first:pt-0 last:pb-0 gap-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={item.image}
                        alt={item.productName}
                        className="w-14 h-14 object-cover rounded-lg border border-gray-100"
                      />
                      <div>
                        <Link
                          to={`/products/${item.productId}`}
                          className="font-medium text-sm text-gray-900 hover:text-emerald-600 line-clamp-1"
                        >
                          {item.productName}
                        </Link>
                        <div className="text-xs text-gray-500 mt-0.5">
                          Qty: {item.quantity} · Price: ${item.price.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        size="small"
                        onClick={() => message.info(`Tracking details simulated for ${order.orderNumber}`)}
                      >
                        Track Item
                      </Button>
                      <Button
                        size="small"
                        type="link"
                        onClick={() => message.info(`Invoice download simulated for ${order.orderNumber}`)}
                      >
                        Invoice
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  );
};

export default OrdersPage;

