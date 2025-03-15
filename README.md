# Hướng Dẫn Cài Đặt và Chạy Dự Án

Dự án bao gồm hai thư mục chính: `client` (giao diện người dùng) và `server` (máy chủ backend). 
## Yêu Cầu

- Node.js (>=14.0.0)
- MongoDB (nếu sử dụng cơ sở dữ liệu cục bộ)

## 1. Cài Đặt

### 1.1 Cài Đặt Client

1. Mở terminal và điều hướng vào thư mục `client`:
   ```sh
   cd client
   ```
2. Cài đặt các package cần thiết:
   ```sh
   npm install
   ```

### 1.2 Cài Đặt Server

1. Mở terminal và điều hướng vào thư mục `server`:
   ```sh
   cd server
   ```
2. Cài đặt các package cần thiết:
   ```sh
   npm install
   ```
3. Tạo tệp `.env` trong thư mục `server` và thêm các biến môi trường sau:
   ```env
   MONGO_DB=<MongoDB_Connection_String>
   PORT=<Server_Port>
   AC_TOKEN=<Access_Token_Secret>
   RF_TOKEN=<Refresh_Token_Secret>
   ```

## 2. Chạy Dự Án

### 2.1 Chạy Client

1. Điều hướng vào thư mục `client`:
   ```sh
   cd client
   ```
2. Chạy ứng dụng:
   ```sh
   npm start
   ```

### 2.2 Chạy Server

1. Điều hướng vào thư mục `server`:
   ```sh
   cd server
   ```
2. Biên dịch và chạy server:
   ```sh
   npm run build
   ```

## 3. Kiểm Tra
- Mở trình duyệt và truy cập `http://localhost:<PORT>` để kiểm tra API server.
- Truy cập `http://localhost:3000` (hoặc cổng được định nghĩa) để kiểm tra client.

Chúc bạn cài đặt và chạy dự án thành công!

