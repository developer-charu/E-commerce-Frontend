import React, { useMemo } from "react";
import { useParams, Link, useNavigate } from "react-router";
import { Breadcrumb, Button, Result } from "antd";
import { EComLayoutComponent } from "../components/ecommerce/layout/EComLayoutComponent.tsx";
import { ProductGallery } from "../components/ecommerce/product/ProductGallery.tsx";
import { ProductDetails } from "../components/ecommerce/product/ProductDetails.tsx";
import { RelatedProducts } from "../components/ecommerce/product/RelatedProducts.tsx";
import { MOCK_PRODUCTS } from "../mock/ecommerceMockData.ts";

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const product = useMemo(() => {
    return MOCK_PRODUCTS.find((p) => p.id === id);
  }, [id]);

  if (!product) {
    return (
      <EComLayoutComponent>
        <div className="py-16">
          <Result
            status="404"
            title="Product Not Found"
            subTitle="Sorry, the product you visited does not exist in our catalog."
            extra={
              <Button
                type="primary"
                style={{ backgroundColor: "#059669", borderColor: "#059669" }}
                onClick={() => navigate("/products")}
              >
                Back to Catalog
              </Button>
            }
          />
        </div>
      </EComLayoutComponent>
    );
  }

  const breadcrumbItems = [
    { title: <Link to="/">Home</Link> },
    { title: <Link to="/products">Products</Link> },
    {
      title: (
        <Link to={`/products?category=${product.category}`}>
          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
        </Link>
      ),
    },
    { title: <span className="text-gray-900 font-medium">{product.name}</span> },
  ];

  return (
    <EComLayoutComponent>
      {/* Breadcrumb Navigation */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      {/* Main 2-column detail grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Gallery column (5 cols) */}
        <div className="lg:col-span-5">
          <ProductGallery images={product.images} productName={product.name} />
        </div>

        {/* Right Details column (7 cols) */}
        <div className="lg:col-span-7">
          <ProductDetails product={product} />
        </div>
      </div>

      {/* Related Products Section */}
      <RelatedProducts currentProduct={product} />
    </EComLayoutComponent>
  );
};

export default ProductDetailPage;

