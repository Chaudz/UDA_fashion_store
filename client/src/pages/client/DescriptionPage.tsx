const DescriptionPage = () => {
  return (
    <div className="w-100 d-flex  p-5">
      <div style={{ width: "70%", height: "100%" }}>
        <h1>Test</h1>
        <a
          style={{
            width: "50px",
            height: "50px",
            color: "black",
          }}
          href="https://product.hstatic.net/1000096703/product/160_e51c5869662e4bd88256871414a1e8e6_master.jpg"
        ></a>
        <img
          className=" px-4"
          style={{
            width: "100%",
            objectFit: "cover",
          }}
          src="https://product.hstatic.net/1000096703/product/160_e51c5869662e4bd88256871414a1e8e6_master.jpg"
          alt=""
        />
      </div>
      <div className="w-50 justify-content-between ">
        <div
          style={{
            paddingBottom: "10px",
            border: "2px dotted #dfe0e1",
          }}
        >
          <p
            style={{
              fontWeight: "bold",
              paddingBottom: "5px",
            }}
          >
            áo khoác dù phối 2 lớp AKD0036
          </p>
          <p
            style={{
              color: "#939393",
            }}
          >
            SKU: AKD0036MMXĐ
          </p>
        </div>
        <div
          style={{
            padding: "10px 0",
            border: "2px dotted #dfe0e1",
            fontWeight: "bold",
          }}
        >
          <p>350,000 đ</p>
        </div>
        <div className="d-flex justify-content-between w-100 ">
          <div>
            <button
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              M
            </button>
            <button
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              M
            </button>
            <button
              style={{
                width: "50px",
                height: "50px",
                border: "1px solid black",
                margin: "10px",
                borderRadius: "5px",
              }}
            >
              M
            </button>
          </div>
          <div
            style={{
              display: "flex",
              fontWeight: "100",
              fontSize: "25px",
              alignItems: "center",
            }}
          >
            {" "}
            cách chọn size{" "}
          </div>
        </div>
        <div
          style={{
            border: "2px dotted #dfe0e1",
            fontSize: "25px",
          }}
        >
          <p>xanh đen </p>
          <input
            style={{
              width: "30px",
              height: "30px",
              marginLeft: "15px",
            }}
            type="radio"
          />
        </div>
        <input type="number" />
        <button
          style={{
            backgroundColor: " black",
            display: " block",
            color: "white",
            width: "100%",
            lineHeight: "50px",
            marginTop: "10px",
            fontWeight: "bold ",
            borderRadius: "10px",
          }}
        >
          Thêm Vào Giỏ Hàng
        </button>
        <div
          className="w-100 mt-3  p-3"
          style={{
            backgroundColor: "rgb(249, 250, 251)",
            border: "1px solid black",
            borderRadius: "20px",
          }}
        >
          <div className=" d-flex justify-content-between p-3 ">
            <p>Khuyễn mãi </p>
            <a href="">xem tất cả </a>
          </div>
          <div className="d-flex flex-wrap justify-content-center">
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  marginRight: "20px",
                  fontWeight: "bold",
                  color: "blue",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  marginRight: "20px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                  marginRight: "20px",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                  margin: "20px",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                  margin: "20px",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
            <div>
              <p
                style={{
                  padding: "10px 14px",
                  border: "1px solid blue",
                  color: "blue",
                  fontWeight: "bold",
                  margin: "20px",
                }}
              >
                giảm giá 50 K
              </p>
            </div>
          </div>
          <div>
            <b>Mô Tả</b>
            <br />
            <br />
            <span>
              Áo khoác Dù phối cá tính và năng động, dây kéo ở nhiều vị trí, để
              vật dụng kín đáo. Nón to và có mũ che nắng tiện dụng <br /> <br />
              Chất liệu: vải dù cao cấp trượt nước, lót trong mịn mát <br />
              <br />
              <b>Hướng dẫn bảo quản:</b>
              <br />- Không dùng hóa chất tẩy. <br /> - Ủi ở nhiệt độ thích hợp,
              hạn chế dùng máy sấy. <br /> - Giặt ở chế độ bình thường, với đồ
              có màu tương tự.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DescriptionPage;
