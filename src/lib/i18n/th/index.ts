import type { Translation } from '../i18n-types';

const th: Translation = {
	// this is an example Translation, just rename or delete this folder if you want
	hi: 'หวัดดี {name}! โปรดให้ดาวถ้าคุณชื่นชอบโปรเจคนี้: https://github.com/ivanhofer/typesafe-i18n',
	write_something: 'เขียนอะไรสักหน่อยสิ!',
	articles: 'บทความ',
	edit_this_articles: 'แก้ไขหัวข้อ',
	submit: 'ยืนยัน',
	duplicate: 'ทำซ้ำ',
	edit: 'แก้ไข',
	delete: 'ลบ',
	attributes: {
		title: 'หัวข้อ',
		content: 'เนื้อหา'
	},
	errors: {
		blank: 'ห้ามว่าง',
		maxlength: 'ห้ามเกิน {0} ตัวอักษร'
	}
};

export default th;
