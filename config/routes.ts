export default [
	{
		path: '/user',
		layout: false,
		routes: [
			{
				path: '/user/login',
				layout: false,
				name: 'login',
				component: './user/Login',
			},
			{
				path: '/user',
				redirect: '/user/login',
			},
		],
	},

	///////////////////////////////////
	// DEFAULT MENU
	{
		path: '/dashboard',
		name: 'Dashboard',
		component: './TrangChu',
		icon: 'HomeOutlined',
	},
	{
		path: '/gioi-thieu',
		name: 'About',
		component: './TienIch/GioiThieu',
		hideInMenu: true,
	},

	// DANH MUC HE THONG
	// {
	// 	name: 'DanhMuc',
	// 	path: '/danh-muc',
	// 	icon: 'copy',
	// 	routes: [
	// 		{
	// 			name: 'ChucVu',
	// 			path: 'chuc-vu',
	// 			component: './DanhMuc/ChucVu',
	// 		},
	// 	],
	// },

	//Quan ly ho so sinh vien
	{
		name: 'QuanLyHoSoSinhVien',
		path: '/quan-ly-ho-so-sinh-vien',
		icon: 'user',
		component: './QuanLyHoSoSinhVien'
	},

	{
		name: 'QuanLyDangKyPhongKTX',
		path: '/quan-ly-dang-ky-phong-ktx',
		icon: 'HomeOutlined',
		component: './QuanLyDangKyPhongKTX'
	},{
		name: 'QuanLyVaoRaKTX',
		path: '/quan-ly-vao-ra-ktx',
		icon: 'HomeOutlined',
		component: './VaoRaKTX'
	},

	{
		name: 'QuanLyThongTinVaDichVu',
		path: '/quan-ly-thong-tin-dich-vu',
		icon: 'PropertySafetyOutlined',
		component: './QuanLyThongTinVaDichVu'
	},

	{
		name: 'QuanLyVeXeThang',
		path: '/quan-ly-ve-xe-thang',
		icon: 'TagOutlined',
		component: './QuanLyVeXeThang'
	},
	{
		name: 'QuanLyGuiXe',
		path: '/quan-ly-gui-xe',
		icon: 'CarOutlined',
		component: './QuanLyGuiXe'
	},
	{
		name: 'QuanLyHoaDon',
		path: '/quan-ly-hoa-don',
		icon: 'AuditOutlined',
		component: './QuanLyHoaDon'
	},

	// DANH MUC HE THONG
	{
		name: 'DanhMuc',
		path: '/danh-muc',
		icon: 'copy',
		routes: [
			{
				name: 'PhongKTX',
				path: 'phong-ktx',
				component: './DanhMuc/PhongKTX',
			},
			{
				name: 'DichVuKTX',
				path: 'dich-vu-ktx',
				component: './DanhMuc/DichVuKTX',
			},{
				name: 'QuanLyXe',
				path: 'xe-ktx',
				component: './DanhMuc/QuanLyXe',
			},
		],
	},

	{
		path: '/notification',
		routes: [
			{
				path: './subscribe',
				exact: true,
				component: './ThongBao/Subscribe',
			},
			{
				path: './check',
				exact: true,
				component: './ThongBao/Check',
			},
			{
				path: './',
				exact: true,
				component: './ThongBao/NotifOneSignal',
			},
		],
		layout: false,
		hideInMenu: true,
	},
	{
		path: '/',
	},
	{
		path: '/403',
		component: './exception/403/403Page',
		layout: false,
	},
	{
		component: './exception/404',
	},
];
