// ========== DATETIME DISPLAY ==========

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


        // AJAX for Vietlott Jackpot
        let currentSelection = 'mega645';
        
        function fetchJackpotData(lotteryType) {
            const loading = document.getElementById('loading');
            const error = document.getElementById('error');
            const results = document.getElementById('results');
            
            loading.style.display = 'block';
            error.style.display = 'none';
            results.style.display = 'none';
            
            const xhr = new XMLHttpRequest();
            const url = 'https://vietlott.vn/ajaxpro/Vietlott.PlugIn.WebParts.GameMax4DWebPart,Vietlott.PlugIn.WebParts.ashx';
            
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            xhr.setRequestHeader('X-AjaxPro-Method', 'ServerSideDrawResult');
            
            xhr.onload = function() {
                loading.style.display = 'none';
                
                if (xhr.status === 200) {
                    try {
                        const response = JSON.parse(xhr.responseText);
                        displayResults(response, lotteryType);
                    } catch (e) {
                        showError('Error parsing data: ' + e.message);
                    }
                } else {
                    showError('Failed to fetch data. Status: ' + xhr.status);
                }
            };
            
            xhr.onerror = function() {
                loading.style.display = 'none';
                showError('Network error occurred.');
            };
            
            const gameId = lotteryType === 'mega645' ? 'mega-6-45' : 'power-6-55';
            xhr.send(JSON.stringify({ GameDrawId: gameId }));
        }
        
        function displayResults(data, lotteryType) {
            const results = document.getElementById('results');
            const gameName = lotteryType === 'mega645' ? 'Mega 6/45' : 'Power 6/55';
            
            let html = `<div class="table-title-left">${gameName}</div>`;
            html += '<table class="lottery-table"><thead><tr>';
            html += '<th>Draw Code</th>';
            html += '<th>Draw Date</th>';
            html += '<th>Win Numbers</th>';
            html += '<th>Jackpot 1</th>';
            html += '<th>Jackpot 2</th>';
            html += '</tr></thead><tbody>';
            
            if (data && data.value) {
                try {
                    const jackpotData = JSON.parse(data.value);
                    
                    if (jackpotData && jackpotData.length > 0) {
                        jackpotData.forEach(item => {
                            html += '<tr>';
                            html += `<td>${item.DrawCode || 'N/A'}</td>`;
                            html += `<td>${item.DrawDate || 'N/A'}</td>`;
                            html += `<td><strong>${item.WinNumber || 'N/A'}</strong></td>`;
                            html += `<td>${formatCurrency(item.Jackpot1)}</td>`;
                            html += `<td>${formatCurrency(item.Jackpot2)}</td>`;
                            html += '</tr>';
                        });
                    } else {
                        html += '<tr><td colspan="5" style="text-align:center;">No data</td></tr>';
                    }
                } catch (e) {
                    html += `<tr><td colspan="5" style="text-align:center;">Error: ${e.message}</td></tr>`;
                }
            } else {
                html += '<tr><td colspan="5" style="text-align:center;">No data from API</td></tr>';
            }
            
            html += '</tbody></table>';
            results.innerHTML = html;
            results.style.display = 'block';
        }
        
        function formatCurrency(value) {
            if (!value) return 'N/A';
            return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
        }
        
        function showError(message) {
            const error = document.getElementById('error');
            error.textContent = message;
            error.style.display = 'block';
        }
        
        document.querySelectorAll('input[name="lottery"]').forEach(radio => {
            radio.addEventListener('change', function() {
                currentSelection = this.value;
                fetchJackpotData(currentSelection);
            });
        });
        
        fetchJackpotData(currentSelection);
