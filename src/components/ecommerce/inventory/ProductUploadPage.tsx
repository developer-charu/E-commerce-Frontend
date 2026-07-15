import React from "react";
import { Form, Input, InputNumber, Select, Button, Upload, Card, message } from "antd";
import { AiOutlineUpload, AiOutlineArrowLeft } from "react-icons/ai";
import { Link, useNavigate } from "react-router";
import { EComLayoutComponent } from "../layout/EComLayoutComponent.tsx";
import { MOCK_CATEGORIES, MOCK_BRANDS } from "../../../mock/ecommerceMockData.ts";

const { TextArea } = Input;

export const ProductUploadPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleFinish = () => {
    message.success("Product created successfully (Demo mock)");
    navigate("/inventory");
  };

  return (
    <EComLayoutComponent>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center gap-3">
          <Link to="/inventory">
            <Button icon={<AiOutlineArrowLeft />} size="small">
              Back to Inventory
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Single Product Upload</h1>
        </div>

        <Card className="rounded-xl border border-gray-200 shadow-2xs">
          <Form form={form} layout="vertical" onFinish={handleFinish} initialValues={{ inStock: true }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Form.Item
                name="name"
                label="Product Name"
                rules={[{ required: true, message: "Please input product name" }]}
                className="sm:col-span-2"
              >
                <Input placeholder="e.g. Sony WH-1000XM5 Headphones" />
              </Form.Item>

              <Form.Item
                name="brand"
                label="Brand"
                rules={[{ required: true, message: "Please select brand" }]}
              >
                <Select
                  placeholder="Select brand"
                  options={MOCK_BRANDS.map((b) => ({ label: b, value: b }))}
                />
              </Form.Item>

              <Form.Item
                name="category"
                label="Category"
                rules={[{ required: true, message: "Please select category" }]}
              >
                <Select
                  placeholder="Select category"
                  options={MOCK_CATEGORIES.map((c) => ({ label: c.name, value: c.slug }))}
                />
              </Form.Item>

              <Form.Item
                name="sku"
                label="SKU / Product Code"
                rules={[{ required: true, message: "Please input SKU" }]}
              >
                <Input placeholder="e.g. SNY-WH-001" />
              </Form.Item>

              <Form.Item
                name="price"
                label="Selling Price ($)"
                rules={[{ required: true, message: "Price is required" }]}
              >
                <InputNumber min={0.01} step={0.01} style={{ width: "100%" }} prefix="$" />
              </Form.Item>

              <Form.Item name="originalPrice" label="Original Price (MSRP)">
                <InputNumber min={0} step={0.01} style={{ width: "100%" }} prefix="$" />
              </Form.Item>

              <Form.Item
                name="stockCount"
                label="Stock Quantity"
                rules={[{ required: true, message: "Stock count is required" }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>

              <Form.Item
                name="shortDescription"
                label="Short Summary"
                className="sm:col-span-2"
                rules={[{ required: true, message: "Summary is required" }]}
              >
                <Input placeholder="One-line product hook" />
              </Form.Item>

              <Form.Item
                name="fullDescription"
                label="Full Description"
                className="sm:col-span-2"
              >
                <TextArea rows={4} placeholder="Detailed product specifications and features..." />
              </Form.Item>

              <Form.Item label="Product Images" className="sm:col-span-2">
                <Upload.Dragger multiple listType="picture" beforeUpload={() => false}>
                  <p className="ant-upload-drag-icon">
                    <AiOutlineUpload size={36} className="text-emerald-600 mx-auto" />
                  </p>
                  <p className="ant-upload-text">Click or drag product images to this area to upload</p>
                  <p className="ant-upload-hint">Support for PNG, JPG, or WebP (mock upload)</p>
                </Upload.Dragger>
              </Form.Item>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <Button onClick={() => navigate("/inventory")}>Cancel</Button>
              <Button
                type="primary"
                htmlType="submit"
                style={{ backgroundColor: "#059669", borderColor: "#059669" }}
              >
                Save & Publish Product
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </EComLayoutComponent>
  );
};

export default ProductUploadPage;

