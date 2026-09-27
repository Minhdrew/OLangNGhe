let board = [];
let currentPlayer = 1; // 1 hoặc 2
let scoreP1 = 0;
let scoreP2 = 0;
let isAnimating = false;
let selectedCellIndex = -1;

const CELL_COUNT = 12;

function initGame() {
    board = new Array(CELL_COUNT).fill(0).map(() => ({ quan: 0, dan: 0 }));
    
    // Mỗi ô Đình có 1 Quan, giá trị quy đổi khi tính điểm là 5
    board[0].quan = 1;
    board[6].quan = 1;
    
    for (let i = 1; i <= 5; i++) board[i].dan = 5;
    for (let i = 7; i <= 11; i++) board[i].dan = 5;
    
    currentPlayer = 1;
    scoreP1 = 0;
    scoreP2 = 0;
    isAnimating = false;
    selectedCellIndex = -1;
    
    document.getElementById('direction-picker').classList.add('hidden');
    document.getElementById('btn-reset').classList.add('hidden'); // Ẩn nút chơi lại khi mới bắt đầu
    
    updateUI();
}

function getHtmlId(index) {
    if (index === 0) return 'quan-0';
    if (index === 6) return 'quan-1';
    if (index >= 1 && index <= 5) return `dan-0-${index - 1}`;
    if (index >= 7 && index <= 11) return `dan-1-${11 - index}`;
    return '';
}

function updateUI() {
    document.getElementById('score-p1').innerText = scoreP1;
    document.getElementById('score-p2').innerText = scoreP2;
    
    // Cập nhật tên người chơi từ input
    const p1Name = document.getElementById('p1-name').value || "Người chơi 1";
    const p2Name = document.getElementById('p2-name').value || "Người chơi 2";
    
    const turnIndicator = document.getElementById('turn-indicator');
    turnIndicator.innerText = `Lượt của ${currentPlayer === 1 ? p1Name : p2Name}`;
    turnIndicator.style.borderColor = currentPlayer === 1 ? 'var(--gold)' : '#4CAF50';
    
    for (let i = 0; i < CELL_COUNT; i++) {
        const cellId = getHtmlId(i);
        const container = document.getElementById(`${cellId}-pieces`);
        const countSpan = document.getElementById(`${cellId}-count`);
        
        container.innerHTML = '';
        
        // Hiển thị tổng giá trị hạt (Quan = 5 điểm, Dân = 1 điểm)
        let totalPieces = board[i].quan * 5 + board[i].dan; 
        
        if (totalPieces > 0) {
            countSpan.innerText = totalPieces;
            countSpan.classList.remove('hidden');
        } else {
            countSpan.innerText = '0';
            countSpan.classList.add('hidden'); // Ẩn số 0 cho gọn
        }
        
        for (let q = 0; q < board[i].quan; q++) {
            const p = document.createElement('div');
            p.className = 'piece quan-piece';
            container.appendChild(p);
        }
        
        const displayDan = Math.min(board[i].dan, 15);
        for (let d = 0; d < displayDan; d++) {
            const p = document.createElement('div');
            p.className = 'piece dan-piece';
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 15;
            p.style.transform = `translate(${Math.cos(angle)*radius}px, ${Math.sin(angle)*radius}px)`;
            container.appendChild(p);
        }
    }
}

async function prepareTurn() {
    let myCells = currentPlayer === 1 ? [7,8,9,10,11] : [1,2,3,4,5];
    let totalMyDan = myCells.reduce((sum, idx) => sum + board[idx].dan, 0);
    
    if (totalMyDan === 0) {
        if (board[0].quan > 0 || board[0].dan > 0 || board[6].quan > 0 || board[6].dan > 0) {
            const pName = currentPlayer === 1 ? document.getElementById('p1-name').value : document.getElementById('p2-name').value;
            alert(`${pName} hết quân. Phải lấy 5 quân từ kho để rải!`);
            if (currentPlayer === 1) scoreP1 -= 5;
            else scoreP2 -= 5;
            
            for (let idx of myCells) {
                board[idx].dan = 1;
            }
            updateUI();
            await sleep(500);
        }
    }
}

async function handleDanClick(row, col) {
    if (isAnimating) return;
    
    let index = -1;
    if (row === 0) index = col + 1;
    if (row === 1) index = 11 - col;
    
    const isP1Side = (index >= 7 && index <= 11);
    const isP2Side = (index >= 1 && index <= 5);
    
    if ((currentPlayer === 1 && !isP1Side) || (currentPlayer === 2 && !isP2Side)) {
        alert(`Bạn phải chọn ô ở phía của mình.`);
        return;
    }
    
    if (board[index].dan === 0) {
        return;
    }
    
    selectedCellIndex = index;
    showInfo(index);
    
    const picker = document.getElementById('direction-picker');
    picker.classList.remove('hidden');
    
    document.getElementById('btn-left').onclick = () => startMove(index, 1);
    document.getElementById('btn-right').onclick = () => startMove(index, -1);
}

function handleQuanClick(quanIndex) {
    const idx = quanIndex === 0 ? 0 : 6;
    showInfo(idx);
}

async function startMove(startIndex, direction) {
    document.getElementById('direction-picker').classList.add('hidden');
    isAnimating = true;
    
    let hand = board[startIndex].dan;
    board[startIndex].dan = 0;
    
    let currentIndex = startIndex;
    
    updateUI();
    await sleep(400);
    
    while (hand > 0) {
        currentIndex = (currentIndex + direction + CELL_COUNT) % CELL_COUNT;
        
        board[currentIndex].dan += 1;
        hand -= 1;
        
        updateUI();
        await sleep(300);
        
        if (hand === 0) {
            let nextIndex = (currentIndex + direction + CELL_COUNT) % CELL_COUNT;
            
            if (board[nextIndex].dan > 0 || board[nextIndex].quan > 0) {
                if (nextIndex === 0 || nextIndex === 6) {
                    break;
                } else {
                    hand = board[nextIndex].dan;
                    board[nextIndex].dan = 0;
                    currentIndex = nextIndex;
                    updateUI();
                    await sleep(400);
                }
            } else {
                await checkEat(nextIndex, direction);
                break; 
            }
        }
    }
    
    currentPlayer = currentPlayer === 1 ? 2 : 1;
    updateUI();
    
    if (!checkEndGame()) {
        isAnimating = false;
        await prepareTurn();
    }
}

async function checkEat(emptyIndex, direction) {
    let nextNextIndex = (emptyIndex + direction + CELL_COUNT) % CELL_COUNT;
    
    if (board[nextNextIndex].dan > 0 || board[nextNextIndex].quan > 0) {
        let isQuan = (nextNextIndex === 0 || nextNextIndex === 6);
        if (isQuan && board[nextNextIndex].quan > 0 && board[nextNextIndex].dan < 5) {
            return;
        }
        
        // Giá trị Quan là 5 điểm
        let earned = board[nextNextIndex].dan + (board[nextNextIndex].quan * 5); 
        
        if (currentPlayer === 1) scoreP1 += earned;
        else scoreP2 += earned;
        
        board[nextNextIndex].dan = 0;
        board[nextNextIndex].quan = 0;
        
        showInfo(nextNextIndex);
        updateUI();
        await sleep(500);
        
        let next3 = (nextNextIndex + direction + CELL_COUNT) % CELL_COUNT;
        if (board[next3].dan === 0 && board[next3].quan === 0) {
            await checkEat(next3, direction);
        }
    }
}

function checkEndGame() {
    if (board[0].quan === 0 && board[0].dan === 0 && board[6].quan === 0 && board[6].dan === 0) {
        let p1Left = 0;
        let p2Left = 0;
        for (let i = 7; i <= 11; i++) p1Left += board[i].dan;
        for (let i = 1; i <= 5; i++) p2Left += board[i].dan;
        
        scoreP1 += p1Left;
        scoreP2 += p2Left;
        
        for (let i = 1; i <= 11; i++) { if(i!==6) board[i].dan = 0; }
        updateUI();
        
        setTimeout(() => {
            const p1Name = document.getElementById('p1-name').value || "Người chơi 1";
            const p2Name = document.getElementById('p2-name').value || "Người chơi 2";
            
            let winner = "HÒA NHAU!";
            if (scoreP1 > scoreP2) winner = `Chúc mừng ${p1Name} chiến thắng!`;
            else if (scoreP1 < scoreP2) winner = `Chúc mừng ${p2Name} chiến thắng!`;

            document.getElementById('victory-title').innerText = "TRÒ CHƠI KẾT THÚC";
            document.getElementById('victory-desc').innerText = winner;
            document.getElementById('victory-score').innerText = `${p1Name}: ${scoreP1} điểm  |  ${p2Name}: ${scoreP2} điểm`;
            
            document.getElementById('victory-modal').classList.remove('hidden');
            document.getElementById('btn-reset').classList.remove('hidden'); // Hiện nút Chơi lại
            isAnimating = false;
        }, 500);
        return true;
    }
    return false;
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function showInfo(index) {
    let data;
    if (index === 0) data = VILLAGE_DATA.quan[0];
    else if (index === 6) data = VILLAGE_DATA.quan[1];
    else if (index >= 1 && index <= 5) data = VILLAGE_DATA.dan[index - 1]; 
    else if (index >= 7 && index <= 11) {
        const bottomDataIndex = 11 - index;
        data = VILLAGE_DATA.dan[5 + bottomDataIndex];
    }
    
    if (data) {
        document.getElementById('modal-title').innerText = data.name;
        document.getElementById('modal-desc').innerText = data.description;
        
        // Tạo QR Code
        const qrPlaceholder = document.querySelector('.qr-placeholder');
        if (data.url) {
            qrPlaceholder.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=140x140&data=${encodeURIComponent(data.url)}" alt="QR Code" style="border-radius: 5px;">`;
            qrPlaceholder.style.background = 'white';
            qrPlaceholder.style.border = '2px solid var(--board-border)';
        } else {
            qrPlaceholder.innerHTML = `<span>Chưa có mã QR</span>`;
            qrPlaceholder.style.background = '';
        }

        document.getElementById('info-modal').classList.remove('hidden');
    }
}

function closeInfoModal() {
    document.getElementById('info-modal').classList.add('hidden');
}

function closeVictoryModal() {
    document.getElementById('victory-modal').classList.add('hidden');
}

function showIntroModal() {
    document.getElementById('modal-title').innerText = "Luật chơi: Ô ăn quan chi tiết";
    document.getElementById('modal-desc').innerHTML = `
        <p>1. <b>Bốc quân:</b> Không được bốc ô Quan. Rải liên tiếp từng hạt.</p>
        <p>2. <b>Tiếp tục đi:</b> Nếu rải hạt cuối cùng sát ô có quân (và không phải ô Quan), bốc tiếp và rải.</p>
        <p>3. <b>Ăn quân:</b> Nếu rải hạt cuối cùng sát ô trống, và ô tiếp theo có quân, bạn sẽ "ăn" toàn bộ quân ô đó.</p>
        <p>4. <b>Mất lượt:</b> Nếu rơi sát ô Quan có quân, hoặc 2 ô trống liên tiếp, bạn mất lượt.</p>
        <p>5. <b>Luật Quan non:</b> Không được ăn Quan nếu Quan có dưới 5 hạt dân.</p>
        <p>6. <b>Luật vay quân:</b> Nếu 5 ô đều trống, tự vay 5 điểm rải vào 5 ô.</p>
        <p>7. <b>Điểm số:</b> Quan = 5 điểm, Dân = 1 điểm.</p>
    `;
    document.getElementById('info-modal').classList.remove('hidden');
}

window.onload = () => {
    initGame();
};
