import React, { useState } from "react";
import { Link } from "react-router";
import { Table, Tag, Button, Input, Space, Alert } from "antd";
import type { ColumnsType } from "antd/es/table";
import {
  AiOutlinePlus,
  AiOutlineUpload,
  AiOutlineSearch,
  AiOutlineEdit,
  AiOutlineSafety,
} from "react-icons/ai";
import { EComLayoutComponent } from "../layout/EComLayoutComponent.tsx";
import { MOCK_PRODUCTS } from "../../../mock/ecommerceMockData.ts";
import type { Product } from "../../../types/ecommerce.types.ts";
import { useRole } from "../../../hooks/useRole.ts";

export const InventoryPage: React.FC = () => {
  const { role } = useRole();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredData = MOCK_PRODUCTS.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const columns: ColumnsType<Product> = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
      render: (_, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.thumbnail}
            alt={record.name}
            className="w-10 h-10 object-cover rounded border border-gray-100"
          />
          <div>
            <div className="font-semibold text-gray-900 text-sm line-clamp-1">{record.name}</div>
            <div className="text-xs text-gray-400">SKU: {record.sku} · Brand: {record.brand}</div>
          </div>
        </div>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      render: (price) => <span className="font-semibold">${price.toFixed(2)}</span>,
    },
    {
      title: "Stock",
      dataIndex: "stockCount",
      key: "stockCount",
      sorter: (a, b) => a.stockCount - b.stockCount,
      render: (count) => (
        <span className={`font-medium ${count < 10 ? "text-amber-600" : "text-gray-700"}`}>
          {count} units
        </span>
      ),
    },
    {
      title: "Status",
      dataIndex: "inStock",
      key: "inStock",
      render: (inStock, record) => (
        <Tag color={inStock ? (record.stockCount < 10 ? "warning" : "success") : "error"}>
          {inStock ? (record.stockCount < 10 ? "Low Stock" : "In Stock") : "Out of Stock"}
        </Tag>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Link to="/inventory/update-single" className="text-emerald-600 hover:text-emerald-700 font-medium text-xs flex items-center gap-1">
            <AiOutlineEdit /> Edit
          </Link>
        </Space>
      ),
    },
  ];

  return (
    <EComLayoutComponent>
      <div className="space-y-6">
        {/* Role information banner */}
        <Alert
          message={
            <div className="flex items-center gap-2">
              <AiOutlineSafety className="text-emerald-600" size={18} />
              <span className="font-medium">
                Sales & Admin Management Console (Active Mode: <strong>{role}</strong>)
              </span>
            </div>
          }
          description="This interface is prepared for upcoming Sales and Admin authorization modules. Navigation access is controlled centrally via ecommerceNavigation.ts."
          type="info"
          showIcon={false}
          className="rounded-xl border border-emerald-100"
        />

        {/* Header bar */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-2xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Product Inventory</h1>
              <p className="text-xs text-gray-500 mt-0.5">
                Manage your product catalog, real-time stock levels and pricing
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <Link to="/inventory/upload-single">
                <Button
                  type="primary"
                  icon={<AiOutlinePlus />}
                  style={{ backgroundColor: "#059669", borderColor: "#059669" }}
                >
                  Add Product
                </Button>
              </Link>
              <Link to="/inventory/upload-bulk">
                <Button icon={<AiOutlineUpload />}>Bulk Upload</Button>
              </Link>
            </div>
          </div>

          {/* Search bar */}
          <div className="mb-4 max-w-sm">
            <Input
              placeholder="Search by name, SKU or brand..."
              prefix={<AiOutlineSearch className="text-gray-400" />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              allowClear
            />
          </div>

          {/* Ant Design Data Table */}
          <Table
            columns={columns}
            dataSource={filteredData}
            rowKey="id"
            pagination={{ pageSize: 6 }}
            scroll={{ x: 600 }}
          />
        </div>
      </div>
    </EComLayoutComponent>
  );
};

export default InventoryPage;

