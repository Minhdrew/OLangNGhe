const VILLAGE_DATA = {
    quan: [
        { id: 'quan_0', name: 'Đình Thông Tây Hội', description: 'Đình Thông Tây Hội là một ngôi đình cổ kính, lưu giữ nhiều giá trị văn hóa lịch sử, đóng vai trò quan trọng trong đời sống tinh thần của cộng đồng.', url: 'https://vi.wikipedia.org/wiki/%C4%90%C3%ACnh_Th%C3%B4ng_T%C3%A2y_H%E1%BB%99i' },
        { id: 'quan_1', name: 'Đình Phú Long', description: 'Đình Phú Long mang đậm nét kiến trúc truyền thống, là nơi diễn ra nhiều lễ hội, sự kiện văn hóa quan trọng.', url: 'https://dulichbinhduong.org.vn/du-lich/di-tich-dinh-phu-long-gia-tri-van-hoa-truye-n-tho-ng/ct' }
    ],
    dan: [
        // Hàng trên (từ trái qua phải)
        { id: 'dan_0_0', name: 'Làng bánh tráng Phú Hòa Đông', description: 'Nổi tiếng với nghề làm bánh tráng truyền thống, sản phẩm dai, ngon.', url: 'https://tapchivietnamhuongsac.vn/banh-trang-phu-hoa-dong-dau-an-lang-nghe-truyen-thong-o-tphcm-3726.html' },
        { id: 'dan_0_1', name: 'Làng muối Long Điền', description: 'Làng nghề làm muối lâu đời, những cánh đồng muối trắng tinh trải dài.', url: 'https://mia.vn/cam-nang-du-lich/ruong-muoi-long-dien-noi-nghe-lam-muoi-truyen-thong-van-con-do-sau-bao-thang-nam-qua-1129' },
        { id: 'dan_0_2', name: 'Làng lò lu Đại Hưng', description: 'Nơi sản xuất các loại lu, hũ gốm truyền thống chất lượng cao.', url: 'https://mia.vn/cam-nang-du-lich/tham-quan-lo-lu-dai-hung-chuyen-san-xuat-gom-thu-cong-co-nhat-binh-duong-6625' },
        { id: 'dan_0_3', name: 'Làng lư đồng An Hội', description: 'Làng nghề đúc lư đồng thủ công tinh xảo, phục vụ thờ cúng và trang trí.', url: 'https://vnexpress.net/lang-duc-lu-dong-tram-tuoi-o-sai-gon-tat-bat-dip-tet-4043256.html' },
        { id: 'dan_0_4', name: 'Làng nhang Lê Minh Xuân', description: 'Chuyên sản xuất các loại nhang trầm, nhang thơm tỏa hương ngát.', url: 'https://thanhnien.vn/lang-nghe-o-tphcm-mua-tet-lang-nhang-le-minh-xuan-100-nam-tuoi-185250110150920543.htm' },
        // Hàng dưới (từ trái qua phải)
        { id: 'dan_1_0', name: 'Làng heo đất Lái Thiêu', description: 'Nơi sản xuất những chú heo đất ngộ nghĩnh, nhiều màu sắc mang ý nghĩa tiết kiệm, may mắn.', url: 'https://datlichkhamdrhue.com/lang-nghe-heo-dat-lai-thieu/' },
        { id: 'dan_1_1', name: 'Làng gốm Lái Thiêu', description: 'Làng gốm sứ lâu đời với những sản phẩm gốm gia dụng và trang trí đặc sắc.', url: 'https://gombinhduong.vn/tin-tuc/ghe-tham-lang-gom-lai-thieu-vang-danh-tai-binh-duong-doc-dao-cac-san-pham-o-day_377.html' },
        { id: 'dan_1_2', name: 'Làng bánh tét bắp Đất Đỏ', description: 'Nổi tiếng với món bánh tét bắp thơm ngon, đặc sản của vùng đất này.', url: 'https://vietnamtourism.gov.vn/post/39980' },
        { id: 'dan_1_3', name: 'Làng dệt Bảy Hiền', description: 'Cái nôi của nghề dệt vải, cung cấp nhiều loại vải đa dạng, màu sắc phong phú.', url: 'https://langngheviet.com.vn/lang-det-bay-hien-mot-thoi-lung-lay-dat-sai-thanh-21419.html' },
        { id: 'dan_1_4', name: 'Làng guốc mộc Bình Nhâm', description: 'Lưu giữ nghề làm guốc mộc truyền thống với những đôi guốc mộc mạc, bền đẹp.', url: 'https://www.cgvdt.vn/trong-tuan/phong-su-xa-hoi/lang-guoc-binh-nham-chi-con-trong-ky-uc_a246' }
    ],
    events: [
        { id: 'evt_1', name: 'Nghệ nhân truyền nghề', effect: 'Thêm 3 hạt nguyên liệu vào ô của bạn.' },
        { id: 'evt_2', name: 'Lễ hội làng nghề', effect: 'Bạn được thêm một lượt đi.' },
        { id: 'evt_3', name: 'Thiếu hụt nguyên liệu', effect: 'Mất 1 lượt đi.' }
    ]
};
