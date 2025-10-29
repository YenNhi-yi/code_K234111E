// datetime.js - Hiển thị ngày giờ hiện tại

// Hàm lấy và hiển thị ngày giờ hiện tại
function displayCurrentDate() {
    const now = new Date();
    
    // Lấy thông tin ngày tháng năm
    const day = now.getDate();
    const month = now.getMonth() + 1; // Tháng bắt đầu từ 0
    const year = now.getFullYear();
    
    // Lấy giờ phút giây
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    
    // Format: DD/MM/YYYY HH:MM:SS
    const dateString = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    
    // Hiển thị vào element có id="currentDate"
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = dateString;
    }
}

// Khởi động khi trang web load xong
window.onload = function() {
    // Gọi hàm ngay khi trang load
    displayCurrentDate();
    
    // Cập nhật mỗi giây (1000ms)
    setInterval(displayCurrentDate, 1000);
};