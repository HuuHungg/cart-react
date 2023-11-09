import React, { useEffect, useState } from "react";
import { Container, Row, Col, InputGroup, FormControl } from "react-bootstrap";
import { useThemeHook } from "../GlobalComponents/ThemeProvider";
import { BiSearch } from "react-icons/bi";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const [theme] = useThemeHook();
  const [searchInput, setSearchInput] = useState("");
  const [productData, setProductData] = useState([]);

  const apiUrl = "https://api-exercise-sopi.vercel.app/api/v1/products";

  async function getResponse() {
    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      console.log("API Response:", data); // Kiểm tra dữ liệu trước khi setProductData
      setProductData(data.data); // Chú ý đến cách truy cập vào mảng sản phẩm
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  }

  useEffect(() => {
    getResponse();
  }, []);

  useEffect(() => {
    console.log("Product Data:", productData);
  }, [productData]);

  return (
    <Container className="py-4">
      <Row className="justify-content-center">
        <Col xs={10} md={7} lg={6} xl={4} className="mb-3 mx-auto text-center">
          <h1 className={theme ? "text-light my-5" : "text-black my-5"}>
            Search products
          </h1>
          <InputGroup className="mb-3">
            <InputGroup.Text
              className={
                theme
                  ? "bg-black text-dark-primary"
                  : "bg-light text-light-primary"
              }
            >
              <BiSearch size="2rem" />
            </InputGroup.Text>
            <FormControl
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className={
                theme ? "bg-light-black text-light" : "bg-light text-black"
              }
            />
          </InputGroup>
        </Col>
        <Row className="justify-content-center">
          {productData
            .filter((item) =>
              item.name.toLowerCase().includes(searchInput.toLowerCase())
            )
            .map((item, i) => (
              <ProductCard data={item} key={i} />
            ))}
        </Row>
      </Row>
    </Container>
  );
};

export default Home;
