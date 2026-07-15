import React from "react";
import { Form, Input, InputNumber, Button, Card, message, Select } from "antd";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { EComLayoutComponent } from "../layout/EComLayoutComponent.tsx";
import { MOCK_PRODUCTS } from "../../../mock/ecommerceMockData.ts";

export const ProductUpdatePage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSelectProduct = (productId: string) => {
    const selected = MOCK_PRODUCTS.find((p) => p.id === productId);
    if (selected) {
      form.setFieldsValue({
        id: selected.id,
        name: selected.name,
        price: selected.price,
        originalPrice: selected.originalPrice,
        stockCount: selected.stockCount,
        sku: selected.sku,
      });
    }
  };

  const handleUpdate = () => {
    message.success("Product updated successfully (Demo mock)");
    navigate("/inventory");
  };

  return (
    <EComLayoutComponent>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/inventory">
            <Button icon={<AiOutlineArrowLeft />} size="small">
              Back to Inventory
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Quick Product Update</h1>
        </div>

        <Card className="rounded-xl border border-gray-200 shadow-2xs">
          <div className="mb-4">
            <label className="block text-xs font-semibold text-gray-600 mb-1">
              Select Product to Edit
            </label>
            <Select
              placeholder="Search or pick a product"
              style={{ width: "100%" }}
              onChange={handleSelectProduct}
              options={MOCK_PRODUCTS.map((p) => ({
                value: p.id,
                label: `${p.name} (${p.sku})`,
              }))}
            />
          </div>

          <Form form={form} layout="vertical" onFinish={handleUpdate}>
            <Form.Item name="name" label="Product Name" rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="price" label="Current Price ($)" rules={[{ required: true }]}>
                <InputNumber min={0} step={0.01} style={{ width: "100%" }} prefix="$" />
              </Form.Item>
              <Form.Item name="originalPrice" label="Original Price ($)">
                <InputNumber min={0} step={0.01} style={{ width: "100%" }} prefix="$" />
              </Form.Item>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Form.Item name="stockCount" label="Available Stock" rules={[{ required: true }]}>
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item name="sku" label="SKU Code">
                <Input disabled />
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button onClick={() => navigate("/inventory")}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#059669", borderColor: "#059669" }}
              >
                Apply Updates
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </EComLayoutComponent>
  );
};

export default ProductUpdatePage;

